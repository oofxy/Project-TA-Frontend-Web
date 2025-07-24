import GenderChart from "@/components/dashboard-components/GenderChart";
import { createAxiosWithAuth } from "@/lib/axiosAuth";
import { fetchWithRetry } from "@/lib/fetchWithRetry";

const DashboardAdmin = async () => {
  let gender: number[] = [];

  try {
    const axios = await createAxiosWithAuth();
    const res = await fetchWithRetry(() => axios.get("karyawan"));
    const data = res.data;

    const pria = data.filter((d: any) => d.gender === "Pria").length;
    const wanita = data.filter((d: any) => d.gender === "Wanita").length;

    gender = [pria, wanita];
  } catch (error) {
    console.error("Failed to fetch karyawan data:", error);
    gender = [0, 0];
  }

  return (
    <div className="flex w-fit items-center gap-4 rounded-xl border border-gray-200 p-4 shadow-chart sm:gap-6 sm:p-6;">
      <div className="flex size-full max-w-[100px] items-center sm:max-w-[120px];">
        <GenderChart gender={gender} />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-14 font-medium text-gray-600">Jumlah Pegawai:</p>
        <div className="text-24 lg:text-30 flex-1 font-semibold text-gray-900 flex-center gap-2">
          {/* <AnimatedCounter amount={gender[0] + gender[1]} /> */}
          {gender[0] + gender[1]}
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;
