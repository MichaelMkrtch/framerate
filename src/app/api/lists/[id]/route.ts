import { NextResponse } from "next/server";

type GetApiResponse = {
  message: string;
  // results?: ;
  error?: string;
};

type GetPathParams = {
  params: Promise<{
    id: string;
  }>;
};

// Gets list data by id
export async function GET(
  request: Request,
  { params }: GetPathParams,
): Promise<NextResponse<GetApiResponse>> {
  try {
    const { id } = await params;
    console.log(id);

    return NextResponse.json(
      { message: "Lists fetched successfully" },
      { status: 200 },
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to get lists";
    return NextResponse.json(
      {
        message: "An error occurred while fetching lists!",
        error: errorMessage,
      },
      { status: 500 },
    );
  }
}
