// Copyright 2023 the Deno authors. All rights reserved. MIT license.
import { MiddlewareHandlerContext } from "$fresh/server.ts";
import { createSupabaseClient, SupabaseClient } from "@/util/supabase.ts";
import { type Database } from "@/util/supabase_types.ts";

export type Session = Awaited<
  ReturnType<SupabaseClient["auth"]["getSession"]>
>["data"]["session"];

export type User = Database["public"]["Tables"]["klist_users"]["Row"];

export interface AccountState {
  supabaseClient: SupabaseClient;
  session: Session | null;
  user: User | null;
}

export async function handler(
  request: Request,
  ctx: MiddlewareHandlerContext<AccountState>,
) {
  const headers = new Headers();
  const supabaseClient = createSupabaseClient(request.headers, headers);

  const { data: { session } } = await supabaseClient.auth.getSession();

  ctx.state.session = session;
  ctx.state.supabaseClient = supabaseClient;
  ctx.state.user = session
    ? await supabaseClient.from("klist_users").select("*").eq(
      "id",
      session.user.id,
    ).limit(1).single().throwOnError().then((r) => r.data)
    : null;

  const response = await ctx.next();
  headers.forEach((value, key) => response.headers.set(key, value));

  return response;
}
