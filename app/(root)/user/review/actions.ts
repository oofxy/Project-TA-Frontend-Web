import {
    childrenSchema,
  NewForm,
  parentSchema,
  partnerSchema,
  personalSchema,
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
  const personalFormValidated = personalSchema.safeParse(form);
  if (!personalFormValidated.success) {
    return {
      redirect: FormDataRoutes.PERSONAL_DATA,
      errorMsg: "Tolong Validasi Data Diri Anda",
    };
  }
  const partnerFormValidated = partnerSchema.safeParse(form);
  if (!partnerFormValidated.success) {
    return {
      redirect: FormDataRoutes.PARTNER_DATA,
      errorMsg: "Tolong Validasi Data Pasangan Anda",
    };
  }

  const parentsFormValidated = parentSchema.safeParse(form);
  if (!parentsFormValidated.success) {
    return {
      redirect: FormDataRoutes.PARENT_DATA,
      errorMsg: "Tolong Validasi Data Orang Tua Anda",
    };
  }

  return {
    success: true,
    redirect: FormDataRoutes.PERSONAL_DATA,
  };
};
