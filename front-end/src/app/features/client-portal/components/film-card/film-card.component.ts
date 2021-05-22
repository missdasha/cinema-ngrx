import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Film } from '../../models/film.model';
import { getImageSrc } from '../../../../shared/utils/utils';
@Component({
  selector: 'app-film-card',
  templateUrl: './film-card.component.html',
  styleUrls: ['./film-card.component.scss']
})
export class FilmCardComponent implements OnInit {
  @Input() film: Film;
  @Input() areSeancesVisible: boolean;
  @Output() onChooseSeance = new EventEmitter();
  @Output() onShowMore = new EventEmitter<Film>();
  maxSeancesNumber = 3;
  imageSrc: string;

  ngOnInit() {
    this.imageSrc = getImageSrc(this.film);
  }

  chooseSeance(seanceId: string) {
    this.onChooseSeance.emit({ filmId: this.film._id, seanceId });
  }

  showMore() {
    this.onShowMore.emit(this.film);
  }
}
