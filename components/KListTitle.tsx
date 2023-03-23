export function KListTitle(props: { align?: string }) {
  return (
    <a class="title" style={`text-align: ${props.align ?? "center"}`} href="/">
      K-List
    </a>
  );
}
