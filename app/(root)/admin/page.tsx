import { DivisionBar } from "@/components/dashboard-components/DivisionBar";
import { EducationChart } from "@/components/dashboard-components/EducationChart";
import { GenderBox } from "@/components/dashboard-components/GenderBox";
import { OfficeLocationCards } from "@/components/dashboard-components/OfficeLocation";
import { PositionBar } from "@/components/dashboard-components/PositionBar";

export const dynamic = "force-dynamic";

export default function AdminPage() {
  return (
    <section className="columns-1 sm:columns-2 lg:columns-3 gap-6 p-6">
      <div className="mb-6 break-inside-avoid rounded-xl">
        <GenderBox />
      </div>
      <div className="mb-6 break-inside-avoid rounded-xl">
        <PositionBar />
      </div>
      <div className="mb-6 break-inside-avoid rounded-xl">
        <EducationChart />
      </div>
      <div className="mb-6 break-inside-avoid rounded-xl">
        <DivisionBar />
      </div>
      <div className="mb-6 break-inside-avoid rounded-xl">
        <OfficeLocationCards />
      </div>
    </section>
  );
}
