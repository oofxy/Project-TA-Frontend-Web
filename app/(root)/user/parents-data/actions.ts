import { parentSchema } from "@/app/features/onboarding/schema";
import { FormDataRoutes } from "@/lib/utils";
import { FormErrors } from "@/types";
import { redirect } from "next/navigation";

export const parentsFormAction = (
  prevState: FormErrors | undefined,
  formData: FormData
): FormErrors | undefined => {
  const data = Object.fromEntries(formData.entries());
  const validated = parentSchema.safeParse(data);

  if (!validated.success) {
    const errors = validated.error.errors.reduce((acc: FormErrors, issue) => {
      acc[issue.path[0]] = issue.message;
      return acc;
    }, {});
    return errors;
  } else {
    redirect(FormDataRoutes.CHILDREN_DATA);
    return undefined;
  }
};
