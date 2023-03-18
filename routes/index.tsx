import { App } from "../components/App.tsx";
import { KCard } from "../components/KCard.tsx";
import data from "../static/data.json" assert { type: "json" };

export default function Home() {
  return (
    <App>
      <div class="home">
        <h1>K-List</h1>
        <div class="kcard-grid">
          {data.dramas.map((drama) => <KCard {...drama} />)}
        </div>
      </div>
    </App>
  );
}
