import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentlyAddedComponent } from './recently-added.component';
import {WordService} from "../shared/services/word.service";
import {TranslateService} from "../shared/services/translate.service";
import {HttpClient, HttpHandler} from "@angular/common/http";

describe('RecentlyAddedComponent', () => {
  let component: RecentlyAddedComponent;
  let fixture: ComponentFixture<RecentlyAddedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecentlyAddedComponent ],
      providers: [WordService, TranslateService, HttpClient, HttpHandler]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentlyAddedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
