import Image from "next/image";
import type { IconProps } from "./types";

const FiltersIcon = ({ size = 24, onClick }: IconProps) => (
    <Image
        src="/filters.svg"
        alt="login-icon"
        width={size}
        height={size}
        onClick={onClick}
    />
);

export default FiltersIcon;
