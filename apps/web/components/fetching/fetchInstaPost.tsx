"use client";
import { useEffect, useState } from "react";

export default async function fetchInstaPost(token: string) {
  const [posts, setPosts] = useState<{
    postId: string;
    caption: string;
    media: string;
    mediaType: "IMAGE" | "VIDEO" | "CAROUSEL";
  }>();

  useEffect(() => {
    fetchInstaPost(token);
  }, []);

  try {
    // we have to get token from user, then -> user.integrations[0].token

    const post = await fetch(
      `${process.env.INSTAGRAM_BASE_URL}/me/media?fields=id,caption,media_url,media_type,timestamp&limit=10&access_token=${token}`
    );

    const parsed = await post.json();

    // if (!parsed) return error;

    return parsed;
  } catch (error) {}
}
