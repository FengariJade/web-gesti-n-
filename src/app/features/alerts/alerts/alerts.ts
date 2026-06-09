import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Alert {
  id: number;
  title: string;
  device: string;
  type: string;
  severity: 'crítica' | 'alta' | 'media' | 'baja';
  status: 'activa' | 'reconocida' | 'resuelta';
  time: string;
  description: string;
}

@Component({
  selector: 'app-alerts',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './alerts.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Alerts {

  searchQuery = '';
  selectedSeverity = 'todos';
  selectedStatus = 'todos';
  selectedAlert: Alert | null = null;

  severities = ['todos', 'crítica', 'alta', 'media', 'baja'];
  statuses   = ['todos', 'activa', 'reconocida', 'resuelta'];

  alerts: Alert[] = [
    { id: 1,  title: 'CPU al 98% por 10 minutos',       device: 'SRV-PROD-01',    type: 'Rendimiento', severity: 'crítica', status: 'activa',      time: 'Hace 5m',   description: 'El uso de CPU supera el umbral crítico sostenido.' },
    { id: 2,  title: 'Disco duro al 95% de capacidad',  device: 'SRV-BACKUP-01',  type: 'Almacenamiento', severity: 'alta', status: 'activa',      time: 'Hace 15m',  description: 'Espacio en disco crítico, se requiere limpieza.' },
    { id: 3,  title: 'Servicio IIS detenido',           device: 'SRV-WEB-02',     type: 'Servicio',    severity: 'crítica', status: 'reconocida',   time: 'Hace 30m',  description: 'El servicio IIS se detuvo inesperadamente.' },
    { id: 4,  title: 'Fallo de backup nocturno',        device: 'SRV-BACKUP-01',  type: 'Backup',      severity: 'alta',    status: 'activa',      time: 'Hace 8h',   description: 'El job de backup programado falló a las 02:00.' },
    { id: 5,  title: 'RAM al 87%',                      device: 'DESKTOP-MR002',  type: 'Rendimiento', severity: 'media',   status: 'activa',      time: 'Hace 1h',   description: 'Uso elevado de memoria RAM en estación de trabajo.' },
    { id: 6,  title: 'Antivirus desactualizado',        device: 'DESKTOP-SC005',  type: 'Seguridad',   severity: 'media',   status: 'activa',      time: 'Hace 2h',   description: 'Las definiciones de antivirus tienen más de 7 días.' },
    { id: 7,  title: 'Intento de acceso no autorizado', device: 'SRV-PROD-01',    type: 'Seguridad',   severity: 'crítica', status: 'reconocida',   time: 'Hace 3h',   description: '5 intentos fallidos de login detectados.' },
    { id: 8,  title: 'Windows Update pendiente',        device: 'DESKTOP-JL004',  type: 'Parches',     severity: 'baja',    status: 'activa',      time: 'Hace 1d',   description: '8 actualizaciones críticas de Windows pendientes.' },
    { id: 9,  title: 'Certificado SSL por vencer',      device: 'SRV-WEB-02',     type: 'Seguridad',   severity: 'alta',    status: 'activa',      time: 'Hace 2d',   description: 'El certificado SSL vence en 7 días.' },
    { id: 10, title: 'Temperatura CPU elevada',         device: 'DESKTOP-AG001',  type: 'Hardware',    severity: 'media',   status: 'resuelta',    time: 'Hace 3d',   description: 'Temperatura CPU superó 85°C. Ya normalizada.' },
  ];

  get filtered(): Alert[] {
    return this.alerts.filter(a => {
      const matchSearch   = a.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                            a.device.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchSeverity = this.selectedSeverity === 'todos' || a.severity === this.selectedSeverity;
      const matchStatus   = this.selectedStatus   === 'todos' || a.status   === this.selectedStatus;
      return matchSearch && matchSeverity && matchStatus;
    });
  }

  get stats() {
    return {
      total:      this.alerts.length,
      criticas:   this.alerts.filter(a => a.severity === 'crítica' && a.status !== 'resuelta').length,
      altas:      this.alerts.filter(a => a.severity === 'alta'    && a.status !== 'resuelta').length,
      activas:    this.alerts.filter(a => a.status === 'activa').length,
      resueltas:  this.alerts.filter(a => a.status === 'resuelta').length,
    };
  }

  severityColor(s: string): string {
    return { crítica: '#ef4444', alta: '#f97316', media: '#f59e0b', baja: '#22c55e' }[s] ?? '#888';
  }

  severityBg(s: string): string {
    return { crítica: 'rgba(239,68,68,0.12)', alta: 'rgba(249,115,22,0.12)', media: 'rgba(245,158,11,0.12)', baja: 'rgba(34,197,94,0.12)' }[s] ?? '';
  }

  severityIcon(s: string): string {
    return { crítica: 'lucide:alert-octagon', alta: 'lucide:alert-triangle', media: 'lucide:alert-circle', baja: 'lucide:info' }[s] ?? 'lucide:bell';
  }

  statusColor(s: string): string {
    return { activa: '#ef4444', reconocida: '#f59e0b', resuelta: '#22c55e' }[s] ?? '#888';
  }

  statusBg(s: string): string {
    return { activa: 'rgba(239,68,68,0.12)', reconocida: 'rgba(245,158,11,0.12)', resuelta: 'rgba(34,197,94,0.12)' }[s] ?? '';
  }

  acknowledge(alert: Alert, e: Event) {
    e.stopPropagation();
    alert.status = 'reconocida';
  }

  resolve(alert: Alert, e: Event) {
    e.stopPropagation();
    alert.status = 'resuelta';
  }

  open(alert: Alert) { this.selectedAlert = alert; }
  close() { this.selectedAlert = null; }
}