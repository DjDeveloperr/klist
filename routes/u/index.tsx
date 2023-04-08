import { PageProps } from "$fresh/server.ts";
import { App } from "@/components/App.tsx";
import { type Handlers } from "$fresh/server.ts";
import { type AccountState } from "@/routes/_middleware.ts";

export const handler: Handlers<AccountState, AccountState> = {
  GET(request, ctx) {
    if (ctx.state.user) {
      return new Response(null, {
        status: 302,
        headers: {
          Location: "/u/" + ctx.state.user.username,
        },
      });
    } else {
      return new Response(null, {
        status: 302,
        headers: {
          Location: "/login",
        },
      });
    }
  },
};
