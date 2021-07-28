import {Injectable} from "@angular/core";
import {Setting} from "../models/setting";
import {Language} from "../models/language";
import {Word} from "../models/word";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  public languages: Language[] = [
    {value: 'ru|en', displayName: 'Английский'},
    {value: 'ru|de', displayName: 'Немецкий'},
    {value: 'ru|fr', displayName: 'Французкий'},
    {value: 'ru|it', displayName: 'Итальянский'},
    {value: 'ru|es', displayName: 'Испанский'},
  ];
  private localStorage = window.localStorage;
  private settingStorageName = 'setting';
  private wordStorageName = 'word';
  private baseLanguage = {value: 'ru|en', displayName: 'Английский'};

  constructor() {
  }

  setWordStorage(word: Word): void {
    const words = this.getWordStorage();
    const isReady = words.filter((item) => item.from?.toLowerCase() === word.from?.toLowerCase());
    if(!isReady.length){
      words.push(word);
      this.localStorage.setItem(this.wordStorageName, JSON.stringify(words));
    }
  }

  getWordStorage(): Array<Word> {
    const words = JSON.parse(<string>this.localStorage.getItem(this.wordStorageName));
    return words instanceof Array ? words : [];
  }

  clearWordStorage(): void {
    this.localStorage.removeItem(this.wordStorageName);
  }

  setSettingStorage(setting: Setting): void {
    this.localStorage.setItem(this.settingStorageName, JSON.stringify(setting));
  }

  getSettingStorage(): Setting {
    return JSON.parse(<string>this.localStorage.getItem(this.settingStorageName));
  }

  getBaseLanguage(): Language {
    return this.baseLanguage;
  }
}
