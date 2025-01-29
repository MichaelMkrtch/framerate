import { NextRequest, NextResponse } from "next/server";

import {
  addSavedList,
  removeSavedList,
} from "@/features/collections/server/db/list";
import { isPostgresError } from "@/lib/utils";
import { verifyUser } from "@/lib/verifyUser";

type PostApiResponse = {
  message: string;
  results?: { saveCount: number };
  error?: string;
};

export async function POST(
  request: Request,
): Promise<NextResponse<PostApiResponse>> {
  try {
    const { listId }: { listId: number } = await request.json();
    const user = await verifyUser();

    if (typeof listId !== "number") {
      throw new Error("Error: invalid request for like status.");
    }

    if (!user?.id) {
      return NextResponse.json(
        { message: "Please create an account or log in to save lists." },
        { status: 401 },
      );
    }

    const results = await addSavedList(user.id, listId);

    return NextResponse.json(
      { message: "Saved successfully", results },
      { status: 201 },
    );
  } catch (error) {
    if (isPostgresError(error) && error.code === "23505") {
      return NextResponse.json(
        { message: "You have already saved this list" },
        { status: 409 },
      );
    }

    const errorMessage =
      error instanceof Error ? error.message : "Failed to save list.";

    return NextResponse.json(
      {
        message: "An error occurred while saving list!",
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
        { message: "Please create an account or log in to save lists." },
        { status: 401 },
      );
    }

    const results = await removeSavedList(user.id, listId);

    return NextResponse.json(
      { message: "Unsaved successfully", results },
      { status: 200 },
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to unsave list.";
    return NextResponse.json(
      {
        message: "An error occurred while unsaving list!",
        error: errorMessage,
      },
      { status: 500 },
    );
  }
}
