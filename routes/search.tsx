import { PageProps } from "$fresh/server.ts";
import { App } from "../components/App.tsx";
import { KCard } from "../components/KCard.tsx";
import { KListTitle } from "../components/KListTitle.tsx";
import { search } from "../util/data.ts";

export default function Search(props: PageProps) {
  const results = search(props.url.searchParams.get("q") || "");

  return (
    <App title="Search Results - K-List">
      <div class="home">
        <KListTitle />
        <div class="kcard-grid">
          {results.map((drama) => <KCard {...drama} />)}
        </div>
      </div>
    </App>
  );
}
