import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  navLinks = [
    { path: 'recently_added', label: 'Добавить слово'},
    { path: 'go', label: 'Тренировка'},
    { path: 'settings', label: 'Настройки'}
  ];
  title = 'translator';
}
