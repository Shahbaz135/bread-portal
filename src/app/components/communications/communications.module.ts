import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommunicationsRoutingModule } from './communications-routing.module';
import { TicketsComponent } from './tickets/tickets.component';
import { SerialMailsComponent } from './serial-mails/serial-mails.component';
import { NgbModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [TicketsComponent, SerialMailsComponent],
  imports: [
    CommonModule,
    CommunicationsRoutingModule,
    NgbNavModule,
    NgbModule
  ]
})
export class CommunicationsModule { }
