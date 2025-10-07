import { ContactInfoSchema, validateUsername } from "./validation";
import { Values, WizardValues, StepConfig } from "@/types";
import StepEmailCheck from "../components/steps/StepEmailCheck";
import StepAsync from "../components/steps/StepAsync";
import StepFinal from "../components/steps/StepFinal";

const steps: StepConfig[] = [
  {
    id: "ContactInfo",
    initialValues: {
      firstName: "",
      lastName: "",
      linkedin: "",
      email: "",
    },
    // attrs defined under "fields" are for custom step renderer made
    // just for this demo folder, otherwise these aren't part of
    // the step config object
    fields: {
      inputTypes: {
        firstName: "text",
        lastName: "text",
        linkedin: "text",
        email: "email",
      },
      placeholders: {
        firstName: "e.g. John",
        lastName: "e.g. Doe",
        linkedin: "e.g. https://linkedin.com/in/jhon-doe",
        email: "e.g. john@doe.com",
      },
    },
    validationSchema: ContactInfoSchema,
    disableNextOnErrors: true,
  },
  {
    id: "Username",
    helpText:
      "This name will be appeared during the meeting",
    initialValues: {
      username: "",
    },
    fields: {
      inputTypes: {
        username: "text",
      },
    },
    onSubmit: async (stepValues: Values, _allValues: WizardValues) => {
      const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
      await delay(2000);
      return stepValues;
    },
    // disableNextOnErrors: true,
  },
  {
    id: "Final",
    component: <StepFinal />,
    hideNext: true,
    hidePrevious: true,
  },
];

export default steps;
