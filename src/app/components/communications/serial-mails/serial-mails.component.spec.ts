import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SerialMailsComponent } from './serial-mails.component';

describe('SerialMailsComponent', () => {
  let component: SerialMailsComponent;
  let fixture: ComponentFixture<SerialMailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SerialMailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SerialMailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
