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
                    <Tooltip>
                        <TooltipTrigger>
                            <Link
                                href={session ? "/posts/create" : "/"}
                                className={`flex items-center justify-center gap-2`}
                            >
                                <Button
                                    size="icon"
                                    className={cn(
                                        "focus: snap-none text-xl",
                                        session
                                            ? "bg-cta"
                                            : "bg-gray-500 hover:cursor-default"
                                    )}
                                >
                                    <Plus />
                                </Button>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent>
                            {session ? (
                                <span>Créer un post</span>
                            ) : (
                                <Link
                                    href={"/auth/signin"}
                                    className="text-cta"
                                >
                                    Connectez-vous pour créer un post
                                </Link>
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
