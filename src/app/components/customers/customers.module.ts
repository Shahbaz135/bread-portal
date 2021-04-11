import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomersRoutingModule } from './customers-routing.module';
import { CustomersComponent } from './customers/customers.component';
import { TrailCustomersComponent } from './trail-customers/trail-customers.component';
import { WebCustomersComponent } from './web-customers/web-customers.component';
import { CreateCustomersComponent } from './create-customers/create-customers.component';
import { NgbModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchCustomersComponent } from './search-customers/search-customers.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ArchiveCustomersComponent } from './archive-customers/archive-customers.component';

@NgModule({
  declarations: [CustomersComponent, TrailCustomersComponent, WebCustomersComponent, CreateCustomersComponent, SearchCustomersComponent, ArchiveCustomersComponent],
  imports: [
    CommonModule,
    CustomersRoutingModule,
    NgbNavModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule
  ]
})
export class CustomersModule { }
