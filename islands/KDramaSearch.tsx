export default function KDramaSearch(props: {
  listAddInfo?: {
    listId: string;
    redirect: string;
  };
}) {
  return (
    <form
      class="ksearch"
      action="/search"
      method="get"
    >
      {props.listAddInfo
        ? (
          <>
            <input
              type="hidden"
              name="list"
              value={props.listAddInfo?.listId}
            />
            <input
              type="hidden"
              name="redirect"
              value={props.listAddInfo?.redirect}
            />
          </>
        )
        : null}
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
