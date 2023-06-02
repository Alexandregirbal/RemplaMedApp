import Stepper from "components/UI/Stepper";
import CreatePost from "modules/post/components/CreatePost";
import { useState } from "react";

enum Steps {
    CREATE_POST = "CREATE_POST",
    PREVIEW = "PREVIEW",
    PAYMENT = "PAYMENT",
    SUCCESS = "SUCCESS",
}

const steps: Steps[] = [
    Steps.CREATE_POST,
    Steps.PREVIEW,
    Steps.PAYMENT,
    Steps.SUCCESS,
];

export default function CreatePostPage() {
    const [activeStep, setActiveStep] = useState<string>(Steps.CREATE_POST);

    const handleStepChange = (step: string) => {
        setActiveStep(step);
    };

    return (
        <div className="row flex h-full flex-col px-60">
            <Stepper
                steps={steps}
                activeStep={activeStep}
                handleStepClick={handleStepChange}
            />
            {activeStep === Steps.CREATE_POST && <CreatePost />}
            {activeStep === Steps.PREVIEW && "I am the preview page"}
            {activeStep === Steps.PAYMENT && "I am the payment page"}
            {activeStep === Steps.SUCCESS && "I am the success page"}
        </div>
    );
}
