import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NonDeliveryDaysComponent } from './non-delivery-days.component';

describe('NonDeliveryDaysComponent', () => {
  let component: NonDeliveryDaysComponent;
  let fixture: ComponentFixture<NonDeliveryDaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NonDeliveryDaysComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NonDeliveryDaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
