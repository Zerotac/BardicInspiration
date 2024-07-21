import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SubclassPage } from './subclass.page';

describe('SubclassPage', () => {
  let component: SubclassPage;
  let fixture: ComponentFixture<SubclassPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SubclassPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
