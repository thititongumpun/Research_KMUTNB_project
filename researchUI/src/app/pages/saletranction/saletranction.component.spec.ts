import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaletranctionComponent } from './saletranction.component';

describe('SaletranctionComponent', () => {
  let component: SaletranctionComponent;
  let fixture: ComponentFixture<SaletranctionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaletranctionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaletranctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
