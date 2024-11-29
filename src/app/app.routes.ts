import { Routes } from '@angular/router';
import { MainComponent } from './core/layout/main/main.component';

export const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('./modules/dashboard/dashboard.component').then((m) => m.DashboardComponent),
      },
      {
        path: 'shipment/:documentNumber',
        loadComponent: () => import('./modules/shipment/shipment.component').then((m) => m.ShipmentComponent),
      },
      {
        path: 'profile',
        loadComponent: () => import('./modules/profile/profile.component').then((m) => m.ProfileComponent),
      },
      {
        path: '404',
        loadComponent: () => import('./layout/errors/error404/error404.component').then((m) => m.Error404Component),
      },
      {
        path: '500',
        loadComponent: () => import('./layout/errors/error500/error500.component').then((m) => m.Error500Component),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  }
];
