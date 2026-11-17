import { Component, OnInit } from '@angular/core';
import { Customer } from '../models/customer';
import { CustomerService } from '../services/customer-service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-customers',
  standalone: false,
  templateUrl: './customers.html',
  styleUrl: './customers.css'
})
export class Customers implements OnInit {

  customers$?: Observable<Customer[]>;

  constructor(private customerService: CustomerService) { }

  /**
   * Think of this as a page load event
   * Lifecycle event
   */
  ngOnInit(): void {
    this.customers$ = this.customerService.getCustomers();
  }
}
