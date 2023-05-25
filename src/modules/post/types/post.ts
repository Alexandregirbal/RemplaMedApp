import type { Post, User } from "@prisma/client";

export type PostWithAuthorName = Post & { author: Pick<User, "name"> };
