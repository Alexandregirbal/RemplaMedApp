import { PaymentStatus } from "@mollie/api-client";
import { PostModel } from "server/database/models/post/model";

export const incrementPostViews = (postId: string) => {
    return PostModel.updateOne(
        {
            _id: postId,
        },
        {
            $inc: {
                views: 1,
            },
        }
    );
};

export const setPublishedPost = async (postId: string) => {
    return await PostModel.updateOne(
        {
            _id: postId,
        },
        {
            published: true,
        }
    );
};

export const togglePublished = async (postId: string) => {
    const post = await PostModel.findById(postId);
    if (!post) {
        return {
            success: false,
            error: "Post not found",
        };
    }

    if (post.paymentStatus !== PaymentStatus.paid) {
        return {
            success: false,
            error: "Post is not paid, cannot update the published status",
        };
    }
    const newPost = await PostModel.updateOne(
        {
            _id: postId,
        },
        {
            $set: {
                published: !post.published,
            },
        }
    );
    return {
        success: true,
        data: newPost,
    };
};

export const updatePaymentStatus = async ({
    postId,
    status,
}: {
    postId: string;
    status: PaymentStatus;
}) => {
    return await PostModel.updateOne(
        {
            _id: postId,
        },
        {
            paymentStatus: status,
        }
    );
};

export const openPostPayment = async ({
    paymentId,
    postId,
}: {
    postId: string;
    paymentId: string;
}) => {
    return await PostModel.updateOne(
        {
            _id: postId,
        },
        {
            paymentStatus: PaymentStatus.open,
            paymentId,
        }
    );
};
