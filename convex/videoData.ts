import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const CreateNewVideoData = mutation({
  args: {
    uid: v.id("users"),
    topic: v.string(),
    scriptVariant: v.any(),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.insert("videoData", {
      uid: args.uid,
      topic: args.topic,
      scriptVariant: args.scriptVariant,
    });

    return result; // Record ID
  },
});
