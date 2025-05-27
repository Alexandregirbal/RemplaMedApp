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
        <header className="flex flex-col p-2">
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
                    <Link
                        href={"/"}
                        className="flex justify-center text-center text-xl"
                    >
                        {"Remplacements infirmiers libéraux"}
                    </Link>
                </div>

                <div className="flex  w-1/5 flex-row-reverse items-center ">
                    {session ? <Logged user={session.user} /> : <Login />}
                </div>
            </nav>
        </header>
    );
};

export default Header;
