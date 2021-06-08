import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent {
  formsNames = ['Кинотеатры', 'Фильмы', 'Сеансы', 'Дополнительные услуги'];
  chosenForm = this.formsNames[0];

  constructor() { }

  showForm(chosenForm) {
    this.chosenForm = chosenForm;
  }
}
