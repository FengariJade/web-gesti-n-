import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule, 

  ],
  templateUrl: './dashboard.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Dashboard {

  today = new Date();
  overallScore = 90;

  kpiStats = [
    { label: 'Total empleados',     value: '128', icon: 'users',          trend: '+4 este mes',      trendUp: true,  iconBg: 'rgba(49,95,244,0.13)' },
    { label: 'Eventos este mes',    value: '14',  icon: 'calendar-check', trend: '+2 vs anterior',   trendUp: true,  iconBg: 'rgba(49,95,244,0.13)' },
    { label: 'Tareas completadas',  value: '87%', icon: 'check-circle',   trend: '+12% vs anterior', trendUp: true,  iconBg: 'rgba(49,95,244,0.13)' },
    { label: 'Incidencias abiertas',value: '3',   icon: 'alert-triangle', trend: '-5 esta semana',   trendUp: false, iconBg: 'rgba(239,68,68,0.1)'   },
  ];

  performanceMetrics = [
    { label: 'Consistencia laboral', value: 90, color: '#315ff4' },
    { label: 'Trabajo en equipo',    value: 85, color: '#06b6d4' },
    { label: 'Resolución de prob.',  value: 80, color: '#8b5cf6' },
  ];

  upcomingEvents = [
    {
      title: 'Reunión de Diseño', month: 'DIC', day: '8',
      time: '10:15 AM â€“ 12:30 PM', location: 'Online', color: '#315ff4',
      attendees: [
        { initials: 'AG', name: 'Ana GarcÃ­a',  color: '#059669' },
        { initials: 'MR', name: 'Miguel Ruiz', color: '#0891b2' },
        { initials: 'LP', name: 'Laura PÃ©rez', color: '#7c3aed' },
      ],
    },
    {
      title: 'Weekly Meeting', month: 'DIC', day: '14',
      time: '10:15 AM â€“ 12:30 PM', location: 'Sala 3', color: '#06b6d4',
      attendees: [
        { initials: 'JL', name: 'Juan López',   color: '#d97706' },
        { initials: 'SC', name: 'Sofí­a Castro', color: '#dc2626' },
      ],
    },
    {
      title: 'Workshop: Estrategia Q1', month: 'DIC', day: '19',
      time: '10:15 AM a 12:30 PM', location: 'Auditorio', color: '#8b5cf6',
      attendees: [
        { initials: 'PG', name: 'Pablo García',  color: '#16a34a' },
        { initials: 'NM', name: 'Nadia Morales', color: '#9333ea' },
        { initials: 'AF', name: 'Andrés Flores', color: '#0891b2' },
      ],
    },
  ];

  todayBirthdays = [
    { name: 'Nabila Dina H.', role: 'Secretaria corporativa', initials: 'ND', color: '#059669' },
    { name: 'Dany Sapta K.',  role: 'Senior UI/UX Designer',  initials: 'DS', color: '#7c3aed' },
    { name: 'Septiana P.',    role: 'Supervisora de RRHH',    initials: 'SP', color: '#d97706' },
  ];

  newJoiners = [
    { name: 'Aditya Suazi', role: 'Lead UI/UX Designer',   initials: 'AS', color: '#0891b2', date: '30 Nov' },
    { name: 'Vebbyana A.',  role: 'Corporate Strategy Dev', initials: 'VA', color: '#16a34a', date: '30 Nov' },
    { name: 'Farin Rafida', role: 'Project Manager',        initials: 'FR', color: '#dc2626', date: '31 Nov' },
  ];

  quickLinks = [
    { label: 'Portal oficial', icon: 'globe',     iconBg: 'rgba(49,95,244,0.12)' },
    { label: 'E-Office',       icon: 'briefcase', iconBg: 'rgba(49,95,244,0.12)' },
    { label: 'Sistema RRHH',   icon: 'users-2',   iconBg: 'rgba(49,95,244,0.12)' },
    { label: 'Intranet Docs',  icon: 'folder',    iconBg: 'rgba(49,95,244,0.12)' },
    { label: 'Tablero Kanban', icon: 'kanban',    iconBg: 'rgba(49,95,244,0.12)' },
  ];
}