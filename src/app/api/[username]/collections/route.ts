import type { List } from "@/types/data.types";

import { NextResponse } from "next/server";

import { listSchema } from "@/features/collections/schema/list";
import { createList, getLists } from "@/features/collections/server/db/list";
import { generateSlug } from "@/lib/slug";
import { verifyUser } from "@/lib/verifyUser";

type GetApiResponse = {
  message: string;
  results?: List[];
  error?: string;
};

// Get all lists
export async function GET(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  request: Request,
): Promise<NextResponse<GetApiResponse>> {
  try {
    const user = await verifyUser();

    if (user?.id) {
      const results = await getLists(user.id);

      return NextResponse.json(
        { message: "Lists fetched successfully", results },
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

type PostApiResponse = {
  message: string;
  results?: List;
  error?: string;
};

// Create list
export async function POST(
  request: Request,
): Promise<NextResponse<PostApiResponse>> {
  try {
    const body = await request.json();
    const user = await verifyUser();

    const parsed = listSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { message: "Please use a valid list name." },
        { status: 400 },
      );
    }

    const { listName } = parsed.data;

    if (user?.id) {
      const slug = await generateSlug(listName, "list", user.id);

      const results = await createList({
        userId: user.id,
        name: listName,
        slug,
      });

      return NextResponse.json(
        { message: "List created successfully", results },
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
      error instanceof Error ? error.message : "Failed to create list";
    return NextResponse.json(
      {
        message: "An error occurred while creating list!",
        error: errorMessage,
      },
      { status: 500 },
    );
  }
}
