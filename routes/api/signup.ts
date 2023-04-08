import type { Handlers } from "$fresh/server.ts";
import { AUTHENTICATED_REDIRECT_PATH } from "@/util/constants.ts";
import { assert } from "std/testing/asserts.ts";
import { type AccountState } from "@/routes/_middleware.ts";

export const handler: Handlers<unknown, AccountState> = {
  async POST(request, ctx) {
    const form = await request.formData();
    const username = form.get("username");
    const email = form.get("email");
    const password = form.get("password");
    assert(typeof username === "string");
    assert(typeof email === "string");
    assert(typeof password === "string");

    const headers = new Headers();
    const { error } = await ctx
      .state
      .supabaseClient
      .auth
      .signUp({
        email,
        password,
      });

    let redirectUrl = new URL(request.url).searchParams.get("redirect_url") ??
      AUTHENTICATED_REDIRECT_PATH;
    if (error) {
      redirectUrl = `/signup?error=${encodeURIComponent(error.message)}`;

      headers.set("location", redirectUrl);

      return new Response(null, { headers, status: 302 });
    }

    const authenticatedClient = ctx.state.supabaseClient;

    const { error: userError } = await authenticatedClient
      .from("klist_users")
      .insert({
        username,
      });

    if (userError) {
      redirectUrl = `/signup?error=${encodeURIComponent(userError.message)}`;
    }

    headers.set("location", redirectUrl);

    return new Response(null, { headers, status: 302 });
  },
};
