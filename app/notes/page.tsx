import { fetchNotes } from "@/lib/api";
import Notes from "./Notes.client";

export default async function NotesPage() {
  const page = 1;
  const perPage = 10;

  const { notes, totalPages } = await fetchNotes({ page, perPage });

  return (
    <Notes
      initialNotes={notes}
      initialTotalPages={totalPages}
      initialPage={page}
      perPage={perPage}
    />
  );
}

// import Notes from "./Notes.client";

// export default function NotesPage() {
//   return <Notes />;
// }