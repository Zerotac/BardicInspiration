import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TropesPage } from './tropes.page';

describe('TropesPage', () => {
  let component: TropesPage;
  let fixture: ComponentFixture<TropesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TropesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
