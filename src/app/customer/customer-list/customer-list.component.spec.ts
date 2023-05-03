import {ComponentFixture, TestBed} from '@angular/core/testing';
import {delay} from "rxjs/operators";
import {of} from "rxjs";
import {CustomerListComponent} from './customer-list.component';
import {DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser";
import {CustomerService} from "../../service/customer.service";

describe('CustomerListComponent', () => {
  let component: CustomerListComponent;
  let fixture: ComponentFixture<CustomerListComponent>;
  let customerService: CustomerService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerListComponent],
      providers: [CustomerService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerListComponent);
    component = fixture.componentInstance;
    customerService = fixture.debugElement.injector.get(CustomerService);
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
    TestBed.resetTestingModule();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should check getCustomerList method in OnInit', () => {
    spyOn(customerService, 'getAll').and.callFake(() => {
      return of({}).pipe(delay(1000));
    });
    fixture.detectChanges();
    expect(component.customerList).toBeUndefined();
    component.ngOnInit();
    fixture.detectChanges();
    //expect(component.customerList).toEqual();
  });

  it('should check addCustomer exist button and check click event', () => {
    spyOn(component, 'addCustomer');
    const createPositionButton: DebugElement = fixture.debugElement.query(By.css('#addCustomer'));
    createPositionButton.triggerEventHandler('click', null);
    expect(component.addCustomer).toHaveBeenCalled();
  });


});
