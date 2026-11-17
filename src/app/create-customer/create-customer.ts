import { Component, OnDestroy, OnInit } from '@angular/core';
import { Customer } from '../models/customer';
import { CustomerService } from '../services/customer-service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-create-customer',
  standalone: false,
  templateUrl: './create-customer.html',
  styleUrl: './create-customer.css'
})
export class CreateCustomer implements OnDestroy {
  customer: Customer = new Customer();
  message?: string;

  private destroy$ = new Subject<void>();

  constructor(public customerService: CustomerService) { }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  createCustomer(): void {
    this.customerService.createCustomer(this.customer)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (result: boolean) => {
          if (result) {
            this.message = 'Customer created. Ready to create another...';
            this.customer = new Customer();// clear the fields
          } else {
            this.message = 'Customer is invalid';
          }
        }
      });
  }
}
