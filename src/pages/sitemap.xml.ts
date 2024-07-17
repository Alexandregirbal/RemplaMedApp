import { findPostsIds } from "modules/post/dao/find";
import type { GetServerSideProps } from "next";
import type { Post } from "server/database/models/post/types";
import { getDomainUrl } from "server/domain";

// See result on localhost: http://localhost:3000/sitemap.xml
// See result on production: https://www.rempla-med.fr/sitemap.xml

const generateSiteMap = (posts: Array<Pick<Post, "_id" | "createdAt">>) => {
    const domainUrl = getDomainUrl();
    return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>https://www.rempla-med.fr</loc>
       <priority>1.0</priority>
     </url>
     <url>
       <loc>https://rempla-med.fr</loc>
        <priority>1.0</priority>
     </url>
     <url>
       <loc>https://www.rempla-med.fr/posts/create</loc>
        <priority>0.1</priority>
     </url>
     ${posts
         .map((post) => {
             return `
       <url>
           <loc>${`${domainUrl}/posts/${post._id.toString()}`}</loc>
           <lastmod>${post.createdAt.toISOString()}</lastmod>
           <priority>0.5</priority>
       </url>
     `;
         })
         .join("")}
   </urlset>
 `;
};

function SiteMap() {
    // getServerSideProps will do the heavy lifting
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
    const postsIds = await findPostsIds();

    const sitemap = generateSiteMap(postsIds);

    res.setHeader("Content-Type", "text/xml");
    res.write(sitemap);
    res.end();

    return {
        props: {},
    };
};

export default SiteMap;
