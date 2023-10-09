import type { IconProps } from "./types";

const CloseIcon = ({ size = 24 }: IconProps) => (
    <svg
        width={size}
        height={size}
        className="h-5 w-5"
        stroke="currentColor"
        fill="none"
        viewBox="0 0 24 24"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
        />
    </svg>
);

export default CloseIcon;
