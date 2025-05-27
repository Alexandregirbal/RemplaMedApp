import { GoogleAnalytics } from "@next/third-parties/google";
import Loading from "modules/ui/loading";
import Head from "next/head";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUIState, setIsMobile } from "store/slices/ui/slice";
import Footer from "./footer";
import Header from "./header";

type LayoutProps = {
    children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
    const dispatch = useDispatch();
    const { isLoading } = useSelector(selectUIState);

    useEffect(() => {
        const { matches } = window.matchMedia("(max-width: 450px)");
        dispatch(setIsMobile(matches));
    }, [dispatch]);

    return (
        <div className="flex h-screen flex-col">
            <Head>
                <title key="title">RemplaMed</title>
                <meta
                    name="description"
                    key="description"
                    content="Remplacement infirmiers facile autour de chez vous."
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <GoogleAnalytics gaId="AW-16518733052" />
            <Header />
            <main className="flex grow flex-col">{children}</main>
            {isLoading && <Loading size="xl" />}
            <Footer />
        </div>
    );
};

export default Layout;
