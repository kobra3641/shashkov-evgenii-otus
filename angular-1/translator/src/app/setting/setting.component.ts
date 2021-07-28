import { Component, OnInit } from '@angular/core';
import {Language} from "../shared/models/language";
import {StorageService} from "../shared/services/storage.service";

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {

  counter = [
    5,
    10,
    20,
    50,
    100
  ];

  selectedLanguage: Language | undefined;
  selectedCounter: number;
  selectedTime: number;

  constructor(
    public storageService: StorageService
  ) {
    this.selectedCounter = 5;
    this.selectedLanguage = this.storageService.getBaseLanguage();
    this.selectedTime = 1;
  }

  ngOnInit(): void {
    this.initSetting();
  }

  initSetting(): void {
    const setting = this.storageService.getSettingStorage();
    if(setting){
      this.selectedLanguage = setting.language;
      this.selectedTime = setting.time;
      this.selectedCounter = setting.counter;
    }
  }

  changeLanguage(eventValue: string): void {
    this.selectedLanguage = this.storageService.languages.find(({value}) => value === eventValue);
  }

  saveSetting(): void {
    this.storageService.setSettingStorage(
      {language: this.selectedLanguage, counter: this.selectedCounter, time: this.selectedTime});
  }

  clearWordStorage() {
    this.storageService.clearWordStorage();
  }
}
