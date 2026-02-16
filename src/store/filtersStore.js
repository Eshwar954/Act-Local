import { create } from "zustand";

export const useFilters = create((set) => ({
  q: "", cause: "", city: "", time: "",
  setField: (k, v) => set({ [k]: v }),
  reset: () => set({ q:"", cause:"", city:"", time:"" })
}));
