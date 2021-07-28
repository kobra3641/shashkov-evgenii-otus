import {Component, OnInit} from '@angular/core';
import {StorageService} from "../shared/services/storage.service";
import {Setting} from "../shared/models/setting";
import {WordService} from "../shared/services/word.service";
import {Word} from "../shared/models/word";
import {Statistic} from "../shared/models/statistic";

@Component({
  selector: 'app-go',
  templateUrl: './go.component.html',
  styleUrls: ['./go.component.css']
})
export class GoComponent implements OnInit {

  setting: Setting | undefined;
  words: Word[] = [];
  word: Word | undefined;
  min: number = 0;
  sec: number = 0;
  maxWordCounter: number = 0;
  totalBall: number = 0;
  currentWordCounter: number = 0;
  buttonText: string = 'Начать';
  startButton: boolean = true;
  translateText: string = '';
  textToTranslate: string = '';
  statistics: Statistic[] = [];
  isStaticLoaded: boolean = false;
  displayedColumns: string[] = ['example', 'realTranslate', 'currentTranslate', 'ball'];

  constructor(
    public storageService: StorageService,
    public wordService: WordService
  ) {}

  ngOnInit(): void {
    this.setting = this.storageService.getSettingStorage();
    this.words = this.storageService.getWordStorage().filter((item) =>
      item.langPair === this.setting?.language?.value
    );
    this.min = this.setting.time;
    this.maxWordCounter = this.setting.counter;
  }

  initGameElements(): void {
    this.statistics = [];
    this.startButton = false;
    this.isStaticLoaded = false;
    this.currentWordCounter++;
    this.buttonText = 'Принять: ' + this.currentWordCounter + ' из ' + this.maxWordCounter;
    this.generateWord();
  }

  generateWord(): void {
    this.word = this.words[this.getRandomIndex()]
    if(this.word?.to)
      this.textToTranslate = this.word.to;
  }

  startGame(): void {
    this.wordService.startGameTimer({min: this.min, sec: 0});
    const sub = this.wordService.gameTimerSubject.subscribe((time) => {
      this.min = time.min;
      this.sec = time.sec;
      if(time.min === 0 && time.sec === 1){
        this.stopGame();
        sub.unsubscribe();
      }
    });
    this.initGameElements();
  }

  stopGame(): void {
    this.wordService.stopGameTimer();
    this.totalBall = this.statistics
      .map((item) => item.ball)
      .reduce((prev, next) => prev + next, 0)
    this.isStaticLoaded = true;
    this.textToTranslate = '';
    this.startButton = true;
    this.buttonText = 'Начать';
    this.currentWordCounter = 0;
    if(this.setting)
      this.min = this.setting.time;

  }

  checkWordToTranslate() {
    this.currentWordCounter++;
    this.buttonText = 'Принять: ' + this.currentWordCounter + ' из ' + this.maxWordCounter;
    if(this.translateText){
      if(this.word?.from?.toLowerCase() === this.translateText.toLowerCase()){
        this.addStatistic(1);
      }
      else {
        this.addStatistic(0);
      }
    }
    else {
      this.addStatistic(0);
    }
    this.generateWord();
    if(this.currentWordCounter > this.maxWordCounter){
      this.stopGame();
    }
  }

  addStatistic(ball: number) {
    if(this.word?.to && this.word?.from)
      this.statistics.push(new Statistic(this.word.to, this.word.from, this.translateText, ball))
  }

  getRandomIndex(): number {
    return Math.floor(Math.random() * this.words.length);
  }

}
