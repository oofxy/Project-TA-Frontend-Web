import axios from "axios";
import { auth, signOut } from "@/auth";

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

function subscribeTokenRefresh(cb: (token: string) => void) {
  refreshSubscribers.push(cb);
}

function onRefreshed(token: string) {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
}

let accessToken: string | null = null;
let refreshed = false;

export const createAxiosWithAuth = async () => {
  if (!accessToken || !refreshed) {
    const session = await auth();
    accessToken = session?.accessToken ?? null;

    if (!accessToken) {
      console.warn("No session available, redirecting to login...");
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
      throw new Error("No valid session, redirected to login.");
    }
  }

  if (!accessToken) {
    console.warn("No session available, redirecting to login...");
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
    throw new Error("No valid session, redirected to login.");
  }


  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    withCredentials: true,
  });

  instance.interceptors.response.use(
    (res) => res,
    async (error) => {
      const originalRequest = error.config;

      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        if (isRefreshing) {
          return new Promise((resolve) => {
            subscribeTokenRefresh((newToken: string) => {
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
              resolve(instance(originalRequest));
            });
          });
        }


        isRefreshing = true;

        try {
          const session = await auth();
          const refreshToken = session?.user?.refreshToken;

          if (!refreshToken)
            throw new Error("No refresh token found in session");


          const refreshResponse = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}refresh-token`,
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${refreshToken}`,
              },
            }
          );

          if (refreshResponse.status === 401) {
            throw new Error("Refresh token unauthorized");
          }

          if (!refreshResponse.ok) {
            throw new Error("Refresh token request failed");
          }

          const refreshData = await refreshResponse.json();

          const newToken = refreshData?.access_token;
          const newRefreshToken = refreshData?.refresh_token;


          accessToken = newToken;
          refreshed = true;

          instance.defaults.headers.Authorization = `Bearer ${newToken}`;
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          onRefreshed(newToken);

          return instance(originalRequest);
        } catch (err) {
          console.error("Refresh token failed:", err);
          await signOut({ redirect: false });
          accessToken = null;
          refreshed = false;
          console.log("✅ Sign out selesai, sekarang redirecting...");
          setTimeout(() => {
            if (typeof window !== "undefined") {
              window.location.href = "/login";
            }
          }, 200);
          return Promise.reject(err);
        } finally {
          isRefreshing = false;
        }
      }

      return Promise.reject(error);
    }
  );

  return instance;
};
