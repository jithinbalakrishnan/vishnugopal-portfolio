import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

/**
 * Sanity webhook target. Point a "Publish" webhook at /api/revalidate with the
 * same secret as SANITY_REVALIDATE_SECRET and published edits appear without a
 * redeploy. Until that is set up, content refreshes on the cacheLife window.
 */
export async function POST(req: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<{ _type: string }>(
      req,
      process.env.SANITY_REVALIDATE_SECRET,
    );

    if (!isValidSignature) {
      return new NextResponse("Invalid signature", { status: 401 });
    }
    if (!body?._type) {
      return new NextResponse("Bad request", { status: 400 });
    }

    // "max" expires the tag immediately on the next request.
    revalidateTag(body._type, "max");
    return NextResponse.json({ revalidated: true, tag: body._type });
  } catch (err) {
    console.error(err);
    return new NextResponse("Error revalidating", { status: 500 });
  }
}
