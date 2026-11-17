import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './home/home';
import { Customers } from './customers/customers';
import { PageNotFound } from './page-not-found/page-not-found';
import { CustomerDetail } from './customer-detail/customer-detail';
import { CreateCustomer } from './create-customer/create-customer';
import { CustomerTemplateValidation } from './customer-template-validation/customer-template-validation';
import { CustomerReactiveFormsValidation } from './customer-reactive-forms-validation/customer-reactive-forms-validation';

const routes: Routes = [
  { path: 'home', component: Home },
  { path: 'customers', component: Customers },
  { path: 'customer/new', component: CreateCustomer },
  { path: 'customer/template', component: CustomerTemplateValidation },
  { path: 'customer/reactive', component:CustomerReactiveFormsValidation },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'detail/:id', component: CustomerDetail },
  { path: '**', component: PageNotFound }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
