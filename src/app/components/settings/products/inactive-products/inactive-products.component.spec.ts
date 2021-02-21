import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InactiveProductsComponent } from './inactive-products.component';

describe('InactiveProductsComponent', () => {
  let component: InactiveProductsComponent;
  let fixture: ComponentFixture<InactiveProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InactiveProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InactiveProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
