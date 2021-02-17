import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageFranchiseComponent } from './manage-franchise.component';

describe('ManageFranchiseComponent', () => {
  let component: ManageFranchiseComponent;
  let fixture: ComponentFixture<ManageFranchiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageFranchiseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageFranchiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
