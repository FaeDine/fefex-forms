import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { CustomerService } from '../services/customer-service';

@Component({
  selector: 'app-customer-reactive-forms-validation',
  standalone: false,
  templateUrl: './customer-reactive-forms-validation.html',
  styleUrl: './customer-reactive-forms-validation.css',
})
export class CustomerReactiveFormsValidation implements OnDestroy {
  private destroy$ = new Subject<void>();

  constructor(public customerService: CustomerService) { }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
