import { PageProps } from "$fresh/server.ts";
import { App } from "../../components/App.tsx";
import { NotFound } from "../../components/NotFound.tsx";
import data from "../../static/data.json" assert { type: "json" };

export default function KDrama(props: PageProps) {
  const nameOrId = props.params.name;
  const drama = data.dramas
    .find((drama) =>
      drama.id.toString() === nameOrId || drama.slug === nameOrId
    );

  if (!drama) {
    return <NotFound />;
  }

  return (
    <App
      title={`${drama.name} - K-List`}
      description={drama.description}
      image={drama.image}
    >
      <div
        class="drama-image-background"
        style={`background-image: url(${drama.image})`}
      >
      </div>
      <div class="drama-info-overlay">
        <img class="drama-info-cover" src={drama.cover} alt={drama.name} />
        <div class="drama-info">
          <h2 class="drama-name">{drama.name}</h2>
          <h4 class="drama-subinfo">
            {drama.startDate}
            {drama.numberOfSeasons
              ? ` • ${drama.numberOfSeasons} season${
                drama.numberOfSeasons === 1 ? "" : "s"
              }`
              : ""}
            {drama.genre ? ` • ${drama.genre}` : ""} • {drama.contentRating}
          </h4>
          <p class="drama-description">{drama.description}</p>
          <p>
            <a
              class="watch-btn"
              href={`https://www.netflix.com/title/${drama.id}`}
            >
              Watch on Netflix
            </a>
          </p>
          <h4>Actors</h4>
          <p>{drama.actors.join(", ")}</p>
          <h4>Creators</h4>
          <p>{drama.creators.join(", ")}</p>
        </div>
      </div>
    </App>
  );
}
