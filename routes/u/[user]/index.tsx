import { PageProps } from "$fresh/server.ts";
import { App } from "../../../components/App.tsx";
import { KCard } from "../../../components/KCard.tsx";
import { NotFound } from "../../../components/NotFound.tsx";
import data from "../../../static/data.json" assert { type: "json" };
import users from "../../../static/users.json" assert { type: "json" };

export default function User(props: PageProps) {
  const user = users.find((e) =>
    e.username.toLowerCase() === props.params.user.toLowerCase()
  );
  if (!user) {
    return <NotFound />;
  }

  return (
    <App
      title={`@${user.username} - K-List`}
      description={`${user.bio} • Check out @${user.username}'s K-Drama Lists!`}
    >
      <div class="user">
        <h3>@{user.username}</h3>
        <br />
        <p>{user.bio}</p>
        <br />
        {user.lists.map((list) => (
          (
            <>
              <h4>{list.name} ({list.values.length})</h4>
              <div class="kcard-grid">
                {list.values.map((drama) => (
                  <KCard {...data.dramas.find((e) => e.id === drama)!} />
                ))}
              </div>
            </>
          )
        ))}
      </div>
    </App>
  );
}
