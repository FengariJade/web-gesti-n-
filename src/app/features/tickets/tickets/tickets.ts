import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Ticket {
  id: number;
  title: string;
  client: string;
  assignee: string;
  assigneeInitials: string;
  assigneeColor: string;
  priority: 'baja' | 'media' | 'alta' | 'crítica';
  status: 'abierto' | 'en progreso' | 'esperando' | 'resuelto';
  category: string;
  created: string;
  sla: string;
  slaOk: boolean;
}

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,

  ],
  templateUrl: './tickets.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Tickets {

  searchQuery = '';
  selectedStatus = 'todos';
  selectedPriority = 'todos';
  selectedTicket: Ticket | null = null;

  statuses   = ['todos', 'abierto', 'en progreso', 'esperando', 'resuelto'];
  priorities = ['todos', 'baja', 'media', 'alta', 'crítica'];

  tickets: Ticket[] = [
    { id: 1,  title: 'Computadora no enciende',        client: 'John Smith',    assignee: 'Jade Velez',   assigneeInitials: 'JV', assigneeColor: '#315ff4', priority: 'alta',    status: 'abierto',      category: 'Hardware',  created: 'Hace 5h',  sla: '4h',  slaOk: false },
    { id: 2,  title: 'Error al iniciar sesión en VPN', client: 'María López',   assignee: 'Ana García',   assigneeInitials: 'AG', assigneeColor: '#315ff4', priority: 'media',   status: 'en progreso',  category: 'Red',       created: 'Hace 2h',  sla: '8h',  slaOk: true  },
    { id: 3,  title: 'Instalar Office 365',            client: 'Carlos Ruiz',   assignee: 'Miguel Ruiz',  assigneeInitials: 'MR', assigneeColor: '#8b5cf6', priority: 'baja',    status: 'esperando',    category: 'Software',  created: 'Hace 1d',  sla: '24h', slaOk: true  },
    { id: 4,  title: 'Servidor caído en producción',   client: 'TechCorp',      assignee: 'Pablo García', assigneeInitials: 'PG', assigneeColor: '#dc2626', priority: 'crítica', status: 'en progreso',  category: 'Servidor',  created: 'Hace 30m', sla: '1h',  slaOk: true  },
    { id: 5,  title: 'Impresora no detectada',         client: 'Ana Martínez',  assignee: 'Laura Pérez',  assigneeInitials: 'LP', assigneeColor: '#d97706', priority: 'baja',    status: 'resuelto',     category: 'Hardware',  created: 'Hace 3d',  sla: '24h', slaOk: true  },
    { id: 6,  title: 'Correo no llega a clientes',     client: 'Sofía Castro',  assignee: 'Jade Velez',   assigneeInitials: 'JV', assigneeColor: '#315ff4', priority: 'alta',    status: 'abierto',      category: 'Email',     created: 'Hace 1h',  sla: '4h',  slaOk: true  },
    { id: 7,  title: 'Backup fallido anoche',          client: 'DataSafe Inc.', assignee: 'Miguel Ruiz',  assigneeInitials: 'MR', assigneeColor: '#8b5cf6', priority: 'alta',    status: 'abierto',      category: 'Backup',    created: 'Hace 8h',  sla: '4h',  slaOk: false },
    { id: 8,  title: 'Acceso denegado a carpeta',      client: 'Luis Torres',   assignee: 'Ana García',   assigneeInitials: 'AG', assigneeColor: '#315ff4', priority: 'media',   status: 'resuelto',     category: 'Permisos',  created: 'Hace 2d',  sla: '8h',  slaOk: true  },
  ];

  get filtered(): Ticket[] {
    return this.tickets.filter(t => {
      const matchSearch   = t.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                            t.client.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchStatus   = this.selectedStatus   === 'todos' || t.status   === this.selectedStatus;
      const matchPriority = this.selectedPriority === 'todos' || t.priority === this.selectedPriority;
      return matchSearch && matchStatus && matchPriority;
    });
  }

  get stats() {
    return {
      total:      this.tickets.length,
      abiertos:   this.tickets.filter(t => t.status === 'abierto').length,
      progreso:   this.tickets.filter(t => t.status === 'en progreso').length,
      esperando:  this.tickets.filter(t => t.status === 'esperando').length,
      resueltos:  this.tickets.filter(t => t.status === 'resuelto').length,
    };
  }

  priorityColor(p: string): string {
    return { baja: '#22c55e', media: '#f59e0b', alta: '#ef4444', crítica: '#7c3aed' }[p] ?? '#888';
  }

  priorityBg(p: string): string {
    return { baja: 'rgba(34,197,94,0.12)', media: 'rgba(245,158,11,0.12)', alta: 'rgba(239,68,68,0.12)', crítica: 'rgba(124,58,237,0.12)' }[p] ?? '';
  }

  statusColor(s: string): string {
    return { abierto: '#315ff4', 'en progreso': '#f59e0b', esperando: '#8b5cf6', resuelto: '#22c55e' }[s] ?? '#888';
  }

  statusBg(s: string): string {
    return { abierto: 'rgba(0,114,255,0.12)', 'en progreso': 'rgba(245,158,11,0.12)', esperando: 'rgba(139,92,246,0.12)', resuelto: 'rgba(34,197,94,0.12)' }[s] ?? '';
  }

  statusLabel(s: string): string {
    return { abierto: 'Abierto', 'en progreso': 'En progreso', esperando: 'Esperando', resuelto: 'Resuelto' }[s] ?? s;
  }

  open(ticket: Ticket) { this.selectedTicket = ticket; }
  close() { this.selectedTicket = null; }
}