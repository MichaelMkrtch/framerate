import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { trackUniqueView } from "@/features/collections/server/db/list-views";
import { verifyUser } from "@/lib/verifyUser";

type PostApiResponse = {
  message: string;
  error?: string;
};

export async function POST(
  request: Request,
): Promise<NextResponse<PostApiResponse>> {
  try {
    const { listId }: { listId: number } = await request.json();
    const user = await verifyUser();

    const headersList = await headers();
    const ipAddress =
      headersList.get("x-forwarded-for")?.split(",")[0] ||
      headersList.get("x-real-ip");

    if (!listId || (!user?.id && !ipAddress)) {
      return NextResponse.json({
        message: "Error: invalid request to view counter.",
        status: 400,
      });
    }

    await trackUniqueView(listId, ipAddress, user?.id);

    return NextResponse.json(
      { message: "Tracked view successfully" },
      { status: 201 },
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to update views.";

    return NextResponse.json(
      {
        message: "An error occurred while updating views!",
        error: errorMessage,
      },
      { status: 500 },
    );
  }
}
