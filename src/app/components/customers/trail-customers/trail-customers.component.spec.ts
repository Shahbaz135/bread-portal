import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrailCustomersComponent } from './trail-customers.component';

describe('TrailCustomersComponent', () => {
  let component: TrailCustomersComponent;
  let fixture: ComponentFixture<TrailCustomersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrailCustomersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrailCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
