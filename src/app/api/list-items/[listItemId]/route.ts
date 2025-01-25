import { NextResponse } from "next/server";

import { deleteListItem } from "@/features/collections/server/db/list";
import { verifyUser } from "@/lib/verifyUser";

type DeleteApiResponse = {
  message: string;
  error?: string;
};

type DeletePathParams = {
  params: Promise<{
    listItemId: number;
  }>;
};

// Delete listItem from list
export async function DELETE(
  request: Request,
  { params }: DeletePathParams,
): Promise<NextResponse<DeleteApiResponse>> {
  try {
    const { listItemId } = await params;

    if (!listItemId) {
      return NextResponse.json(
        { message: "Request is invalid." },
        { status: 400 },
      );
    }

    const user = await verifyUser();

    if (user?.id) {
      const result = await deleteListItem(listItemId);

      return NextResponse.json(
        {
          message: `${result.mediaType === "movie" ? "Film" : "TV series"} removed from list`,
        },

        { status: 200 },
      );
    } else {
      return NextResponse.json(
        { message: "Please create an account or log in to continue." },
        { status: 401 },
      );
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to delete list item";
    return NextResponse.json(
      {
        message: "An error occurred while deleting from list!",
        error: errorMessage,
      },
      { status: 500 },
    );
  }
}
