import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevlieryAreasOverviewComponent } from './devliery-areas-overview.component';

describe('DevlieryAreasOverviewComponent', () => {
  let component: DevlieryAreasOverviewComponent;
  let fixture: ComponentFixture<DevlieryAreasOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevlieryAreasOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DevlieryAreasOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
