import { Film } from "src/app/core/models/film.model";

export interface FilmState {
  films: Film[], 
  film: Film
};

export const initialFilmState: FilmState = {
  films: [],
  film: null
};