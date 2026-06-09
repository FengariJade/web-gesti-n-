import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ScheduledTicket {
  id: number;
  title: string;
  customer: string;
  technician: string;
  technicianInitials: string;
  priority: 'Baja' | 'Media' | 'Alta' | 'Critica';
  status: 'Programado' | 'En curso' | 'Pendiente';
  day: number;
  start: string;
  duration: string;
  color: string;
}

interface Reminder {
  id: number;
  title: string;
  note: string;
  day: number;
  time: string;
  color: string;
  done: boolean;
}

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './calendar.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Calendar {
  activeTab: 'calendar' | 'scheduled' | 'sync' = 'calendar';
  currentMonth = 5;
  currentYear = 2026;
  selectedDay: number | null = 8;
  selectedTechnician = 'todos';
  viewMode: 'month' | 'week' = 'month';
  showTicketModal = false;
  showReminderModal = false;

  ticketForm = {
    title: '',
    customer: '',
    technician: 'Ana Garcia',
    priority: 'Media' as ScheduledTicket['priority'],
    day: 8,
    start: '09:00',
    duration: '1h',
  };

  reminderForm = {
    title: '',
    note: '',
    time: '09:00',
  };

  monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Setiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  technicians = ['todos', 'Ana Garcia', 'Miguel Ruiz', 'Laura Perez', 'Pablo Garcia'];

  tickets: ScheduledTicket[] = [
    { id: 1408, title: 'Mantenimiento preventivo laptops', customer: 'Finanzas Lima', technician: 'Ana Garcia', technicianInitials: 'AG', priority: 'Media', status: 'Programado', day: 8, start: '09:00', duration: '2h', color: '#315ff4' },
    { id: 1412, title: 'Revision VPN y MFA', customer: 'Operaciones Norte', technician: 'Miguel Ruiz', technicianInitials: 'MR', priority: 'Alta', status: 'En curso', day: 8, start: '11:30', duration: '1h 30m', color: '#f59e0b' },
    { id: 1415, title: 'Instalacion de agentes', customer: 'Retail Sur', technician: 'Laura Perez', technicianInitials: 'LP', priority: 'Baja', status: 'Programado', day: 10, start: '14:00', duration: '3h', color: '#315ff4' },
    { id: 1421, title: 'Servidor con alertas criticas', customer: 'DataSafe Inc.', technician: 'Pablo Garcia', technicianInitials: 'PG', priority: 'Critica', status: 'Pendiente', day: 12, start: '08:30', duration: '2h', color: '#ef4444' },
    { id: 1428, title: 'Onboarding usuarios nuevos', customer: 'Gerencia', technician: 'Ana Garcia', technicianInitials: 'AG', priority: 'Media', status: 'Programado', day: 16, start: '10:00', duration: '1h', color: '#8b5cf6' },
    { id: 1433, title: 'Auditoria de parches', customer: 'Lima HQ', technician: 'Pablo Garcia', technicianInitials: 'PG', priority: 'Alta', status: 'Programado', day: 18, start: '15:00', duration: '2h', color: '#06b6d4' },
  ];

  reminders: Reminder[] = [
    { id: 1, title: 'Confirmar acceso remoto', note: 'Validar credenciales con Finanzas Lima.', day: 8, time: '08:30', color: '#315ff4', done: false },
    { id: 2, title: 'Enviar resumen SLA', note: 'Adjuntar reporte antes de la reunion.', day: 12, time: '16:00', color: '#315ff4', done: false },
  ];

  syncConnections = [
    { name: 'Google Calendar', account: 'soporte@gestion.com', status: 'Conectado', lastSync: 'Hace 6 min', color: '#315ff4' },
    { name: 'Outlook Calendar', account: 'operaciones@gestion.com', status: 'Conectado', lastSync: 'Hace 14 min', color: '#315ff4' },
    { name: 'Teams', account: 'Sin configurar', status: 'Pendiente', lastSync: 'Nunca', color: '#f59e0b' },
  ];

  get daysInMonth(): number {
    return new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
  }

  get firstDayOfMonth(): number {
    const day = new Date(this.currentYear, this.currentMonth, 1).getDay();
    return day === 0 ? 6 : day - 1;
  }

  get calendarDays(): (number | null)[] {
    const days: (number | null)[] = [];
    for (let i = 0; i < this.firstDayOfMonth; i++) days.push(null);
    for (let day = 1; day <= this.daysInMonth; day++) days.push(day);
    return days;
  }

  get filteredTickets(): ScheduledTicket[] {
    return this.tickets.filter((ticket) => this.selectedTechnician === 'todos' || ticket.technician === this.selectedTechnician);
  }

  get selectedTickets(): ScheduledTicket[] {
    return this.filteredTickets.filter((ticket) => ticket.day === this.selectedDay);
  }

  get selectedReminders(): Reminder[] {
    return this.reminders.filter((reminder) => reminder.day === this.selectedDay);
  }

  hasTickets(day: number): boolean {
    return this.filteredTickets.some((ticket) => ticket.day === day);
  }

  hasReminders(day: number): boolean {
    return this.reminders.some((reminder) => reminder.day === day);
  }

  ticketsForDay(day: number): ScheduledTicket[] {
    return this.filteredTickets.filter((ticket) => ticket.day === day).slice(0, 3);
  }

  selectDay(day: number | null) {
    if (day) this.selectedDay = day;
  }

  openTicketModal(day = this.selectedDay) {
    this.ticketForm = {
      title: '',
      customer: '',
      technician: this.selectedTechnician === 'todos' ? 'Ana Garcia' : this.selectedTechnician,
      priority: 'Media',
      day: day ?? 1,
      start: '09:00',
      duration: '1h',
    };
    this.showTicketModal = true;
  }

  createTicket() {
    if (!this.ticketForm.title.trim() || !this.ticketForm.customer.trim()) return;
    const colorByPriority = { Baja: '#315ff4', Media: '#315ff4', Alta: '#f59e0b', Critica: '#ef4444' };
    const initials = this.ticketForm.technician.split(' ').slice(0, 2).map((part) => part.charAt(0)).join('');
    this.tickets.unshift({
      id: Date.now(),
      title: this.ticketForm.title.trim(),
      customer: this.ticketForm.customer.trim(),
      technician: this.ticketForm.technician,
      technicianInitials: initials,
      priority: this.ticketForm.priority,
      status: 'Programado',
      day: this.ticketForm.day,
      start: this.ticketForm.start,
      duration: this.ticketForm.duration,
      color: colorByPriority[this.ticketForm.priority],
    });
    this.selectedDay = this.ticketForm.day;
    this.showTicketModal = false;
  }

  openReminderModal(day = this.selectedDay) {
    this.selectedDay = day ?? this.selectedDay;
    this.reminderForm = { title: '', note: '', time: '09:00' };
    this.showReminderModal = true;
  }

  createReminder() {
    if (!this.selectedDay || !this.reminderForm.title.trim()) return;
    this.reminders.unshift({
      id: Date.now(),
      title: this.reminderForm.title.trim(),
      note: this.reminderForm.note.trim(),
      day: this.selectedDay,
      time: this.reminderForm.time,
      color: '#8b5cf6',
      done: false,
    });
    this.showReminderModal = false;
  }

  prevMonth() {
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
    this.selectedDay = null;
  }

  nextMonth() {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
    this.selectedDay = null;
  }

  statusColor(status: string): string {
    return { Programado: '#315ff4', 'En curso': '#315ff4', Pendiente: '#f59e0b' }[status] ?? '#888';
  }
}
