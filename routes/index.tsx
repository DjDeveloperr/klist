import { App } from "../components/App.tsx";
import { KCard } from "../components/KCard.tsx";
import { KListTitle } from "../components/KListTitle.tsx";
import KDramaSearch from "../islands/KDramaSearch.tsx";
import data from "../static/data.json" assert { type: "json" };

export default function Home() {
  return (
    <App>
      <div class="home">
        <KListTitle />
        <KDramaSearch />
        <a class="instagram" style="text-align: center; display: block" href="https://instagram.com/klist.clips">
          @klist.clips
        </a>
        <div class="kcard-grid">
          {data.dramas.map((drama) => <KCard {...drama} />)}
        </div>
      </div>
    </App>
  );
}
