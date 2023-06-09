"use client";

import { Spinner } from "flowbite-react";

type LoadingProps = {
    type?: "failure" | "gray" | "info" | "success" | "warning";
    size?: "xs" | "sm" | "md" | "lg" | "xl";
};

const Loading = ({ type = "gray", size = "lg" }: LoadingProps) => {
    return (
        <div className="absolute bottom-4 right-4">
            <Spinner aria-label={"Loading spinner"} color={type} size={size} />
        </div>
    );
};

export default Loading;
