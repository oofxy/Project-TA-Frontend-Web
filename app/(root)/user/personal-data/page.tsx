
import { fetchSelectOptions } from '@/data/user-form';
import PersonalForm from './personal-form';

export default async function PersonalDataPage() {
  const selectOptions = await fetchSelectOptions();
  
  return (
    <div className="container mx-auto p-4">
      <PersonalForm initialOptions={selectOptions} />
    </div>
  );
}