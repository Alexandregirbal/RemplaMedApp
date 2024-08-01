"use client";

import { Filter, Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "shadcn/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "shadcn/components/ui/tooltip";
import { cn } from "shadcn/lib/utils";
import FiltersModal from "./components/FiltersModal";
import PostalCodeFinder from "./components/PostalCodeFinder";

const Filters = () => {
    const { data: session } = useSession();

    const [isFiltersModalOpened, setIsFiltersModalOpened] = useState(false);
    const openFiltersModal = () => {
        setIsFiltersModalOpened(true);
    };
    const closeFiltersModal = () => {
        setIsFiltersModalOpened(false);
    };
    return (
        <>
            <div className="flex items-center justify-evenly py-2">
                <Button
                    className="flex gap-2 bg-cta hover:cursor-pointer"
                    onClick={openFiltersModal}
                >
                    <Filter />
                    Filtrer
                </Button>
                <PostalCodeFinder />
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
                                <span
                                    // href={"/auth/signin"}
                                    className="text-cta"
                                >
                                    Connectez-vous pour créer un post
                                </span>
                            )}
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
            <FiltersModal
                isOpened={isFiltersModalOpened}
                onClose={closeFiltersModal}
            />
        </>
    );
};
export default Filters;
