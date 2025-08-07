import {
  NewForm,
  personalSchema,
  workSchema,
} from "@/app/features/onboarding/schema";
import { FormDataRoutes } from "@/lib/utils";

export type SubmitFormActionType = {
  redirect?: FormDataRoutes;
  errorMsg?: string;
  success?: boolean;
};

export const submitFormAction = async (
  form: NewForm
): Promise<SubmitFormActionType> => {
  const personalValidated = personalSchema.safeParse(form);
  const workValidated = workSchema.safeParse(form);

  if (!personalValidated.success) {
    return {
      success: false,
      redirect: FormDataRoutes.PERSONAL_DATA,
      errorMsg: "Pastikan data diri anda sudah terisi dengan benar.",
    };
  }

  if (!workValidated.success) {
    return {
      success: false,
      redirect: FormDataRoutes.WORK_DATA,
      errorMsg: "Pastikan data pekerjaan anda sudah terisi dengan benar.",
    };
  }

  try {
    const res = await fetch("/api/data/submit-form", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    console.log("Submitting form data:", form);

    if (!res.ok) {
      const err = await res.json();
      return {
        success: false,
        errorMsg: err?.error || "Gagal mengirim data ke server.",
      };
    }

    return {
      success: true,
      redirect: FormDataRoutes.PERSONAL_DATA,
    };
  } catch (err: any) {
    return {
      success: false,
      errorMsg: err.message || "Kesalahan jaringan saat mengirim data.",
    };
  }
};
