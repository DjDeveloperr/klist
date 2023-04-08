import type { Handlers } from "$fresh/server.ts";
import { assert } from "std/testing/asserts.ts";
import { AccountState } from "@/routes/_middleware.ts";

export const handler: Handlers<unknown, AccountState> = {
  async POST(request, ctx) {
    const formData = await request.formData();
    const id = formData.get("id");
    const titleID = formData.get("title_id");
    const redirect = formData.get("redirect");
    assert(typeof id === "string");
    assert(typeof titleID === "string");
    assert(typeof redirect === "string");
    assert(ctx.state.user !== null);

    console.log("id", id);
    console.log("titleID", titleID);
    console.log("redirect", redirect);

    await ctx.state.supabaseClient.from("klist_entries").delete().eq(
      "list_id",
      id,
    ).eq("title_id", titleID).throwOnError();

    return new Response(null, {
      status: 302,
      headers: { location: redirect },
    });
  },
};
