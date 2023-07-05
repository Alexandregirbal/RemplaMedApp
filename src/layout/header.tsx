import { Tooltip } from "flowbite-react";
import Logged from "modules/auth/components/LoggedIcon";
import Login from "modules/auth/components/LoginButton";
import { getMetaData } from "modules/post/services/getMetadata";
import AddIcon from "modules/ui/icons/add";
import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectPostsState, setPostsMetadata } from "store/slices/posts/slice";
import { selectUIState } from "store/slices/ui/slice";

const Header: NextPage = () => {
    const { data: session } = useSession();
    const { metadata } = useSelector(selectPostsState);
    const { isMobile } = useSelector(selectUIState);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            const metadata = await getMetaData();
            dispatch(setPostsMetadata(metadata));
        };
        void fetchData();
    }, [dispatch]);

    return (
        <div className="h-32 p-4">
            <nav id="navbar" className="flex  items-center justify-between ">
                <div className="flex items-center gap-6">
                    <Link href={"/"}>
                        <Image
                            src="/logo-transparent-png-no-text.png"
                            alt="remplamed-logo"
                            width={64}
                            height={64}
                        />
                    </Link>
                    <Tooltip
                        content={
                            session
                                ? "Commencez à créer un poste"
                                : "Connectez vous pour créer un poste"
                        }
                    >
                        <Link
                            href={session ? "/posts/create" : "/"}
                            className={`flex items-center gap-2 ${
                                session
                                    ? " text-cta "
                                    : " text-gray-500 hover:cursor-default"
                            }`}
                        >
                            <AddIcon size={45} />
                            {!isMobile && (
                                <span className="text-xl">{"Publier"}</span>
                            )}
                        </Link>
                    </Tooltip>
                </div>
                <div
                    id="headline"
                    className=" flex h-8 flex-col justify-center "
                >
                    <span className="flex justify-center text-3xl">
                        {"RemplaMed"}
                    </span>
                    <span className="flex justify-center">
                        {"Réseau de remplacement infirmier"}
                    </span>
                </div>

                {session ? <Logged user={session.user} /> : <Login />}
            </nav>
            <div id="posts-number" className="flex justify-center text-xl">
                Plus de {metadata.totalRecentPosts} annonces récentes
            </div>
        </div>
    );
};

export default Header;
