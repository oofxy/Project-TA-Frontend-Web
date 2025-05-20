
import { fetchSelectOptions } from '@/data/user-form';
import ChildrenForm from './children-form';

export default async function PersonalDataPage() {
  const selectOptions = await fetchSelectOptions();
  
  return (
    <div className="container mx-auto p-4">
      <ChildrenForm initialOptions={selectOptions} />
    </div>
  );
}