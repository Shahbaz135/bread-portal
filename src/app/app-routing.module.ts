import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './layouts/auth/auth.component';
import { ContentComponent } from './layouts/content/content.component';
import { SearchComponent } from './layouts/search/search.component';
import { auth } from './shared/routes/auth-routes';
import { content } from "./shared/routes/content-routes";
import { searchBar } from './shared/routes/search-routes';
import { AuthGuard } from './shared/services/common/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full'
  },
  {
    path: '',
    canActivate: [AuthGuard],
    component: SearchComponent,
    children: searchBar
  },
  {
    path: '',
    canActivate: [AuthGuard],
    component: ContentComponent,
    children: content
  },
  {
    path: "",
    component: AuthComponent,
    children: auth,
  },
  {
    path: "**",
    redirectTo: "/dashboard",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
