import type { NextApiRequest } from "next/types";

const mobileIndicators = [
    "Mobile",
    "iPhone",
    "Android",
    "BlackBerry",
    "Windows Phone",
    "Opera Mini",
    "IEMobile",
    "WPDesktop",
];

export const isMobile = (req: NextApiRequest): boolean => {
    return mobileIndicators.reduce<boolean>((acc, cur) => {
        return (acc || req.headers["user-agent"]?.includes(cur)) ?? false;
    }, false);
};
