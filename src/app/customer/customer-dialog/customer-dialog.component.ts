import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {phoneValidator} from "../../tools/phoneValidator";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CustomerService} from "../../service/customer.service";
import {Customer} from "../../model/customer";
import {messageService} from "../../tools/messagService";

@Component({
  selector: 'app-customer-dialog',
  templateUrl: './customer-dialog.component.html',
  styleUrls: ['./customer-dialog.component.css']
})
export class CustomerDialogComponent implements OnInit {
  customerForm!: FormGroup;
  dataSource!: Customer[];

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
    this.dataSource = this.data?.dataSource;
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

    if (this.dataSource.filter(f => f.firstName.trim().toLowerCase() == form.value.firstname &&
      f.lastName.trim().toLowerCase() == form.value.lastName && f.birthDate == form.value.birthDate).length > 0) {

      this.messageService.openSnackBar("Some data is duplicate", "Error");

    } else {
      this.dataSource.push(form.value);
      this.customerForm.reset();

      this.messageService.openSnackBar("All information is saved", "Success");
      this.closeDialog();

    }

    this.customerService.add(JSON.stringify(this.dataSource));

  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
