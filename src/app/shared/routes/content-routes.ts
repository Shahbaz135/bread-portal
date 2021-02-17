import { Routes } from '@angular/router';

export const content: Routes = [
  {
    path: 'sample',
    loadChildren: () => import('../../components/sample/sample.module').then(m => m.SampleModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('../../components/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'customers',
    loadChildren: () => import('../../components/customers/customers.module').then(m => m.CustomersModule)
  },
  {
    path: 'logistics',
    loadChildren: () => import('../../components/logistics/logistics.module').then(m => m.LogisticsModule)
  },
  {
    path: 'accounting',
    loadChildren: () => import('../../components/accounting/accounting.module').then(m => m.AccountingModule)
  },
  {
    path: 'communications',
    loadChildren: () => import('../../components/communications/communications.module').then(m => m.CommunicationsModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('../../components/settings/settings.module').then(m => m.SettingsModule)
  },
  {
    path: 'tours',
    loadChildren: () => import('../../components/tours/tours.module').then(m => m.ToursModule)
  },
  // {
  //   path: 'tour-panning',
  //   loadChildren: () => import('../../components/tour-planning/tour-planning.module').then(m => m.TourPlanningModule)
  // },
  {
    path: 'franchises',
    loadChildren: () => import('../../components/franchises/franchises.module').then(m => m.FranchisesModule)
  },
];