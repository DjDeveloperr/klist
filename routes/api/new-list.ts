import type { Handlers } from "$fresh/server.ts";
import { assert } from "std/testing/asserts.ts";
import { AccountState } from "@/routes/_middleware.ts";

export const handler: Handlers<unknown, AccountState> = {
  async GET(request, ctx) {
    const q = new URL(request.url).searchParams;
    const redirectURL = q.get("redirect") ?? "/";
    assert(ctx.state.user !== null);

    const { data } = await ctx.state.supabaseClient.from("klists").insert({
      name: "Untitled List",
    }).select().single().throwOnError();
    assert(data !== null);

    return new Response(null, {
      status: 302,
      headers: {
        location: `/u/edit-list?id=${data.id}&redirect=${
          encodeURIComponent(redirectURL)
        }`,
      },
    });
  },
};
