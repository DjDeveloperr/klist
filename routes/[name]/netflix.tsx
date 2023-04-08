import { HandlerContext } from "$fresh/server.ts";
import { NotFound } from "@/components/NotFound.tsx";
import { findBySlug } from "@/util/data.ts";

export default NotFound;

export const handler = async (
  _req: Request,
  ctx: HandlerContext,
): Promise<Response> => {
  const nameOrId = ctx.params.name;
  const drama = findBySlug(nameOrId);

  if (!drama) {
    return await ctx.render();
  }

  return Response.redirect(`https://www.netflix.com/title/${drama.id}`);
};
