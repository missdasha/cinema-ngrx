import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FilmCardComponent } from "./film-card.component"
import * as films from '../../../../assets/static/films.json';
import * as seances from '../../../../assets/static/seances.json';
import { Film } from "../../models/film.model";
import { environment } from "src/environments/environment";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { MomentPipe } from "src/app/shared/pipes/moment.pipe";
import * as moment from "moment";

describe('FilmCardComponent', () => {
  let filmCardComponent: FilmCardComponent;
  let fixture: ComponentFixture<FilmCardComponent>;
  let film: Film;
  let filmCard: HTMLElement;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ FilmCardComponent, MomentPipe ],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(FilmCardComponent);
    filmCardComponent = fixture.componentInstance;
    film = { ...(<any>films).default[0] };
    filmCardComponent.film = film;
    fixture.detectChanges();
    filmCard = fixture.nativeElement;
  });

  it('should display film title', () => {
    const titleElement = filmCard.querySelector('.film-card__title');
    expect(titleElement.textContent).toBe(film.title);
  });

  it('should display film genres', () => {
    const genresElement = filmCard.querySelector('.film-card__genre');
    expect(genresElement.textContent).toBe(film.genres.join(', '));
  });

  it('should display film age', () => {
    const ageElement = filmCard.querySelector('.film-card__age');
    expect(ageElement.textContent).toBe(`${film.age}+`);
  });

  it('should display image', () => {
    const imageElement = filmCard.querySelector('.film-card__image');
    expect(imageElement.getAttribute('src')).toBe(`${environment.imageUrl}${film.imageSrc}`);
  });
  
  it('raises the onShowMore event when button is clicked', () => {
    filmCardComponent.onShowMore.subscribe((emittedValue: Film) => {
      expect(emittedValue).toBe(film);
    })
    filmCardComponent.showMore();
  });

  it('raises the onChooseSeance event when seance is clicked', () => {
    filmCardComponent.onChooseSeance.subscribe((emittedValue: { filmId: string, seanceId: string }) => {
      expect(emittedValue).toEqual({ filmId: film._id, seanceId: seances[0]._id });
    });
    filmCardComponent.chooseSeance(seances[0]._id);
  });

  it('should display seances if @Input areSeancesVisible is true', () => {
    filmCardComponent.areSeancesVisible = true;
    film.seances = (<any>seances).default;
    fixture.detectChanges();
    expect(filmCard.querySelector('.film-card__seances')).toBeTruthy();
  });

  it('should not display seances if @Input areSeancesVisible is false', () => {
    filmCardComponent.areSeancesVisible = false;
    fixture.detectChanges();
    expect(filmCard.querySelector('.film-card__seances')).toBeFalsy();
  });

  it('should display all seances if seances.length <= 3', () => {
    filmCardComponent.areSeancesVisible = true;
    film.seances = (<any>seances).default.slice(0, 3);
    fixture.detectChanges();
    const seancesTags = filmCard.querySelectorAll('.seance');
    seancesTags.forEach((seance, ind) => {
      expect(seance.textContent).toBe(moment.unix(film.seances[ind].startTime).format('HH:mm'));
    })
    expect(seancesTags.length).toBe(film.seances.length);
  });

  it('should display "more" button if seances.length > 3', () => {
    filmCardComponent.areSeancesVisible = true;
    film.seances = (<any>seances).default;
    fixture.detectChanges();
    const seancesTags = filmCard.querySelectorAll('.seance');
    expect(seancesTags[2].textContent).toBe('Ещё');
    expect(seancesTags.length).toBe(3);
  });
});