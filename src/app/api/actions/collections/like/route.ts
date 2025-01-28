import { NextRequest, NextResponse } from "next/server";

import {
  addListLike,
  removeListLike,
} from "@/features/collections/server/db/list";
import { isPostgresError } from "@/lib/utils";
import { verifyUser } from "@/lib/verifyUser";

type PostApiResponse = {
  message: string;
  results?: { likeCount: number };
  error?: string;
};

export async function POST(
  request: Request,
): Promise<NextResponse<PostApiResponse>> {
  try {
    const { listId } = await request.json();
    const user = await verifyUser();

    if (typeof listId !== "number") {
      throw new Error("Error: Invalid Request");
    }

    if (!user?.id) {
      return NextResponse.json(
        { message: "Please create an account or log in to like lists." },
        { status: 401 },
      );
    }

    const results = await addListLike(user.id, listId);

    return NextResponse.json(
      { message: "Liked successfully", results },
      { status: 201 },
    );
  } catch (error) {
    if (isPostgresError(error) && error.code === "23505") {
      return NextResponse.json(
        { message: "You have already liked this item" },
        { status: 409 },
      );
    }

    const errorMessage =
      error instanceof Error ? error.message : "Failed to like list.";

    return NextResponse.json(
      {
        message: "An error occurred while liking list!",
        error: errorMessage,
      },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get("id");
    const listId = Number(id);
    const user = await verifyUser();

    if (typeof listId !== "number") {
      throw new Error("Error: Invalid Request");
    }

    if (!user?.id) {
      return NextResponse.json(
        { message: "Please create an account or log in to like lists." },
        { status: 401 },
      );
    }

    const results = await removeListLike(user.id, listId);

    return NextResponse.json(
      { message: "Unliked successfully", results },
      { status: 200 },
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to unlike list.";
    return NextResponse.json(
      {
        message: "An error occurred while unliking list!",
        error: errorMessage,
      },
      { status: 500 },
    );
  }
}
