export function KCard(props: {
  id: number;
  slug: string;
  name: string;
  cover: string;
  addToList?: string;
  redirect?: string;
  removeFromList?: string;
}) {
  return (
    <a
      class="kcard"
      style={`background-image: url(${props.cover})`}
      title={props.name}
      href={`/${props.slug}`}
    >
      {props.addToList || props.removeFromList
        ? (
          <form
            class={`kcard-add-to-list list-${
              props.addToList ? "adder" : "remover"
            }`}
            onSubmit={(e) => {
              e.preventDefault();
              const element = e.target as HTMLFormElement;
              const toAdd = element.classList.contains("list-adder");
              if (toAdd) {
                element.classList.remove("list-adder");
                element.classList.add("list-remover");
              } else {
                element.classList.remove("list-remover");
                element.classList.add("list-adder");
              }
              fetch(
                new URL(
                  toAdd ? "/api/list-add" : "/api/list-remove",
                  window.location.href,
                ).href,
                {
                  method: "POST",
                  credentials: "include",
                  body: new FormData(element),
                },
              );
            }}
          >
            <input
              type="hidden"
              name="id"
              value={props.addToList || props.removeFromList}
            />
            <input type="hidden" name="title_id" value={props.id} />
            <input
              type="hidden"
              name="redirect"
              value={props.redirect ?? "/"}
            />
            <button type="submit">+</button>
          </form>
        )
        : null}
    </a>
  );
}

export default KCard;
