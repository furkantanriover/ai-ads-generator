import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";

export const useVideoData = (videoId: string | string[] | undefined) => {
  const videoData = useQuery(
    api.videoData.GetVideoDataById,
    videoId ? { vid: videoId as Id<"videoData"> } : "skip"
  );

  return {
    videoData,
    isLoading: videoData === undefined,
    isError: videoData === null,
  };
};