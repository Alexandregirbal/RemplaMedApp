import CreatePost from "modules/post/components/CreatePost";
import { useState } from "react";

enum Steps {
    CREATE_POST = "CREATE_POST",
    PREVIEW = "PREVIEW",
    METADATA = "METADATA",
    PAYMENT = "PAYMENT",
    SUCCESS = "SUCCESS",
}

export default function CreatePostPage() {
    const [step, setStep] = useState<string>(Steps.CREATE_POST);

    const handleStepChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(event.target.value);

        setStep(event.target.value);
    };

    return (
        <div className="row flex h-full flex-col px-60">
            <select
                name="step"
                id="stepSelect"
                value={step}
                onChange={handleStepChange}
            >
                {Object.keys(Steps).map((step) => (
                    <option key={step} value={step}>
                        {step}
                    </option>
                ))}
            </select>
            {step === Steps.CREATE_POST && <CreatePost />}
            {step === Steps.PREVIEW && "I am the preview page"}
            {step === Steps.METADATA && "I am the metadata page"}
            {step === Steps.PAYMENT && "I am the payment page"}
            {step === Steps.SUCCESS && "I am the success page"}
        </div>
    );
}
