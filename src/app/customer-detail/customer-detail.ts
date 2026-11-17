import { Component, OnInit } from '@angular/core';
import { Customer } from '../models/customer';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '../services/customer-service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-customer-detail',
  standalone: false,
  templateUrl: './customer-detail.html',
  styleUrl: './customer-detail.css'
})
export class CustomerDetail implements OnInit {
  customer$?: Observable<Customer | undefined>;
  message?: string;

  constructor(private route: ActivatedRoute, private customerService: CustomerService) { }

  ngOnInit(): void {
    this.message = '';
    const idParam: string | null = this.route.snapshot.paramMap.get('id');

    if (!!idParam) {
      const id: number = parseInt(idParam);

      if (isNaN(id)) {
        this.message = `The id provided ${idParam} is not a valid number`;
        return;
      }

      this.customer$ = this.customerService.getCustomer(id);
    }
  }
}
