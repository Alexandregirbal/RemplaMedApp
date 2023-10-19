import Head from "next/head";

const PRICING = {
    POST: 5.9,
};

const Products = () => {
    return (
        <>
            <Head>
                <meta
                    http-equiv="Content-Type"
                    content="text/html; charset=utf-8"
                />
                <title>RemplaMed | Tarifs </title>
            </Head>
            <article className="page sans">
                <div className="page-body">
                    <p>Date effective: 2023-10-01</p>
                    <hr />
                    <p>RemplaMed propose les produits suivants:</p>
                    <ol>
                        <li>
                            <div className="">{`${PRICING.POST.toFixed(
                                2
                            )}€ : Publication d'un post sur le réseau.`}</div>
                        </li>
                    </ol>
                </div>
            </article>
        </>
    );
};

export default Products;
