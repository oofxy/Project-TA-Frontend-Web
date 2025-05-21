import { partnerSchema } from "@/app/features/onboarding/schema";
import { FormDataRoutes } from "@/lib/utils";
import { FormErrors } from "@/types";
import { redirect } from "next/navigation";

export const partnerFormAction = (
  prevState: FormErrors | undefined,
  formData: FormData
): FormErrors | undefined => {
  const data = Object.fromEntries(formData.entries());
  const validated = partnerSchema.safeParse(data);

  if (!validated.success) {
    const errors = validated.error.errors.reduce((acc: FormErrors, issue) => {
      acc[issue.path[0]] = issue.message;
      return acc;
    }, {});
    return errors;
  } else {
    redirect(FormDataRoutes.PARENT_DATA);
    return undefined;
  }
};
