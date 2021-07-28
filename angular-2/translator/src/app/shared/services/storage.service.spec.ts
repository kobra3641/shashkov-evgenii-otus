import { TestBed } from '@angular/core/testing';
import {StorageService} from "./storage.service";
import {Word} from "../models/word";

describe('StorageService', () => {

  let storageService: StorageService;
  let storedData: any;
  const localStorage = window.localStorage;
  const localStorageKey = 'word';
  const testWord: Word[] = [{to: 'мир', from: 'world', langPair: 'ru|en'}];

  beforeEach(() => {
    TestBed.configureTestingModule({providers: [StorageService]});
    storageService = TestBed.inject(StorageService);
    storedData = localStorage.getItem(localStorageKey);
    localStorage.removeItem(localStorageKey)
  });

  afterEach(() => {
    localStorage.removeItem(localStorageKey)
  });

  afterAll(() => {
    localStorage.removeItem(localStorageKey);
    localStorage.setItem(localStorageKey, storedData)
  });

  it('should be created', () => {
    expect(storageService).toBeTruthy();
  });

  it(`should add "${JSON.stringify(testWord[0])}" to localStorage`, () => {
    storageService.setWordStorage(testWord[0]);
    const data = localStorage.getItem(localStorageKey);
    expect(data).toEqual(JSON.stringify(testWord));
  });

  it(`should get "${JSON.stringify(testWord)}" from localStorage`, () => {
    localStorage.setItem(localStorageKey, JSON.stringify(testWord));
    const data = storageService.getWordStorage();
    expect(data).toEqual(testWord);
  });

})
