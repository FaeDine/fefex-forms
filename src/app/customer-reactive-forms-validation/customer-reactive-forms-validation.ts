import { Component, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { CustomerService } from '../services/customer-service';
import { AbstractControl, FormControl, FormGroup, ValidationErrors,
  Validators } from '@angular/forms';
import { Customer } from '../models/customer';

@Component({
  selector: 'app-customer-reactive-forms-validation',
  standalone: false,
  templateUrl: './customer-reactive-forms-validation.html',
  styleUrl: './customer-reactive-forms-validation.css',
})
export class CustomerReactiveFormsValidation implements OnDestroy {
  private destroy$ = new Subject<void>();
  message?: string;
  customer: Customer = new Customer();
  submitted: boolean = false;

  customerForm: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.minLength(4)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    address: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    dob: new FormControl('', [Validators.required, this.minAgeValidator(16)]),
    ssn: new FormControl('', [Validators.required, Validators.pattern(/^\d{3}-\d{3}-\d{3}$/)])    
  })

  constructor(public customerService: CustomerService) { }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onFormSubmit(): void {
    this.message = '';
    this.submitted = true;

    if (this.customerForm.invalid) {
      this.message = 'Invalid customer';
      return;
    }

    this.customer = this.customerForm.value;

    this.customerService.createCustomer(this.customer).pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (success: boolean) => {
          this.submitted = false;

          if (success) {
            this.message = 'Customer created!';
            this.customer = new Customer();
            this.customerForm.reset();
          } else {
            this.message = 'Something went wrong...';
          }
        }
      })      
  }

  private minAgeValidator(minAge: number) {
    return (control: AbstractControl): ValidationErrors | null => {
      const birthDate = control.value;
      if (!birthDate) return null;

      const today = new Date();
      const dob = new Date(birthDate);
      let age = today.getFullYear() - dob.getFullYear();
      const monthDiff = today.getMonth() - dob.getMonth();

      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
        age--;
      }

      return age >= minAge ? null : { minAge: { requiredAge: minAge, actualAge: age } };
    }
  }


}

