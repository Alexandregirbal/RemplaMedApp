import { Analytics } from "@vercel/analytics/react";
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
        <>
            <Head>
                <title key="title">RemplaMed</title>
                <meta
                    name="description"
                    key="description"
                    content="Remplacement infirmiers facile autour de chez vous."
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <main className="h-[calc(100%-10.5rem)] overflow-y-auto">
                <Analytics />
                {children}
            </main>
            {isLoading && <Loading size="xl" />}
            <Footer />
        </>
    );
};

export default Layout;
