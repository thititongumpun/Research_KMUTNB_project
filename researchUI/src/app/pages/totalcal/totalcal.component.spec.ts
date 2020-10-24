import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalcalComponent } from './totalcal.component';

describe('TotalcalComponent', () => {
  let component: TotalcalComponent;
  let fixture: ComponentFixture<TotalcalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalcalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalcalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
