export default function KDramaSearch() {
  return (
    <form class="ksearch" action="/search" method="get">
      <input
        class="ksearch-query"
        type="text"
        name="q"
        placeholder="Search for K-Drama, Actor..."
        aria-label="Search for K-Drama, Actor..."
      />
    </form>
  );
}
