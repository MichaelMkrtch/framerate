import { NextResponse } from "next/server";

import { SelectListItem } from "@/drizzle/schema";

import { listItemSchema } from "@/features/collections/schema/list";
import { addListItem } from "@/features/collections/server/db/list";
import { verifyUser } from "@/lib/verifyUser";

type PostApiResponse = {
  message: string;
  results?: SelectListItem;
  error?: string;
};

// Add listItem to list
export async function POST(
  request: Request,
): Promise<NextResponse<PostApiResponse>> {
  try {
    const body = await request.json();
    const user = await verifyUser();

    const parsed = listItemSchema.safeParse(body);

    if (!parsed.success) {
      console.log("errors", parsed.error.errors);
      return NextResponse.json({ message: `Invalid input` }, { status: 400 });
    }

    const { listId, mediaType, mediaId } = body;

    if (user?.id) {
      let result: SelectListItem;
      if (mediaType === "movie") {
        result = await addListItem({
          listId,
          mediaType,
          movieId: mediaId,
          seriesId: null,
          userId: user.id,
        });
      } else {
        result = await addListItem({
          listId,
          mediaType,
          movieId: null,
          seriesId: mediaId,
          userId: user.id,
        });
      }

      return NextResponse.json(
        {
          message: `${mediaType === "movie" ? "Film" : "TV series"} added to list`,
          results: result,
        },
        { status: 201 },
      );
    } else {
      return NextResponse.json(
        { message: "Please create an account or log in to continue." },
        { status: 401 },
      );
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to add list item";
    return NextResponse.json(
      {
        message: "An error occurred while adding to list!",
        error: errorMessage,
      },
      { status: 500 },
    );
  }
}
