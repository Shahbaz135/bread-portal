import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FranchisesRoutingModule } from './franchises-routing.module';
import { ManageFranchiseComponent } from './manage-franchise/manage-franchise.component';
import { CreateFranchiseComponent } from './create-franchise/create-franchise.component';
import { AllFranchisesComponent } from './all-franchises/all-franchises.component';


@NgModule({
  declarations: [ ManageFranchiseComponent, CreateFranchiseComponent, AllFranchisesComponent],
  imports: [
    CommonModule,
    FranchisesRoutingModule
  ]
})
export class FranchisesModule { }
