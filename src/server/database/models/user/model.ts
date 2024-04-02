import { model } from "mongoose";
import { userSchema } from "./schema";

// The first argument ("User") passed to the model should be the singular form of your collection name.
// Mongoose automatically changes this to the plural form, transforms it to lowercase,
// and uses that for the database collection name.
export const UserModel = model("User", userSchema);
