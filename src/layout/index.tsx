import Head from "next/head";
import Footer from "./footer";
import Header from "./header";

type LayoutProps = {
    children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
    return (
        <>
            <Head>
                <title>RemplaMed</title>
                <meta name="description" content="Find a replacement" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <main className="h-[calc(100%-9.5rem)] p-4">{children}</main>
            <Footer />
        </>
    );
};

export default Layout;
