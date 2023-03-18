import { App } from "./App.tsx";

export function NotFound() {
  return (
    <App
      title="K-List | Not Found"
      description="The page you are looking for does not exist."
    >
      <div class="not-found">
        <h2>Not Found</h2>
        <p>The page you are looking for does not exist.</p>
        <p>
          <a href="/">Return to the homepage</a>
        </p>
      </div>
    </App>
  );
}
