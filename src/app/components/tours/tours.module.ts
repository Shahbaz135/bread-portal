import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToursRoutingModule } from './tours-routing.module';
import { AllToursComponent } from './all-tours/all-tours.component';
import { ToursOverviewComponent } from './tours-overview/tours-overview.component';
import { CreateTourComponent } from './create-tour/create-tour.component';
import { TourSortingComponent } from './tour-sorting/tour-sorting.component';


@NgModule({
  declarations: [AllToursComponent, ToursOverviewComponent, CreateTourComponent, TourSortingComponent],
  imports: [
    CommonModule,
    ToursRoutingModule
  ]
})
export class ToursModule { }
