import Head from "next/head";
import Footer from "./footer";
import Header from "./header";
import { useSelector } from "react-redux";
import { selectUIState } from "store/slices/ui/slice";
import Loading from "modules/ui/loading";

type LayoutProps = {
    children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
    const { isLoading } = useSelector(selectUIState);

    return (
        <>
            <Head>
                <title>RemplaMed</title>
                <meta name="description" content="Find a replacement" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <main className="h-[calc(100%-9.5rem)]">{children}</main>
            {isLoading && <Loading />}
            <Footer />
        </>
    );
};

export default Layout;
