import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerListComponent } from './customer-list.component';
import {DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser";

describe('CustomerListComponent', () => {
  let component: CustomerListComponent;
  let fixture: ComponentFixture<CustomerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
    TestBed.resetTestingModule();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check addCustomer exist button and check click event', () => {
    spyOn(component, 'addCustomer');
    const createPositionButton: DebugElement = fixture.debugElement.query(By.css('#addCustomer'));
    createPositionButton.triggerEventHandler('click', null);
    expect(component.addCustomer).toHaveBeenCalled();
  });



});
