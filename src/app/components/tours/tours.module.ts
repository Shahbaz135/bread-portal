import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToursRoutingModule } from './tours-routing.module';
import { AllToursComponent } from './all-tours/all-tours.component';
import { ToursOverviewComponent } from './tours-overview/tours-overview.component';
import { CreateTourComponent } from './create-tour/create-tour.component';
import { TourSortingComponent } from './tour-sorting/tour-sorting.component';
import { NgbModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { EditTourComponent } from './edit-tour/edit-tour.component';


@NgModule({
  declarations: [AllToursComponent, ToursOverviewComponent, CreateTourComponent, TourSortingComponent, EditTourComponent],
  imports: [
    CommonModule,
    ToursRoutingModule,
    NgbNavModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule
  ]
})
export class ToursModule { }
