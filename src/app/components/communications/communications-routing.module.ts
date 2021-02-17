import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SerialMailsComponent } from './serial-mails/serial-mails.component';
import { TicketsComponent } from './tickets/tickets.component';

const routes: Routes = [
  {
    path: ``, redirectTo: `tickets`
  },
  { path: `tickets`, component: TicketsComponent },
  { path: `serial-mails`, component: SerialMailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommunicationsRoutingModule { }
