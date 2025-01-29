import type { List, ListItem } from "@/types/data.types";

import { NextRequest, NextResponse } from "next/server";

import { deleteList, getListData } from "@/features/collections/server/db/list";
import { verifyUser } from "@/lib/verifyUser";

type GetApiResponse = {
  message: string;
  results?: {
    list: Omit<List, "userId">;
    isLiked: boolean;
    listItems: ListItem[];
  };
  error?: string;
};

type GetPathParams = {
  params: Promise<{
    username: string;
    slug: string;
  }>;
};

// Gets list data by id
export async function GET(
  request: Request,
  { params }: GetPathParams,
): Promise<NextResponse<GetApiResponse>> {
  // No user session check to allow public list viewing
  try {
    const { username, slug } = await params;

    const results = await getListData(username, slug);

    return NextResponse.json(
      { message: "List items fetched successfully", results },
      { status: 200 },
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to get list items";
    return NextResponse.json(
      {
        message: "An error occurred while fetching list items!",
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

    if (isNaN(listId)) {
      throw new Error("Error: Invalid Request");
    }

    if (!user?.id) {
      return NextResponse.json(
        { message: "Please create an account or log in to delete lists." },
        { status: 401 },
      );
    }

    const result = await deleteList(user.id, listId);

    if (result) {
      return NextResponse.json(
        { message: "List deleted successfully" },
        { status: 200 },
      );
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to delete list.";
    return NextResponse.json(
      {
        message: "An error occurred while deleting list!",
        error: errorMessage,
      },
      { status: 500 },
    );
  }
}
