import { api } from "@/lib/axios";
import { fetchInsta } from "@/lib/fetch-insta";
import React from "react";
import { cookies } from "next/headers";

export default async function OnBoardUser() {
  try {
    const cookieStore = await cookies();

    const { data } = await api.get("/user/data", {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    if (data) {
      if (data.integrations.length > 0) {
        const today = new Date();
        const timeLeft =
          data.integrations[0].expiresAt?.getTime()! - today.getTime();

        const days = Math.round(timeLeft / (1000 * 60 * 60 * 24));

        if (days < 5) {
          const refreshTokenResponse = await fetchInsta(
            data.integrations[0].token
          );

          const today = new Date();
          const expiresAt = today.setDate(today.getDate() + 60);

          const update_token = await api.patch(
            "/user/insta-token",
            {
              refreshToken: refreshTokenResponse.access_token,
              expiresAt: new Date(expiresAt),
              integrationId: data.integrations[0].id,
            },
            {
              headers: {
                Cookie: cookieStore.toString(),
              },
            }
          );

          if (!update_token) {
            console.log("Update token failed");
          }
        }
      }
    }
  } catch (error: any) {
    console.error("OnBoardUser error:", error.message);
    return <div>Error</div>;
  }

  return <div></div>;
}
