import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommunicationsRoutingModule } from './communications-routing.module';
import { TicketsComponent } from './tickets/tickets.component';
import { SerialMailsComponent } from './serial-mails/serial-mails.component';


@NgModule({
  declarations: [TicketsComponent, SerialMailsComponent],
  imports: [
    CommonModule,
    CommunicationsRoutingModule
  ]
})
export class CommunicationsModule { }
