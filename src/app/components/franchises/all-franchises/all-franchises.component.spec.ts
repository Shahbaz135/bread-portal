import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllFranchisesComponent } from './all-franchises.component';

describe('AllFranchisesComponent', () => {
  let component: AllFranchisesComponent;
  let fixture: ComponentFixture<AllFranchisesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllFranchisesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllFranchisesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
