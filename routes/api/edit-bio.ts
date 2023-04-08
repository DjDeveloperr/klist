import type { Handlers } from "$fresh/server.ts";
import { assert } from "std/testing/asserts.ts";
import { AccountState } from "@/routes/_middleware.ts";

export const handler: Handlers<unknown, AccountState> = {
  async GET(request, ctx) {
    const q = new URL(request.url).searchParams;
    const redirectURL = q.get("redirect") ?? "/";
    const bio = q.get("bio");
    assert(typeof bio === "string");
    assert(ctx.state.user !== null);

    await ctx.state.supabaseClient.from("klist_users").update({
      bio,
    }).eq("id", ctx.state.user.id).throwOnError();

    return new Response(null, {
      status: 302,
      headers: { location: redirectURL },
    });
  },
};
