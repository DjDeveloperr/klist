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
      {props.addToList
        ? (
          <form
            action="/api/list-add"
            method="POST"
            class="kcard-add-to-list"
          >
            <input type="hidden" name="id" value={props.addToList} />
            <input type="hidden" name="title_id" value={props.id} />
            <input
              type="hidden"
              name="redirect"
              value={props.redirect ?? "/"}
            />
            <button type="submit" style="color: green">+</button>
          </form>
        )
        : null}
      {props.removeFromList
        ? (
          <form
            action="/api/list-remove"
            method="POST"
            class="kcard-add-to-list rot-90"
          >
            <input type="hidden" name="id" value={props.removeFromList} />
            <input type="hidden" name="title_id" value={props.id} />
            <input
              type="hidden"
              name="redirect"
              value={props.redirect ?? "/"}
            />
            <button type="submit" style="color: red">
              +
            </button>
          </form>
        )
        : null}
    </a>
  );
}
