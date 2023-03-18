export function KCard(props: {
  slug: string;
  name: string;
  cover: string;
}) {
  return (
    <a
      class="kcard"
      style={`background-image: url(${props.cover})`}
      title={props.name}
      href={`/${props.slug}`}
    >
    </a>
  );
}
