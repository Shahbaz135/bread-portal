import { Routes } from '@angular/router';
import { SearchCustomersComponent } from 'src/app/components/customers/search-customers/search-customers.component';


export const searchBar: Routes = [
  {
    path: 'customers/search-customers',
    pathMatch:  `full`,
    component: SearchCustomersComponent
  },
];