"use client";

import { Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "shadcn/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "shadcn/components/ui/tooltip";
import { cn } from "shadcn/lib/utils";

const AddPostButton = () => {
    const { data: session } = useSession();
    return (
        <TooltipProvider>
            <Tooltip delayDuration={300}>
                <TooltipTrigger>
                    <Link
                        href={session ? "/posts/create" : "/"}
                        className={`flex items-center justify-center gap-2`}
                    >
                        <Button
                            asChild
                            size="icon"
                            className={cn(
                                "hover:cursor-text",
                                session
                                    ? "bg-cta"
                                    : "bg-gray-500 hover:cursor-default"
                            )}
                        >
                            <Plus className="h-10 w-10 hover:cursor-pointer" />
                        </Button>
                    </Link>
                </TooltipTrigger>
                <TooltipContent>
                    {session ? (
                        <span>Créer un post</span>
                    ) : (
                        <Link href={"/auth/signin"} className="text-cta">
                            Connectez-vous pour créer un post
                        </Link>
                    )}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

export default AddPostButton;
