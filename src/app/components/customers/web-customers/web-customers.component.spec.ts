import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebCustomersComponent } from './web-customers.component';

describe('WebCustomersComponent', () => {
  let component: WebCustomersComponent;
  let fixture: ComponentFixture<WebCustomersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebCustomersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
