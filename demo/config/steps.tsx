import { ContactInfoSchema } from "./validation";
import { Values, WizardValues, StepConfig } from "@/types";
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
        linkedin: "e.g. https://linkedin.com/in/john-doe",
        email: "e.g. john@doe.com",
      },
    },
    validationSchema: ContactInfoSchema,
    disableNextOnErrors: true,
  },

  {
    id: "Username",
    helpText: "This name will appear during the meeting.",
    initialValues: { username: "" },
    fields: { inputTypes: { username: "text" } },

    onSubmit: async (stepValues: Values, _allValues: WizardValues) => {
      // 👇 Preload the Jitsi script BEFORE final step loads
      const loadJitsiScript = () =>
        new Promise<void>((resolve) => {
          const existingScript = document.getElementById("jitsi-script");
          if (!existingScript) {
            const script = document.createElement("script");
            script.src = "https://meet.jit.si/external_api.js";
            script.id = "jitsi-script";
            script.onload = () => resolve();
            document.body.appendChild(script);
          } else {
            resolve();
          }
        });

      await loadJitsiScript();
      console.log("✅ Jitsi script preloaded successfully");

      // Optional: small delay to simulate loading UX
      await new Promise((res) => setTimeout(res, 1000));

      return stepValues;
    },
  },

  {
    id: "Final",
    component: <StepFinal />,
    hideNext: true,
    hidePrevious: true,
  },
];

export default steps;
