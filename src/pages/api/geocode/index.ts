import { getGeocodeDataFromPostalCode } from "modules/geocode";
import type { NextApiRequest, NextApiResponse } from "next";

const handleGet = async (req: NextApiRequest, res: NextApiResponse) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const result = await getGeocodeDataFromPostalCode(
        req.query.postalCode as string
    );
    res.status(200).json(result);
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    console.log(`${req.method ?? ""} /api/geocode`);

    if (req.method === "GET") {
        return await handleGet(req, res);
    } else {
        return res.status(405).json({ message: "Method not allowed" });
    }
}
