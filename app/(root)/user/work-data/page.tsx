import { fetchSelectOptions } from "@/data/user-form";
import WorkForm from "./work-form";

export default async function PersonalDataPage() {
  const selectOptions = await fetchSelectOptions();

  return (
    <div className="container mx-auto p-4">
      <WorkForm initialOptions={selectOptions} />
    </div>
  );
}
