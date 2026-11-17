import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { CustomerService } from '../services/customer-service';

@Component({
  selector: 'app-customer-template-validation',
  standalone: false,
  templateUrl: './customer-template-validation.html',
  styleUrl: './customer-template-validation.css',
})
export class CustomerTemplateValidation implements OnDestroy {
  private destroy$ = new Subject<void>();

  constructor(public customerService: CustomerService) { }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
