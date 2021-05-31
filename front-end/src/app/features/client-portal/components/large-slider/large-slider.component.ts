import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Film } from '../../../../core/models/film.model';
import { trigger, transition, query, style, animate, group } from '@angular/animations';
import { getImageSrc } from 'src/app/shared/utils/utils';

const left = [
  query('.film__info', style({width: '100%'}), { optional: true }),
  group([
    query(':enter', [style({ transform: 'translateX(-100%)' }), animate('1s ease-out', style({ transform: 'translateX(0%)' }))], {
      optional: true,
    }),
    query(':leave', [style({ transform: 'translateX(0%)' }), animate('1s ease-out', style({ transform: 'translateX(100%)' }))], {
      optional: true,
    }),
  ]),
];

const right = [
  query('.film__info', style({width: '100%'}), { optional: true }),
  group([
    query(':enter', [style({ transform: 'translateX(100%)' }), animate('1s ease-out', style({ transform: 'translateX(0%)' }))], {
      optional: true,
    }),
    query(':leave', [style({ transform: 'translateX(0%)' }), animate('1s ease-out', style({ transform: 'translateX(-100%)' }))], {
      optional: true,
    }),
  ]),
];

@Component({
  selector: 'app-large-slider',
  templateUrl: './large-slider.component.html',
  styleUrls: ['./large-slider.component.scss'],
  animations: [
    trigger('slidesAnimation', [
      transition(':increment', right),
      transition(':decrement', left),
    ])
  ]
})
export class LargeSliderComponent {
  @Input() films: Film[];
  @Output() onShowMore = new EventEmitter();
  currIndex = 0;

  getImageUrl(film: Film) {
    return `url(${getImageSrc(film)})`;
  }

  showPreviousSlide() {
    this.currIndex = (this.currIndex - 1 + this.films.length) % this.films.length;
  }

  showNextSlide() {
    this.currIndex = (this.currIndex + 1 + this.films.length) % this.films.length;
  }

  showMore() {
    this.onShowMore.emit(this.films[this.currIndex]);
  }
}
