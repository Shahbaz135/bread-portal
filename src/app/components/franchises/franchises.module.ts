import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FranchisesRoutingModule } from './franchises-routing.module';
import { ManageFranchiseComponent } from './manage-franchise/manage-franchise.component';
import { CreateFranchiseComponent } from './create-franchise/create-franchise.component';
import { AllFranchisesComponent } from './all-franchises/all-franchises.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { EditFranchiseComponent } from './edit-franchise/edit-franchise.component';


@NgModule({
  declarations: [ ManageFranchiseComponent, CreateFranchiseComponent, AllFranchisesComponent, EditFranchiseComponent],
  imports: [
    CommonModule,
    FranchisesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule
  ]
})
export class FranchisesModule { }
