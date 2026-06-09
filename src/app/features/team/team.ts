import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Technician {
  id: number;
  name: string;
  initials: string;
  role: string;
  email: string;
  site: string;
  status: 'Disponible' | 'En ticket' | 'Fuera';
  workload: number;
  openTickets: number;
  resolvedToday: number;
  responseTime: string;
  color: string;
}

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './team.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Team {
  activeTab: 'technicians' | 'roles' | 'groups' = 'technicians';
  searchQuery = '';
  selectedStatus = 'todos';
  selectedRole = 'todos';
  selectedTech: Technician | null = null;
  showTechModal = false;
  showPermissionPanel = false;

  techForm = {
    name: '',
    email: '',
    role: 'Helpdesk',
    site: 'Lima HQ',
    status: 'Disponible' as Technician['status'],
    workload: 25,
    responseTime: '15m',
  };

  statuses = ['todos', 'Disponible', 'En ticket', 'Fuera'];
  roles = ['todos', 'Administrador', 'Tecnico N2', 'Helpdesk', 'Seguridad'];

  technicians: Technician[] = [
    { id: 1, name: 'Ana Garcia', initials: 'AG', role: 'Administrador', email: 'ana@gestion.com', site: 'Lima HQ', status: 'Disponible', workload: 74, openTickets: 12, resolvedToday: 9, responseTime: '14m', color: '#315ff4' },
    { id: 2, name: 'Miguel Ruiz', initials: 'MR', role: 'Tecnico N2', email: 'miguel@gestion.com', site: 'Arequipa', status: 'En ticket', workload: 88, openTickets: 18, resolvedToday: 7, responseTime: '22m', color: '#315ff4' },
    { id: 3, name: 'Laura Perez', initials: 'LP', role: 'Helpdesk', email: 'laura@gestion.com', site: 'Lima HQ', status: 'Disponible', workload: 61, openTickets: 8, resolvedToday: 11, responseTime: '9m', color: '#8b5cf6' },
    { id: 4, name: 'Pablo Garcia', initials: 'PG', role: 'Seguridad', email: 'pablo@gestion.com', site: 'Remoto', status: 'En ticket', workload: 92, openTickets: 15, resolvedToday: 5, responseTime: '31m', color: '#f59e0b' },
    { id: 5, name: 'Sofia Castro', initials: 'SC', role: 'Helpdesk', email: 'sofia@gestion.com', site: 'Cusco', status: 'Fuera', workload: 0, openTickets: 0, resolvedToday: 0, responseTime: '-', color: '#ef4444' },
    { id: 6, name: 'Jade Velez', initials: 'JV', role: 'Tecnico N2', email: 'jade@gestion.com', site: 'Lima HQ', status: 'Disponible', workload: 69, openTickets: 10, resolvedToday: 8, responseTime: '17m', color: '#06b6d4' },
  ];

  sites = ['Lima HQ', 'Arequipa', 'Cusco', 'Remoto'];
  permissions = [
    { label: 'Gestionar tickets', enabled: true },
    { label: 'Acceso remoto', enabled: true },
    { label: 'Administrar parches', enabled: false },
    { label: 'Crear reportes', enabled: false },
    { label: 'Configurar IA', enabled: false },
  ];

  roleMatrix = [
    { role: 'Administrador', users: 1, tickets: true, remote: true, patches: true, reports: true, ai: true },
    { role: 'Tecnico N2', users: 2, tickets: true, remote: true, patches: true, reports: false, ai: false },
    { role: 'Helpdesk', users: 2, tickets: true, remote: true, patches: false, reports: false, ai: false },
    { role: 'Seguridad', users: 1, tickets: true, remote: false, patches: true, reports: true, ai: false },
  ];

  groups = [
    { name: 'Mesa de ayuda Lima', members: 3, queue: 'Tickets entrantes', sla: '4h', color: '#315ff4' },
    { name: 'Infraestructura N2', members: 2, queue: 'Servidores y red', sla: '2h', color: '#315ff4' },
    { name: 'Seguridad', members: 1, queue: 'Alertas criticas', sla: '1h', color: '#ef4444' },
  ];

  get filteredTechnicians(): Technician[] {
    const query = this.searchQuery.toLowerCase();
    return this.technicians.filter((tech) => {
      const matchesSearch = tech.name.toLowerCase().includes(query) || tech.email.toLowerCase().includes(query) || tech.site.toLowerCase().includes(query);
      const matchesStatus = this.selectedStatus === 'todos' || tech.status === this.selectedStatus;
      const matchesRole = this.selectedRole === 'todos' || tech.role === this.selectedRole;
      return matchesSearch && matchesStatus && matchesRole;
    });
  }

  get stats() {
    return {
      total: this.technicians.length,
      available: this.technicians.filter((tech) => tech.status === 'Disponible').length,
      inTicket: this.technicians.filter((tech) => tech.status === 'En ticket').length,
      resolved: this.technicians.reduce((sum, tech) => sum + tech.resolvedToday, 0),
    };
  }

  statusColor(status: string): string {
    return { Disponible: '#315ff4', 'En ticket': '#f59e0b', Fuera: '#ef4444' }[status] ?? '#888';
  }

  workloadColor(workload: number): string {
    if (workload >= 85) return '#ef4444';
    if (workload >= 70) return '#f59e0b';
    return '#315ff4';
  }

  openProfile(tech: Technician) {
    this.selectedTech = tech;
    this.showPermissionPanel = false;
  }

  closeProfile() {
    this.selectedTech = null;
    this.showPermissionPanel = false;
  }

  openTechModal() {
    this.techForm = {
      name: '',
      email: '',
      role: 'Helpdesk',
      site: 'Lima HQ',
      status: 'Disponible',
      workload: 25,
      responseTime: '15m',
    };
    this.showTechModal = true;
  }

  createTechnician() {
    if (!this.techForm.name.trim() || !this.techForm.email.trim()) return;
    const parts = this.techForm.name.trim().split(' ');
    const initials = parts.slice(0, 2).map((part) => part.charAt(0).toUpperCase()).join('');
    this.technicians.unshift({
      id: Date.now(),
      name: this.techForm.name.trim(),
      initials,
      role: this.techForm.role,
      email: this.techForm.email.trim(),
      site: this.techForm.site,
      status: this.techForm.status,
      workload: this.techForm.status === 'Fuera' ? 0 : this.techForm.workload,
      openTickets: 0,
      resolvedToday: 0,
      responseTime: this.techForm.responseTime,
      color: '#315ff4',
    });
    this.showTechModal = false;
  }

  assignTicket(tech: Technician) {
    tech.openTickets += 1;
    tech.workload = Math.min(100, tech.workload + 8);
    tech.status = 'En ticket';
  }
}
