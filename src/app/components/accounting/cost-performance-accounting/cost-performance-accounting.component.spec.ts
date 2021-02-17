import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostPerformanceAccountingComponent } from './cost-performance-accounting.component';

describe('CostPerformanceAccountingComponent', () => {
  let component: CostPerformanceAccountingComponent;
  let fixture: ComponentFixture<CostPerformanceAccountingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CostPerformanceAccountingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CostPerformanceAccountingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
