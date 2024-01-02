"use client";

import { Spinner } from "flowbite-react";

type LoadingProps = {
    type?: "failure" | "gray" | "info" | "success" | "warning";
    size?: "xs" | "sm" | "md" | "lg" | "xl";
};

const Loading = ({ type = "gray", size = "lg" }: LoadingProps) => {
    return (
        <div className="absolute bottom-0 right-0 z-10 flex h-full w-full items-center justify-center bg-[#0000006e]">
            <Spinner aria-label={"Loading spinner"} color={type} size={size} />
        </div>
    );
};

export default Loading;
