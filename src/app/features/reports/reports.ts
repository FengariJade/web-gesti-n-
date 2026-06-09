import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ReportTemplate {
  name: string;
  category: string;
  description: string;
  icon: string;
  color: string;
  updated: string;
}

interface Metric {
  label: string;
  value: string;
  change: string;
  icon: string;
  color: string;
}

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reports.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Reports {
  activeTab: 'reports' | 'templates' | 'scheduled' = 'reports';
  selectedCategory = 'todos';
  selectedPeriod = '30 dias';
  searchQuery = '';
  showReportModal = false;
  selectedReport: ReportTemplate | null = null;

  reportForm = {
    name: '',
    category: 'Tickets',
    description: '',
    delivery: 'Manual',
    recipients: '',
  };

  periods = ['7 dias', '30 dias', 'Trimestre', 'Ano'];
  categories = ['todos', 'Tickets', 'Dispositivos', 'Parches', 'SLA', 'Finanzas'];

  metrics: Metric[] = [
    { label: 'Tickets cerrados', value: '1,248', change: '+18%', icon: 'ticket-check', color: '#315ff4' },
    { label: 'SLA cumplido', value: '94.2%', change: '+3.1%', icon: 'timer-reset', color: '#315ff4' },
    { label: 'Parches instalados', value: '3,820', change: '+31%', icon: 'shield-check', color: '#8b5cf6' },
    { label: 'Horas facturables', value: '642h', change: '+9%', icon: 'badge-dollar-sign', color: '#f59e0b' },
  ];

  templates: ReportTemplate[] = [
    { name: 'Resumen ejecutivo', category: 'Tickets', description: 'Estado general del servicio, volumen y tendencia.', icon: 'presentation', color: '#315ff4', updated: 'Hoy' },
    { name: 'Rendimiento de tecnicos', category: 'Tickets', description: 'Resolucion, carga, tiempos de respuesta y reasignaciones.', icon: 'users-round', color: '#315ff4', updated: 'Hace 2h' },
    { name: 'Dispositivos por sitio', category: 'Dispositivos', description: 'Inventario, disponibilidad, alertas y sistema operativo.', icon: 'monitor', color: '#06b6d4', updated: 'Hoy' },
    { name: 'Estado de parches', category: 'Parches', description: 'Cumplimiento, vulnerabilidades y reinicios pendientes.', icon: 'shield-check', color: '#8b5cf6', updated: 'Ayer' },
    { name: 'Analisis de SLA', category: 'SLA', description: 'Tickets incumplidos, tiempo de primera respuesta y resolucion.', icon: 'timer', color: '#f59e0b', updated: 'Hace 4h' },
    { name: 'Horas y contratos', category: 'Finanzas', description: 'Uso por cliente, horas facturables y acuerdos vigentes.', icon: 'receipt', color: '#ef4444', updated: 'Hace 1d' },
  ];

  topCustomers = [
    { name: 'Finanzas Lima', tickets: 148, sla: 96, color: '#315ff4' },
    { name: 'Retail Sur', tickets: 126, sla: 91, color: '#315ff4' },
    { name: 'DataSafe Inc.', tickets: 98, sla: 88, color: '#f59e0b' },
    { name: 'Operaciones Norte', tickets: 82, sla: 94, color: '#8b5cf6' },
  ];

  monthly = [
    { month: 'Ene', closed: 186, opened: 204 },
    { month: 'Feb', closed: 212, opened: 228 },
    { month: 'Mar', closed: 238, opened: 231 },
    { month: 'Abr', closed: 246, opened: 252 },
    { month: 'May', closed: 271, opened: 260 },
    { month: 'Jun', closed: 295, opened: 278 },
  ];

  scheduledReports = [
    { name: 'Resumen semanal de SLA', cadence: 'Lunes 08:00', recipients: 'gerencia@gestion.com', status: 'Activo', lastRun: 'Hace 1d' },
    { name: 'Parches pendientes', cadence: 'Diario 07:30', recipients: 'infra@gestion.com', status: 'Activo', lastRun: 'Hoy' },
    { name: 'Horas facturables', cadence: 'Mensual dia 1', recipients: 'finanzas@gestion.com', status: 'Pausado', lastRun: 'Hace 8d' },
  ];

  get filteredReports(): ReportTemplate[] {
    const query = this.searchQuery.toLowerCase();
    return this.templates.filter((report) => {
      const matchesSearch = report.name.toLowerCase().includes(query) || report.description.toLowerCase().includes(query);
      const matchesCategory = this.selectedCategory === 'todos' || report.category === this.selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }

  get maxMonthly(): number {
    return Math.max(...this.monthly.flatMap((row) => [row.closed, row.opened]));
  }

  openReportModal() {
    this.reportForm = {
      name: '',
      category: 'Tickets',
      description: '',
      delivery: 'Manual',
      recipients: '',
    };
    this.showReportModal = true;
  }

  createReport() {
    if (!this.reportForm.name.trim() || !this.reportForm.description.trim()) return;
    const colors = { Tickets: '#315ff4', Dispositivos: '#315ff4', Parches: '#8b5cf6', SLA: '#f59e0b', Finanzas: '#ef4444' };
    const icons = { Tickets: 'ticket-check', Dispositivos: 'monitor', Parches: 'shield-check', SLA: 'timer', Finanzas: 'receipt' };
    this.templates.unshift({
      name: this.reportForm.name.trim(),
      category: this.reportForm.category,
      description: this.reportForm.description.trim(),
      icon: icons[this.reportForm.category as keyof typeof icons] ?? 'bar-chart-3',
      color: colors[this.reportForm.category as keyof typeof colors] ?? '#315ff4',
      updated: this.reportForm.delivery === 'Manual' ? 'Ahora' : this.reportForm.delivery,
    });
    this.showReportModal = false;
  }

  previewReport(report: ReportTemplate) {
    this.selectedReport = report;
  }

  closePreview() {
    this.selectedReport = null;
  }

  exportReport(report: ReportTemplate) {
    report.updated = 'Exportado ahora';
  }
}
