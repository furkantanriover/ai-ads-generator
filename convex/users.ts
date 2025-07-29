import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const CreateNewUser = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    picture: v.string(),
  },
  handler: async (ctx, args) => {
    // If User already Exist?
    const userData = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args.email))
      .collect();

    // If Not Then Insert new user
    if (userData?.length === 0) {
      const data = {
        name: args.name,
        email: args.email,
        picture: args.picture,
        credits: 30,
      };

      const result = await ctx.db.insert("users", {
        ...data,
      });

      console.log("New User Created", result);

      return {
        ...data,
        id: result,
      };
    }

    return userData[0];
  },
});
