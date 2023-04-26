import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {phoneValidator} from "../../tools/phoneValidator";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CustomerService} from "../../service/customer.service";
import {Customer} from "../../model/customer";
import {messageService} from "../../tools/messagService";
import * as _ from 'lodash';
import * as moment from "moment";

@Component({
  selector: 'app-customer-dialog',
  templateUrl: './customer-dialog.component.html',
  styleUrls: ['./customer-dialog.component.css']
})
export class CustomerDialogComponent implements OnInit {
  customerForm!: FormGroup;
  customers: Customer[] = [];

  get email() {
    return this.customerForm.get('email');
  }

  get phoneNumber() {
    return this.customerForm.get('phoneNumber');
  }

  get bankAccountNumber() {
    return this.customerForm.get('bankAccountNumber');
  }

  get relatedForm() {
    return this.customerForm;
  }

  constructor(
    public dialogRef: MatDialogRef<CustomerDialogComponent>,
    private messageService: messageService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private customerService: CustomerService
  ) {
  }

  ngOnInit(): void {
    this.createCustomerForm();
    let customerList = this.customerService.getAll();
    if (customerList != null && customerList != '')
      this.customers = JSON.parse(customerList);
  }


  createCustomerForm(): void {
    this.customerForm = new FormGroup({
      firstName: new FormControl('', [
        Validators.required,
      ]),
      lastName: new FormControl(''),
      birthDate: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [
        Validators.required,
        phoneValidator,
        Validators.maxLength(13),
        Validators.minLength(13)
      ]),
      email: new FormControl('', [Validators.email,
        Validators.required
      ]),
      bankAccountNumber: new FormControl('', [
        Validators.required,
        Validators.minLength(9),
        Validators.maxLength(10)]),
    });
  }

  onSubmit(form: FormGroup) {
    // we can use .filter with js pure and also use lodash

    let duplicate = _.find(this.customers, function (item: any) {
      return item.firstName.trim().toLowerCase() == form.value.firstName.toLowerCase() &&
        item.lastName.trim().toLowerCase() == form.value.lastName.toLowerCase() &&
        moment(form.value.birthDate).format("YYYY-MM-DD").toString() === moment(item.birthDate).format("YYYY-MM-DD").toString() && item.email == form.value.email.toString();

    })

    if (duplicate) {
      this.messageService.openSnackBar("Some data is duplicate", "Error");
      return
    }
    this.customerService.add(form.value);
    this.messageService.openSnackBar("All information is saved", "Success");
    this.customerForm.reset();
    this.closeDialog();

  }

  closeDialog(): void {
    this.dialogRef.close(true);
  }
}
