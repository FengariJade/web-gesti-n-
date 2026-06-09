import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard',  loadComponent: () => import('./features/dashboard/dashboard').then(m => m.Dashboard) },
      { path: 'tickets',    loadComponent: () => import('./features/tickets/tickets/tickets').then(m => m.Tickets) },
      { path: 'sites', loadComponent: () => import('./features/sites/sites/sites').then(m => m.Sites) },
      { path: 'team',       loadComponent: () => import('./features/team/team').then(m => m.Team) },
      { path: 'calendar',   loadComponent: () => import('./features/calendar/calendar').then(m => m.Calendar) },
      { path: 'reports',    loadComponent: () => import('./features/reports/reports').then(m => m.Reports) },
      { path: 'devices',    loadComponent: () => import('./features/devices/devices/devices').then(m => m.Devices) },
      { path: 'alerts',     loadComponent: () => import('./features/alerts/alerts/alerts').then(m => m.Alerts) },
      { path: 'patches', loadComponent: () => import('./features/patches/patches/patches').then(m => m.Patches) },
      { path: 'app-center', loadComponent: () => import('./features/app-center/app-center/app-center').then(m => m.AppCenter) },
      { path: 'network-discovery', loadComponent: () => import('./features/network-discovery/network-discovery/network-discovery').then(m => m.NetworkDiscovery) },
      { path: 'knowledge',  loadComponent: () => import('./features/knowledge/knowledge/knowledge').then(m => m.Knowledge) },

      { path: 'referrals', loadComponent: () => import('./features/referrals/referrals/referrals').then(m => m.Referrals) },
      { path: 'ai-center', loadComponent: () => import('./features/ai-center/ai-center/ai-center').then(m => m.AiCenter) },

    ],
  },
  { path: '**', redirectTo: 'dashboard' }
];
