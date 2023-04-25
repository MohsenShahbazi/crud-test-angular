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
  displayedColumns: string[] = ['firstName', 'lastName', 'birthDate', 'phoneNumber', 'email', 'bankAccountNumber'];


  ngOnInit(): void {
    this.getCustomerList();
  }

  getCustomerList() {
    let customerList = this.customerService.get('dataSource');

    if (customerList != null && customerList != '') {
      this.customerList = JSON.parse(customerList);
      this.dataSource.data = this.customerList;
    } else {
      this.customerList = [];
      this.dataSource.data = this.customerList;
    }
  }

  removeData() {
    this.customerService.delete('dataSource');
    this.customerList = [];
    this.dataSource.data = this.customerList;
  }

  addCustomer() {
    const dialogRef: MatDialogRef<CustomerDialogComponent, boolean> =
      this.dialog.open(CustomerDialogComponent, {
        data: {dataSource: this.customerList}
      });

    dialogRef?.afterClosed()?.subscribe((result) => {
      if (result) {
        this.getCustomerList();
      }
    });
  }


}
