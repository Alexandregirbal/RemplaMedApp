import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import type { AppType } from "next/app";
import Layout from "../layout";
import "styles/globals.css";
import { wrapper } from "store";
import { Provider } from "react-redux";

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
                </Layout>
            </Provider>
        </SessionProvider>
    );
};

export default MyApp;
