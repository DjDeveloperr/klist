import { type Handlers } from "$fresh/server.ts";
import { PageProps } from "$fresh/server.ts";
import { App } from "@/components/App.tsx";
import { KCard } from "@/islands/KCard.tsx";
import { KListTitle } from "@/components/KListTitle.tsx";
import KDramaSearch from "@/islands/KDramaSearch.tsx";
import { search } from "@/util/data.ts";
import { type List } from "@/routes/u/[user].tsx";
import { type AccountState } from "@/routes/_middleware.ts";
import { assert } from "std/testing/asserts.ts";

export const handler: Handlers<List | undefined, AccountState> = {
  async GET(request, ctx) {
    const q = new URL(request.url).searchParams;
    const listID = q.get("list");
    if (!listID) {
      return ctx.render(undefined);
    }
    const { data } = await ctx
      .state
      .supabaseClient
      .from("klists")
      .select("id, name")
      .eq("id", listID)
      .limit(1)
      .single();
    assert(data);
    const titles = await ctx
      .state
      .supabaseClient
      .from("klist_entries")
      .select("title_id")
      .eq("list_id", listID)
      .then((e) => e.data) ?? [];
    return ctx.render({
      ...ctx.state,
      id: data.id,
      name: data.name,
      titles: titles.map((e) => e.title_id),
    });
  },
};

export default function Search(props: PageProps<List | undefined>) {
  const results = search(props.url.searchParams.get("q") || "");
  const list = props.url.searchParams.get("list");
  const redirect = props.url.searchParams.get("redirect");

  return (
    <App title="Search Results - K-List">
      <div class="home">
        <KListTitle />
        <KDramaSearch
          init={props.url.searchParams.get("q") || ""}
          listAddInfo={list
            ? ({
              listId: list!,
              redirect: redirect!,
            })
            : undefined}
        />
        <h3 style="text-align: center">Search Results</h3>
        {results.length === 0
          ? <p style="text-align: center">No results found.</p>
          : (
            <p style="text-align: center">
              {results.length} result{results.length === 1 ? "" : "s"} found
            </p>
          )}
        {list
          ? (
            <h4 style="text-align: center; padding: 1 rem">
              Editing list: {props.data?.name}
            </h4>
          )
          : null}
        <div class="kcard-grid">
          {results.map((drama) => (
            <KCard
              {...drama}
              addToList={props.data?.titles.includes(drama.id) || !list
                ? undefined
                : list}
              redirect={props.url.href}
              removeFromList={props.data?.titles.includes(drama.id) && list
                ? list
                : undefined}
            />
          ))}
        </div>
        {redirect
          ? (
            <p style="text-align: center; padding: 1rem">
              <a href={redirect}>Back</a>
            </p>
          )
          : null}
      </div>
    </App>
  );
}
