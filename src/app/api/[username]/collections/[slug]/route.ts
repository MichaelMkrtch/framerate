import { NextResponse } from "next/server";

import { getListData } from "@/features/collections/server/db/list";

type GetApiResponse = {
  message: string;
  // results?: ;
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
