import { PageProps } from "$fresh/server.ts";
import { App } from "@/components/App.tsx";
import { type Handlers } from "$fresh/server.ts";
import { type AccountState } from "@/routes/_middleware.ts";

export const handler: Handlers<AccountState, AccountState> = {
  GET(_request, ctx) {
    return ctx.render(ctx.state);
  },
};

export default function EditBioPage(props: PageProps<AccountState>) {
  const redirectURL = props.url.searchParams.get("redirect");
  return (
    <App>
      <div class="edit-bio-container">
        <form
          class="edit-bio-form"
          action="/api/edit-bio"
          method="GET"
        >
          <h3>Set a new bio</h3>
          <input type="hidden" name="redirect" value={redirectURL ?? "/"} />
          <textarea
            name="bio"
            placeholder={props.data.user
              ? "Enter your new bio here"
              : "You must be logged in to edit your bio"}
            disabled={props.data.user === null}
            required
          >
            {props.data.user?.bio}
          </textarea>
          <button type="submit" disabled={props.data.user === null}>
            Submit
          </button>
        </form>
      </div>
    </App>
  );
}
