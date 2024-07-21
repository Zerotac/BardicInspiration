import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PronounPage } from './pronoun.page';

describe('PronounPage', () => {
  let component: PronounPage;
  let fixture: ComponentFixture<PronounPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PronounPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
