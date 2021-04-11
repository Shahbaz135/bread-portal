import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchiveCustomersComponent } from './archive-customers.component';

describe('ArchiveCustomersComponent', () => {
  let component: ArchiveCustomersComponent;
  let fixture: ComponentFixture<ArchiveCustomersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchiveCustomersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchiveCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
