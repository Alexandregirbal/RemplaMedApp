import { Tooltip } from "flowbite-react";
import Logged from "modules/auth/components/LoggedIcon";
import Login from "modules/auth/components/LoginButton";
import { getMetaData } from "modules/post/services/getMetadata";
import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectPostsState, setPostsMetadata } from "store/slices/posts/slice";

const Header: NextPage = () => {
    const { data: session } = useSession();
    const { metadata } = useSelector(selectPostsState);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            const metadata = await getMetaData();
            dispatch(setPostsMetadata(metadata));
        };
        void fetchData();
    }, [dispatch]);

    return (
        <div className="h-42 flex flex-col p-2">
            <nav id="navbar" className="flex justify-between ">
                <div className="flex w-1/5 items-center gap-1 sm:gap-4">
                    <Link href={"/"}>
                        <Image
                            src="/remplamed_logo.svg"
                            alt="remplamed-logo"
                            width={50}
                            height={50}
                        />
                    </Link>
                </div>
                <div id="headline" className="flex flex-col items-center gap-1">
                    <div className="text-3xl">
                        <span>Rempla</span>
                        <span className="text-cta">Med</span>
                    </div>
                    {metadata.totalRecentPosts > 0 && (
                        <span
                            id="posts-number"
                            className="flex justify-center text-xl"
                        >
                            {`${metadata.totalRecentPosts} annonces récentes`}
                        </span>
                    )}
                </div>

                <div className="flex  w-1/5 flex-row-reverse items-center ">
                    {session ? <Logged user={session.user} /> : <Login />}
                </div>
            </nav>
            <div className="flex grow flex-col items-center justify-center gap-2">
                <span className="flex justify-center  text-xl">
                    {"Réseau de remplacement infirmier"}
                </span>
                <Tooltip
                    content={
                        session
                            ? "Commencez à créer un poste"
                            : "Connectez vous pour créer un poste"
                    }
                >
                    <Link
                        href={session ? "/posts/create" : "/"}
                        className={`flex items-center justify-center gap-2`}
                    >
                        <button
                            className={`h-8 rounded-lg bg-cta px-6 text-white ${
                                session
                                    ? " bg-cta "
                                    : " bg-gray-500 hover:cursor-default"
                            }`}
                        >
                            Publier
                        </button>
                    </Link>
                </Tooltip>
            </div>
        </div>
    );
};

export default Header;
