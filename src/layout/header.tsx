import Logged from "modules/auth/components/logged";
import Login from "modules/auth/components/login";
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
                    <Link href={"/posts/create"}>
                        <button className="h-10 rounded-lg border border-cta px-8 text-cta outline-cta">
                            + Publier
                        </button>
                    </Link>
                </div>
                <div id="posts-number" className="text-xl">
                    Plus de {metadata.totalRecentPosts} annonces récentes
                </div>

                {session ? <Logged user={session.user} /> : <Login />}
            </nav>
            <div id="headline" className=" flex h-8 justify-center text-3xl">
                RemplaMed, réseau de remplacement infirmier
            </div>
        </div>
    );
};

export default Header;
