import { Note } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface NotesState {
  notes: Note[];
  total: number;
  loading: boolean;
  page: number;
}

const initialState: NotesState = {
  notes: [],
  total: 0,
  loading: false,
  page: 1,
};

export const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNote: (state, action: PayloadAction<Note>) => {
      const existingIds = new Set(state.notes.map((note) => note.id));
      if (!existingIds.has(action.payload.id)) {
        state.notes.unshift(action.payload);
      }
    },
    removeNote: (state, action: PayloadAction<string>) => {
      state.notes = state.notes.filter((note) => note.id !== action.payload);
      state.total = state.total - 1;
    },
    updateNote: (state, action: PayloadAction<Note>) => {
      const index = state.notes.findIndex(
        (note) => note.id === action.payload.id
      );
      if (index !== -1) {
        state.notes[index] = action.payload;
      }
    },
    setNotes: (
      state,
      action: PayloadAction<{ notes: Note[]; total: number }>
    ) => {
      state.notes = action.payload.notes;
      state.total = action.payload.total;
    },

    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
  },
});

export const {
  addNote,
  removeNote,
  updateNote,
  setNotes,
  setLoading,
  setPage,
} = notesSlice.actions;

export default notesSlice.reducer;
