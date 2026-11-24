import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Home } from './home/home';
import { Customers } from './customers/customers';
import { PageNotFound } from './page-not-found/page-not-found';
import { CustomerDetail } from './customer-detail/customer-detail';
import { CreateCustomer } from './create-customer/create-customer';
import { CustomerTemplateValidation } from './customer-template-validation/customer-template-validation';
import { CustomerReactiveFormsValidation } from './customer-reactive-forms-validation/customer-reactive-forms-validation';

@NgModule({
  declarations: [
    App,
    Home,
    Customers,
    PageNotFound,
    CustomerDetail,
    CreateCustomer,
    CustomerTemplateValidation,
    CustomerReactiveFormsValidation
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
