import { HandlerContext } from "$fresh/server.ts";
import { NotFound } from "../../components/NotFound.tsx";
import data from "../../static/data.json" assert { type: "json" };

export default NotFound;

export const handler = async (
  _req: Request,
  ctx: HandlerContext,
): Promise<Response> => {
  const nameOrId = ctx.params.name;
  const drama = data.dramas
    .find((drama) =>
      drama.id.toString() === nameOrId || drama.slug === nameOrId
    );

  if (!drama) {
    return await ctx.render();
  }

  return Response.redirect(`https://www.netflix.com/title/${drama.id}`);
};
