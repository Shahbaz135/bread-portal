import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToursOverviewComponent } from './tours-overview.component';

describe('ToursOverviewComponent', () => {
  let component: ToursOverviewComponent;
  let fixture: ComponentFixture<ToursOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToursOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToursOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
