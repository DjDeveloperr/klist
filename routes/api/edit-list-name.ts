import type { Handlers } from "$fresh/server.ts";
import { assert } from "std/testing/asserts.ts";
import { AccountState } from "@/routes/_middleware.ts";

export const handler: Handlers<unknown, AccountState> = {
  async POST(request, ctx) {
    const formData = await request.formData();
    const id = formData.get("id");
    const name = formData.get("name");
    assert(typeof id === "string");
    assert(typeof name === "string");
    assert(ctx.state.user !== null);

    await ctx.state.supabaseClient.from("klists").update({
      name,
    }).eq("id", id).throwOnError();

    return new Response(null, {
      status: 204,
    });
  },
};
