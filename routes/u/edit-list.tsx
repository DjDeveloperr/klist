import { PageProps } from "$fresh/server.ts";
import { App } from "@/components/App.tsx";
import { type Handlers } from "$fresh/server.ts";
import { type AccountState } from "@/routes/_middleware.ts";
import { type List } from "@/routes/u/[user].tsx";
import { assert } from "std/testing/asserts.ts";
import { KCard } from "../../components/KCard.tsx";
import data from "@/static/data.json" assert { type: "json" };
import KDramaSearch from "../../islands/KDramaSearch.tsx";

export const handler: Handlers<List, AccountState> = {
  async GET(request, ctx) {
    const q = new URL(request.url).searchParams;
    const listID = q.get("id");
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

export default function EditListPage(props: PageProps<List>) {
  const redirectURL = props.url.searchParams.get("redirect");
  return (
    <App>
      <div class="list-editor">
        <div style="display: flex; align-items: center; justify-content: center; padding: 1rem">
          <h3>Edit List</h3>
        </div>
        <form
          class="edit-list-name-container"
          action="/api/edit-list-name"
          method="POST"
        >
          <input type="hidden" name="id" value={props.data.id} />
          <input
            class="edit-list-name"
            type="text"
            placeholder="List name"
            name="name"
            value={props.data.name}
          />
          <button type="submit" class="edit-list-name-button">Save</button>
        </form>
        <div style="display: flex; align-items: center; justify-content: center; padding-top: 1rem;">
          <a href={redirectURL ?? "/"} style="text-align: center">Back</a>
        </div>
        <KDramaSearch
          listAddInfo={{
            listId: props.data.id,
            redirect: props.url.href,
          }}
        />
        {props.data.titles.length === 0
          ? (
            <div style="display: flex; align-items: center; justify-content: center; padding: 1rem">
              <h3>No dramas added in this list yet.</h3>
            </div>
          )
          : null}
        <div class="kcard-grid">
          {props.data.titles.map((drama) => (
            <KCard {...data.dramas.find((e) => e.id === drama)!} />
          ))}
        </div>
      </div>
    </App>
  );
}
