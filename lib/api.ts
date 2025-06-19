
import axios from "axios";
import { Note } from "@/types/note";

const API_KEY = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
if (!API_KEY) throw new Error("API token is not defined");

axios.defaults.baseURL = `https://notehub-public.goit.study/api`;
axios.defaults.headers.common["Authorization"] = `Bearer ${API_KEY}`;

export type NoteTag = Note["tag"];

export type CreateNoteValues = Omit<Note, "id" | "createdAt">;

interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

export async function fetchNotesWithSearch(
  search: string,
  page: number
): Promise<NotesResponse> {
  const params = {
    page,
    perPage: 12,
    ...(search ? { search } : {}),
  };

  const res = await axios.get<NotesResponse>("/notes", { params });
  return res.data;
}

export async function createNote({
  title,
  content,
  tag,
}: CreateNoteValues): Promise<Note> {
  const res = await axios.post<Note>("/notes", {
    title,
    content,
    tag,
  });
  return res.data;
}

export async function deleteNote(id: number): Promise<Note> {
  const res = await axios.delete<Note>(`/notes/${id}`);
  return res.data;
}

export async function getSingleNote(id: string): Promise<Note> {
  const res = await axios.get<Note>(`/notes/${id}`);
  return res.data;
}

export async function fetchAllNotes(): Promise<{
  notes: Note[];
  total: number;
}> {
  const res = await axios.get("/notes");
  return res.data;
}
export async function fetchNoteById(id: number): Promise<Note> {
  const res = await axios.get<Note>(`/notes/${id}`);
  return res.data;
}