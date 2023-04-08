import { PageProps } from "$fresh/server.ts";
import { App } from "@/components/App.tsx";
import { KCard } from "@/components/KCard.tsx";
import { KListTitle } from "@/components/KListTitle.tsx";
import { NotFound } from "@/components/NotFound.tsx";
import data from "@/static/data.json" assert { type: "json" };
import { type Handlers } from "$fresh/server.ts";
import { type AccountState, type User } from "@/routes/_middleware.ts";

export interface List {
  id: string;
  name: string;
  titles: number[];
}

export interface PageUser {
  id: string;
  username: string;
  bio: string | null;
  lists: List[];
}

export interface UserPageData {
  user?: User;
  pageUser?: PageUser;
}

export const handler: Handlers<UserPageData, AccountState> = {
  async GET(_request, ctx) {
    const user = await ctx
      .state
      .supabaseClient
      .from("klist_users")
      .select("id, username, bio")
      .eq("username", ctx.params.user)
      .throwOnError()
      .single()
      .then((e) => e.data);
    const listsList = user
      ? await ctx
        .state
        .supabaseClient
        .from("klists")
        .select("id, name")
        .eq("user_id", user.id)
        .throwOnError()
        .then((e) => e.data) ?? []
      : [];
    const lists: List[] = [];
    for (const list of listsList) {
      const titles = await ctx
        .state
        .supabaseClient
        .from("klist_entries")
        .select("title_id")
        .eq("list_id", list.id)
        .throwOnError()
        .then((e) => e.data) ?? [];
      lists.push({
        id: list.id,
        name: list.name,
        titles: titles.map((e) => e.title_id),
      });
    }
    return ctx.render({
      ...ctx.state,
      user: ctx.state.user ?? undefined,
      pageUser: user
        ? {
          id: user.id,
          username: user.username,
          bio: user.bio,
          lists,
        }
        : undefined,
    });
  },
};

export default function User(props: PageProps<UserPageData>) {
  if (!props.data.pageUser) {
    return <NotFound />;
  }

  const user = props.data.pageUser;
  const isSameUser = props.data.user?.id === user.id;

  return (
    <App
      title={`@${user.username} - K-List`}
      description={`${
        user.bio ? `${user.bio} • ` : ""
      }Check out @${user.username}'s K-Drama Lists!`}
    >
      <div class="user">
        <KListTitle />
        <h3>@{user.username}</h3>
        <br />
        <p>
          {user.bio ??
            (isSameUser ? "No bio has been set." : "")}
          {isSameUser
            ? (
              <>
                {" "}
                <a
                  href={`/u/edit-bio?redirect=${
                    encodeURIComponent(props.url.href)
                  }`}
                >
                  Edit bio
                </a>
              </>
            )
            : ""}
        </p>
        <br />
        {user.lists.length === 0
          ? (
            <>
              <p>No list has been created yet.</p>
              <br />
            </>
          )
          : ""}
        <p>
          <a
            href={`/api/new-list?redirect=${
              encodeURIComponent(props.url.href)
            }`}
          >
            Create new list
          </a>
        </p>
        <br />
        {user.lists.map((list) => (
          (
            <>
              <h4>
                {list.name} ({list.titles.length}) {isSameUser
                  ? (
                    <>
                      (<a
                        href={`/u/edit-list?id=${list.id}&redirect=${
                          encodeURIComponent(props.url.href)
                        }`}
                      >
                        edit
                      </a>)
                    </>
                  )
                  : ""}
              </h4>
              <div class="kcard-grid">
                {list.titles.map((drama) => (
                  <KCard {...data.dramas.find((e) => e.id === drama)!} />
                ))}
              </div>
            </>
          )
        ))}
        <br />
        <p>
          Logged in as{" "}
          <a href={`/u/${props.data.user?.username}`}>
            @{props.data.user?.username}
          </a>. <a href="/logout">Logout</a>
        </p>
      </div>
    </App>
  );
}
