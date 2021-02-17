import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllToursComponent } from './all-tours/all-tours.component';
import { CreateTourComponent } from './create-tour/create-tour.component';
import { TourSortingComponent } from './tour-sorting/tour-sorting.component';
import { ToursOverviewComponent } from './tours-overview/tours-overview.component';

const routes: Routes = [
  {
    path: ``, redirectTo: `all-tours`
  },
  { path: `all-tours`, component: AllToursComponent },
  { path: `tours-overview`, component: ToursOverviewComponent },
  { path: `create-tours`, component: CreateTourComponent },
  { path: `tour-sorting`, component: TourSortingComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ToursRoutingModule { }
