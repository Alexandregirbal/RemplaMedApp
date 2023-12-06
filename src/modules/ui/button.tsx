type ButtonProps = {
    height?: number;
    className?: string;
    children: React.ReactNode;
};

const Button = ({ height = 8, className, children }: ButtonProps) => (
    <button
        className={`h-${height} rounded-lg bg-cta px-6 text-white hover:cursor-pointer ${
            className ?? ""
        }`}
    >
        {children}
    </button>
);
export default Button;
