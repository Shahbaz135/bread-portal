import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenItemListComponent } from './open-item-list.component';

describe('OpenItemListComponent', () => {
  let component: OpenItemListComponent;
  let fixture: ComponentFixture<OpenItemListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenItemListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
