import { create } from "zustand";

import { RegisterStep } from "@/types/enums";
import { authValidator } from "@/server/validators/user";

type State = authValidator.Register;

export const defaultValues: State = {
  step: RegisterStep.EnterEmail,
  email: "",
  password: "",
  confirmPassword: "",
};

export const useRegister = create<State>()(() => defaultValues);

export const onSuccess = ({
  formValues,
  step,
}: {
  formValues: State;
  step: RegisterStep;
}) => {
  const getDefaultValues = () => {
    switch (step) {
      case RegisterStep.EnterEmail:
        return defaultValues;
      case RegisterStep.VerifyOTP:
        return {
          ...formValues,
          step,
          otp: 0,
        };
      case RegisterStep.EnterDetails:
        return {
          ...formValues,
          step,
          fullName: "",
          userName: "",
        };
    }
  };

  useRegister.setState(getDefaultValues);
};
