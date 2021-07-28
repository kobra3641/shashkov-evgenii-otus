import {Injectable} from "@angular/core";
import {TranslateService} from "./translate.service";
import {BehaviorSubject, from} from "rxjs";
import {concatMap, filter, map} from "rxjs/operators";
import {TranslateRequest} from "../models/translate.request";
import {StorageService} from "./storage.service";
import {Word} from "../models/word";

@Injectable({
  providedIn: 'root'
})
export class WordService {

  public isTextTranslated: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public gameTimerSubject: BehaviorSubject<any> = new BehaviorSubject<any>({min: 0, sec: 0});
  private intervalId: any;

  constructor(
    private translateService: TranslateService,
    private storageService: StorageService
  ) {}

  splitAllSymbols(text: string): string[] {
    return text.split(/[ .:;?!~,`"&|()<>{}\[\]\r\n/\\]+/);
  }

  translateArrayItem(text: string, languagePair: string): void {
    let translate: string = '';
    const sub = from(this.splitAllSymbols(text))
        .pipe(
          map(item => item.trim()),
          filter(item => item.length > 0),
          concatMap(item => this.translateService.translateItem(new TranslateRequest(item, languagePair))),
        ).subscribe((translateResponse) => {
          console.log('translateResponse', translateResponse);
          if(translateResponse.responseData) {
            const currentTranslate = this.splitAllSymbols(translateResponse.responseData?.translatedText)[0];
            translate += ' ' + currentTranslate;
            this.storageService.setWordStorage(
              new Word(translateResponse.langPair, translateResponse.text, currentTranslate))
          }
          console.log('translate', translate);
       }, (error) => {
          console.log(error);
       }, () => {
          this.isTextTranslated.next(translate);
          sub.unsubscribe();
       });
    }

    startGameTimer(time: any){
      this.intervalId = setInterval(() => {
        if (time.sec - 1 == -1) {
          time.min -= 1;
          time.sec = 59
          this.gameTimerSubject.next(time);
        }
        else {
          time.sec -= 1
          this.gameTimerSubject.next(time);
        }
        if (time.min === 0 && time.sec == 0) {
          this.gameTimerSubject.next(time);
          clearInterval(this.intervalId)
        }
      }, 1000)
    }

    stopGameTimer() {
        clearInterval(this.intervalId);
        this.gameTimerSubject.next({min: 0, sec: 0});
    }
}
