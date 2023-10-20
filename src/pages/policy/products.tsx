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
                <title>{"RemplaMed | Tarifs"}</title>
            </Head>
            <article className="flex h-full flex-col gap-2 p-4">
                <div className="flex flex-col gap-4">
                    <p>{"Date d'effet: 1er Septembre 2023"}</p>
                    <hr />
                    <p className="text-xl">
                        <strong>
                            {"RemplaMed propose les produits suivants: "}
                        </strong>
                    </p>
                </div>
                <ul className="flex list-inside list-disc flex-col gap-2">
                    <li>
                        {`${PRICING.POST.toFixed(
                            2
                        )} € : Publication d'un post sur le réseau.`}
                    </li>
                </ul>
            </article>
        </>
    );
};

export default Products;
