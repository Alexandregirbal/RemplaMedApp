import { Analytics } from "@vercel/analytics/react";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import type { AppType } from "next/app";
import { Provider } from "react-redux";
import { wrapper } from "store";
import "styles/globals.css";
import Layout from "../layout";

const MyApp: AppType<{ session: Session | null }> = ({
    Component,
    pageProps: { session, ...pageProps },
}) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { store, props } = wrapper.useWrappedStore(pageProps);
    return (
        <SessionProvider session={session}>
            <Provider store={store}>
                <Layout>
                    <Component {...props} />
                    <Analytics />
                </Layout>
            </Provider>
        </SessionProvider>
    );
};

export default MyApp;
