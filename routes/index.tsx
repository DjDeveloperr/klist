import { type PageProps } from "$fresh/server.ts";
import { type Handlers } from "$fresh/server.ts";
import { App } from "@/components/App.tsx";
import { KCard } from "@/islands/KCard.tsx";
import { KListTitle } from "@/components/KListTitle.tsx";
import KDramaSearch from "@/islands/KDramaSearch.tsx";
import data from "@/static/data.json" assert { type: "json" };
import { type AccountState } from "@/routes/_middleware.ts";

export const handler: Handlers<AccountState, AccountState> = {
  GET(_request, ctx) {
    return ctx.render(ctx.state);
  },
};

export default function Home(props: PageProps<AccountState>) {
  return (
    <App>
      <div class="home">
        <KListTitle />
        {props.data.user
          ? (
            <p style="text-align: center">
              <a href="/u" style="color: white">
                Welcome back, {props.data.user.username}!
              </a>
            </p>
          )
          : (
            <p style="text-align: center">
              <a href="/signup">Sign up</a> to create your own K-Drama lists!
            </p>
          )}
        <KDramaSearch />
        <a
          class="instagram"
          style="text-align: center; display: block"
          href="https://instagram.com/klist.clips"
        >
          @klist.clips
        </a>
        <a
          class="instagram"
          style="text-align: center; display: block"
          href="https://discord.gg/7ppA8Z3Gmv"
        >
          Join Discord
        </a>
        <div class="kcard-grid">
          {data.dramas.map((drama) => <KCard {...drama} />)}
        </div>
      </div>
    </App>
  );
}
