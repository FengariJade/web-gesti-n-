import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface NavItem {
  label: string;
  icon: string;
  path: string;
  badge?: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SidebarComponent {
  collapsed = false;

  mainNav: NavItem[] = [
    { label: 'Dashboard',   icon: 'lucide:layout-dashboard', path: '/dashboard' },
    { label: 'Tickets',     icon: 'lucide:ticket',           path: '/tickets',   badge: '5' },
    { label: 'Ubicaciones',      icon: 'lucide:map-pin',          path: '/sites' },
    { label: 'Dispositivos',icon: 'lucide:monitor',          path: '/devices' },
    { label: 'Alertas',     icon: 'lucide:bell',             path: '/alerts',    badge: '3' },
    { label: 'Gestión de parches', icon: 'lucide:shield-check', path: '/patches' },
    { label: 'Centro de apps', icon: 'lucide:layout-grid', path: '/app-center' },
    { label: 'Network Discovery', icon: 'lucide:radar', path: '/network-discovery' },
    { label: 'Base de Conocimiento',icon: 'lucide:book-open',        path: '/knowledge' },

    { label: 'Recomendar a un amigo', icon: 'lucide:gift', path: '/referrals' },
    { label: 'Centro de IA', icon: 'lucide:sparkles', path: '/ai-center', badge: 'New' },
  ];

  analyticsNav: NavItem[] = [
    { label: 'Mi Equipo',   icon: 'lucide:users',            path: '/team' },
    { label: 'Calendario',  icon: 'lucide:calendar-days',    path: '/calendar' },
    { label: 'Reportes',    icon: 'lucide:bar-chart-3',      path: '/reports' },
  ];

  toggleCollapse() {
    this.collapsed = !this.collapsed;
  }
}