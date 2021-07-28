import {WordService} from "./word.service";
import {TestBed} from "@angular/core/testing";
import {HttpClient, HttpHandler} from "@angular/common/http";

describe('WordService', () => {

  let wordService: WordService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        WordService,
        HttpClient,
        HttpHandler
      ]
    });
    wordService = TestBed.inject(WordService)
  });

  it('should be created', () => {
    expect(wordService).toBeTruthy();
  });
})
