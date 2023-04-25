import {Component, OnInit} from '@angular/core';
import {Customer} from "../../model/customer";
import {MatTableDataSource} from '@angular/material/table';
import {CustomerService} from "../../service/customer.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {CustomerDialogComponent} from "../customer-dialog/customer-dialog.component";

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  customerList!: Customer[];

  constructor(private customerService: CustomerService, public dialog: MatDialog) {
  }

  dataSource = new MatTableDataSource<Customer>();
  displayedColumns: string[] = ['Firstname', 'Lastname', 'DateOfBirth', 'PhoneNumber', 'Email', 'BankAccountNumber'];


  ngOnInit(): void {
    this.getCustomerList();
  }

  getCustomerList() {
    let dataSource = this.customerService.get('dataSource');

    if (dataSource != null && dataSource != '') {
      this.customerList = JSON.parse(dataSource);
      this.dataSource.data = this.customerList;
    }
  }

  removeData() {
    localStorage.setItem('dataSource', '');
    this.customerList = [];
    this.dataSource.data = this.customerList;
  }

  addCustomer() {
    const dialogRef: MatDialogRef<CustomerDialogComponent, boolean> = this.dialog.open(CustomerDialogComponent, {
      data: {},
      width: '400px'
    });

    dialogRef?.afterClosed()?.subscribe((result) => {
      if (result) {
        this.getCustomerList();
      }
    });
  }


}
