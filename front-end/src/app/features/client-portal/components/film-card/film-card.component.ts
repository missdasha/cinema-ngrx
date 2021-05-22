import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Film } from '../../models/film.model';

@Component({
  selector: 'app-film-card',
  templateUrl: './film-card.component.html',
  styleUrls: ['./film-card.component.scss']
})
export class FilmCardComponent {
  @Input() film: Film;
  @Input() areSeancesVisible: boolean;
  @Output() onChooseSeance = new EventEmitter();
  @Output() onShowMore = new EventEmitter();
  maxSeancesNumber = 3;

  chooseSeance(seanceId: string) {
    this.onChooseSeance.emit({ filmId: this.film._id, seanceId });
  }

  showMore() {
    this.onShowMore.emit(this.film);
  }
}
