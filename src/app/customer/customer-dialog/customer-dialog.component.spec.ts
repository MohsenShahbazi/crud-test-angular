import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CustomerDialogComponent} from './customer-dialog.component';

describe('CustomerDialogComponent', () => {
  let component: CustomerDialogComponent;
  let fixture: ComponentFixture<CustomerDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerDialogComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('[Caregiver Form] - should check email validity', () => {
    const email = component.customerForm.controls['email'];
    expect(email.valid).toBeFalsy();
    expect(email.errors.required).toBeTruthy();
    email.setValue('123');
    expect(email.errors.email).toBeTruthy();
    email.setValue('example@gmail.com');
    expect(email.errors).toBeNull();
    expect(email.valid).toBeTruthy();
  });
});
