import { Injectable } from '@angular/core';
import { Customer } from '../models/customer';
import { CUSTOMERS } from '../mocks/customers-data';
import { delay, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private customers: Customer[] = CUSTOMERS;

  //Validation and busines rule errors
  public errors: string[] = [];

  private readonly MIN_AGE: number = 16;

  getCustomers(): Observable<Customer[]> {
    // Build an artificial pause to simulate a web server call that
    // would take 250 milliseconds
    return of(this.customers).pipe(delay(250));
  }

  getCustomer(id: number): Observable<Customer | undefined> {
    const queryCustomer: Customer | undefined = CUSTOMERS.find(c => c.id === id);
    return of(queryCustomer).pipe(delay(2500));
  }

  /**
   * Create a customer if valid
   * @param customer The customer to create
   * @returns result of customer creation
   */
  createCustomer(customer: Customer): Observable<boolean> {
    if (this.validateCustomer(customer)) {
      // we need to create a psuedo ai pk
      customer.id = Math.max(...this.customers.map(c => c.id || 0)) + 1;
      this.customers.push(customer);
      return of(true);
    }

    return of(false);
  }

  private validateCustomer(customer: Customer): boolean {
    this.errors = [];

    if (!customer.firstName || !customer.firstName.trim()) {
      this.errors.push('First name is required');
    }

    if (!customer.lastName || !customer.lastName.trim()) {
      this.errors.push('Last name is required');
    }

    if (!customer.phone || !customer.phone.trim()) {
      this.errors.push('Phone number is required');
    }

    if (!customer.address || !customer.address.trim()) {
      this.errors.push('Address is required');
    }

    if (!this.isAgeValid(customer)) {
      this.errors.push(`Customer must be ${this.MIN_AGE} years of age or greater`);
    }

    if (!customer.ssn) {
      this.errors.push(`Customer ssn is required`);
    } else {
      if (!this.isValidSSN(customer.ssn)) {
        this.errors.push(`Customer ssn is invalid`);
      }
    }

    return this.errors.length === 0;
  }

  private isAgeValid(customer: Customer): boolean {
    // Write the code to validate the user age is greater or equal to the MIN_AGE
    // return true or false based on this check
    const today: Date = new Date();
    const dob: Date = !!customer.dob ? new Date(customer.dob) : today;

    let age = today.getFullYear() - dob.getFullYear();

    const monthDiff = today.getMonth() - dob.getMonth();
    const dayDiff = today.getDate() - dob.getDate();

    // Adjust the age in case the birth month or birth day have not yet arrived in the current year
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }

    return age >= this.MIN_AGE;
  }

  private isValidSSN(ssn?: string): boolean {
    const ssnReg = /^\d{3}-\d{3}-\d{3}$/;

    if (!!ssn)
      return ssnReg.test(ssn)
    
    return true;
  }
}
