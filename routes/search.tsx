import { PageProps } from "$fresh/server.ts";
import { App } from "../components/App.tsx";
import { KCard } from "../components/KCard.tsx";
import { KListTitle } from "../components/KListTitle.tsx";
import KDramaSearch from "../islands/KDramaSearch.tsx";
import { search } from "../util/data.ts";

export default function Search(props: PageProps) {
  const results = search(props.url.searchParams.get("q") || "");

  return (
    <App title="Search Results - K-List">
      <div class="home">
        <KListTitle />
        <KDramaSearch />
        <h3 style="text-align: center">Search Results</h3>
        {results.length === 0
          ? <p style="text-align: center">No results found.</p>
          : (
            <p style="text-align: center">
              {results.length} result{results.length === 1 ? "" : "s"} found
            </p>
          )}
        <div class="kcard-grid">
          {results.map((drama) => <KCard {...drama} />)}
        </div>
      </div>
    </App>
  );
}
