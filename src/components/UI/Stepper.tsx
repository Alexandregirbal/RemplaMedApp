import DoubleRightArrow from "./DoubleRightArrow";

type StepperProps = {
    steps: string[];
    activeStep: string;
    handleStepClick: (step: string) => void;
};

const Stepper = ({ steps, activeStep, handleStepClick }: StepperProps) => {
    return (
        <ol className="flex w-full items-center justify-evenly space-x-2 rounded-lg border border-gray-300 bg-background p-3 text-center text-sm font-medium text-paragraph shadow-sm hover:cursor-pointer sm:space-x-4 sm:p-4 sm:text-base">
            {steps.map((step, index) => {
                return (
                    <li
                        key={step}
                        onClick={() => handleStepClick(step)}
                        className={`flex items-center ${
                            activeStep === step ? "text-cta" : "text-paragraph"
                        }`}
                    >
                        <span
                            className={`mr-2 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-${
                                activeStep === step ? "cta" : "paragraph"
                            } text-xs`}
                        >
                            {index + 1}
                        </span>
                        {step}
                        {index + 1 !== steps.length ? (
                            <DoubleRightArrow />
                        ) : undefined}
                    </li>
                );
            })}
        </ol>
    );
};
export default Stepper;
