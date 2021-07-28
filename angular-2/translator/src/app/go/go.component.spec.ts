import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoComponent } from './go.component';
import {HttpClient, HttpHandler} from "@angular/common/http";
import {TranslateService} from "../shared/services/translate.service";
import {WordService} from "../shared/services/word.service";

describe('GoComponent', () => {
  let component: GoComponent;
  let fixture: ComponentFixture<GoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoComponent ],
      providers: [WordService, TranslateService, HttpClient, HttpHandler]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
