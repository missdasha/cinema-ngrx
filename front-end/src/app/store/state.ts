import { cinemaState } from "./cinema";
import { filmState } from "./film";

export interface State {
  films: filmState.FilmState;
  cinemas: cinemaState.CinemaState
}