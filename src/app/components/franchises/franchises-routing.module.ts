import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllFranchisesComponent } from './all-franchises/all-franchises.component';
import { CreateFranchiseComponent } from './create-franchise/create-franchise.component';
import { ManageFranchiseComponent } from './manage-franchise/manage-franchise.component';

const routes: Routes = [
  {
    path: ``, redirectTo: `create-franchise`
  },
  { path: `create-franchise`, component: CreateFranchiseComponent },
  { path: `manage-franchise`, component: ManageFranchiseComponent },
  { path: `all-franchise`, component: AllFranchisesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FranchisesRoutingModule { }
