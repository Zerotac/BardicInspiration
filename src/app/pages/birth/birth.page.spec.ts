import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BirthPage } from './birth.page';

describe('BirthPage', () => {
  let component: BirthPage;
  let fixture: ComponentFixture<BirthPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BirthPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
