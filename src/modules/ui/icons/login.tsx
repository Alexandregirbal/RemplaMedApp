import Image from "next/image";
import type { IconProps } from "./types";

const LoginIcon = ({ size = 24 }: IconProps) => (
    <Image src="/login.svg" alt="login-icon" width={size} height={size} />
);

export default LoginIcon;
