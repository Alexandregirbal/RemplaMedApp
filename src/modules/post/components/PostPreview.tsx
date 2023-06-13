import dayjs from "dayjs";
import type { PostsState } from "store/slices/posts/types";

require("dayjs/locale/fr");
dayjs.locale("fr");

type PostProps = {
    post: PostsState["newPost"] & { authorName: string };
};

const PostComponent = ({ post }: PostProps) => {
    const timeDiffMonths = post.availablityTo
        ? dayjs(post.availablityTo).diff(post.availablityFrom, "month")
        : 0;
    return (
        <div
            className={`flex h-full flex-col rounded-lg border border-primary bg-background p-2 shadow-xl transition`}
        >
            <div className=" border-b border-b-primary p-1 text-center ">
                <div className="truncate text-xl font-bold">{post.title}</div>
                <div className="">{post.postalCode}</div>
            </div>
            {post.availablityFrom && (
                <span className="">
                    A partir du{" "}
                    {dayjs(post.availablityFrom).format("DD MMM YYYY")}
                </span>
            )}
            {post.availablityTo && (
                <span className="">
                    {", "}
                    {"jusqu'au"}{" "}
                    {dayjs(post.availablityTo).format("DD MMM YYYY")}
                    {timeDiffMonths ? ` (${timeDiffMonths} mois)` : ""}
                </span>
            )}
            <pre className="h-full overflow-y-auto overflow-x-hidden whitespace-pre-wrap p-4 text-paragraph">
                {post.message}
            </pre>
            <div className="flex flex-row-reverse gap-1 text-sm">
                le {dayjs().format("D MMMM YYYY")}
                <p className="italic">{post.authorName}</p>
                Posté par
            </div>
        </div>
    );
};

export default PostComponent;
