import { Film } from "src/app/core/models/film.model";

export interface FilmState {
  films: Film[], 
};

export const initialFilmState: FilmState = {
  films: [],
};