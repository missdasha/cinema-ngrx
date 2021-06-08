import { Film } from "src/app/core/models/film.model";

export interface FilmState {
  films: Film[],
  successMessage: string,
  error: any
};

export const initialFilmState: FilmState = {
  films: [],
  successMessage: '', 
  error: null
};