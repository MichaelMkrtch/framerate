"use client";

import { useParams } from "next/navigation";

export default function FilmDetailsPage() {
  const params = useParams<{ filmSlug: string }>();

  return <h2>{params.filmSlug}</h2>;
}
