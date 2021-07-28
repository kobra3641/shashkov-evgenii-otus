import { Component, OnInit } from '@angular/core';
import {Language} from "../shared/models/language";
import {StorageService} from "../shared/services/storage.service";
import {WordService} from "../shared/services/word.service";
import {Word} from "../shared/models/word";

@Component({
  selector: 'app-recently-added',
  templateUrl: './recently-added.component.html',
  styleUrls: ['./recently-added.component.css']
})
export class RecentlyAddedComponent implements OnInit {

  selectedLanguage: Language | undefined;
  textToTranslate = '';
  textFromTranslate = '';
  words: Word[] = [];

  constructor(
    public storageService: StorageService,
    private wordService: WordService
  ) {
    this.selectedLanguage = this.storageService.getBaseLanguage();
  }

  ngOnInit(): void {
    this.words = this.storageService.getWordStorage();
  }

  changeLanguage(eventValue: string): void {
    this.selectedLanguage = this.storageService.languages.find(({value}) => value === eventValue);
  }

  translateWord(): void {
    if(this.textToTranslate && this.selectedLanguage){
      this.wordService.translateArrayItem(this.textToTranslate, this.selectedLanguage.value);
      const sub = this.wordService.isTextTranslated.subscribe((textFromTranslate) => {
        this.textFromTranslate = textFromTranslate;
        this.words = this.storageService.getWordStorage();
      },
        (error) => {
          console.log(error);
        },
        () => {
          sub.unsubscribe();
        }
      )
    }
  }

  getDisplayLanguage(langPair: string | undefined): string {
    if(langPair)
      return langPair.split('|')[1];
    else
      return '';
  }
}
