import {TestBed} from "@angular/core/testing";
import {TranslateService} from "./translate.service";
import {StorageService} from "./storage.service";
import {HttpClient, HttpHandler} from "@angular/common/http";
import {TranslateRequest} from "../models/translate.request";

describe('TranslateService', () => {

  let translateService: TranslateService;

  const textToTranslate = 'мир';
  const expectedData = {text: 'мир', responseData: {translatedText: 'World'}, langPair: 'ru|en'};

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TranslateService, StorageService, HttpClient, HttpHandler]
    });
    translateService = TestBed.inject(TranslateService);
  });

  it('should be created', () => {
    expect(translateService).toBeTruthy();
  });

  it(`should http post to translate "${textToTranslate}" and return "${JSON.stringify(expectedData)}"`, () => {
    translateService.translateItem(new TranslateRequest(textToTranslate, 'ru|en'))
      .subscribe((data) => {
      expect(data).toEqual(expectedData);
    });
  });

})
