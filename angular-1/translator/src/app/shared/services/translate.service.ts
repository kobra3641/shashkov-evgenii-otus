import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {map, retry, switchMap} from "rxjs/operators";
import {TranslateRequest} from "../models/translate.request";
import {TranslateResponse} from "../models/translate.response";

@Injectable({
  providedIn: 'root'
})
export class TranslateService {

  constructor(
    private http: HttpClient
  ) {}

  translateItem(translateRequest: TranslateRequest): Observable<TranslateResponse>{
    console.log('translateRequest', translateRequest);
    return of(translateRequest.text)
      .pipe(
        switchMap((item) => this.http.get(
          `https://api.mymemory.translated.net/get?q=${item}&langpair=${translateRequest.langPair}`,
        )),
        retry(3),
        map((item) => {
            Object.assign(item, {
              text: translateRequest.text,
              langPair: translateRequest.langPair
            });
            return Object.assign(new TranslateResponse(),item);
        })
      );
  }

}
