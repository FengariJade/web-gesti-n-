import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface AiStat {
  label: string;
  value: string;
  helper: string;
  trend: string;
  icon: string;
  color: string;
}

interface OptimizationTask {
  title: string;
  description: string;
  status: 'listo' | 'pendiente' | 'recomendado';
  icon: string;
}

interface Insight {
  title: string;
  detail: string;
  impact: string;
  color: string;
}

interface CloudAction {
  name: string;
  trigger: string;
  method: string;
  endpoint: string;
  owner: string;
  status: 'Activa' | 'Borrador';
}

@Component({
  selector: 'app-ai-center',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ai-center.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AiCenter {
  selectedRange = '30 dias';
  activeTab: 'overview' | 'integrations' | 'actions' = 'overview';
  showActionModal = false;
  showInsightModal = false;
  selectedInsight: Insight | null = null;
  ranges = ['7 dias', '30 dias', '90 dias'];

  actionForm: CloudAction = {
    name: '',
    trigger: 'Ticket nuevo',
    method: 'POST',
    endpoint: '',
    owner: 'Ana Garcia',
    status: 'Borrador',
  };

  stats: AiStat[] = [
    { label: 'Horas ahorradas', value: '186h', helper: 'Autopilot resolvio trabajo repetitivo', trend: '+24%', icon: 'clock-3', color: '#315ff4' },
    { label: 'Tickets resueltos', value: '64%', helper: 'De tickets iniciados por IA', trend: '+8%', icon: 'badge-check', color: '#315ff4' },
    { label: 'Satisfaccion', value: '92%', helper: 'Conversaciones valoradas positivo', trend: '+3%', icon: 'smile', color: '#8b5cf6' },
    { label: 'Reapertura', value: '4.8%', helper: 'Tickets reabiertos tras IA', trend: '-1.6%', icon: 'rotate-ccw', color: '#f59e0b' },
  ];

  hoursByDay = [8, 11, 7, 14, 16, 12, 18, 20, 15, 22, 19, 24];

  ticketTrend = [
    { day: 'Lun', total: 44, assisted: 26, solved: 18 },
    { day: 'Mar', total: 52, assisted: 30, solved: 21 },
    { day: 'Mie', total: 48, assisted: 29, solved: 20 },
    { day: 'Jue', total: 58, assisted: 34, solved: 24 },
    { day: 'Vie', total: 63, assisted: 41, solved: 28 },
    { day: 'Sab', total: 31, assisted: 18, solved: 13 },
  ];

  tasks: OptimizationTask[] = [
    { title: 'Conectar proveedor de identidad', description: 'Sincroniza permisos desde Microsoft Entra ID.', status: 'recomendado', icon: 'key-round' },
    { title: 'Ampliar base de conocimiento', description: 'Agrega 18 articulos para solicitudes frecuentes.', status: 'pendiente', icon: 'book-open' },
    { title: 'Publicar acciones cloud', description: 'Escalar, resolver y consultar tickets via API.', status: 'listo', icon: 'cloud-cog' },
    { title: 'Instalar integraciones MCP', description: 'Permite que Copilot consulte herramientas internas.', status: 'pendiente', icon: 'plug' },
  ];

  insights: Insight[] = [
    { title: 'VPN concentra el 31% de solicitudes', detail: 'Crea una accion guiada para validar MFA y renovar credenciales.', impact: 'Ahorro estimado: 22h/mes', color: '#315ff4' },
    { title: 'Mas tickets reabiertos en accesos', detail: 'La IA recomienda pedir aprobacion de Finanzas antes de habilitar permisos.', impact: 'Reduce reapertura 12%', color: '#f59e0b' },
    { title: 'Base de conocimiento incompleta', detail: 'Faltan respuestas para impresoras, correo y permisos compartidos.', impact: '18 articulos sugeridos', color: '#8b5cf6' },
  ];

  cloudActions: CloudAction[] = [
    { name: 'Escalar ticket critico', trigger: 'Prioridad critica', method: 'POST', endpoint: '/tickets/{id}/escalate', owner: 'Ana Garcia', status: 'Activa' },
    { name: 'Reiniciar cola de impresion', trigger: 'Categoria impresoras', method: 'POST', endpoint: '/devices/{id}/scripts/print-spooler', owner: 'Pablo Garcia', status: 'Activa' },
    { name: 'Notificar aprobacion de accesos', trigger: 'Solicitud de permisos', method: 'POST', endpoint: '/approvals/access-request', owner: 'Miguel Ruiz', status: 'Borrador' },
  ];

  integrations = [
    { name: 'Microsoft 365', type: 'Identidad y correo', status: 'Conectado', health: 98, icon: 'mail', color: '#315ff4' },
    { name: 'Slack', type: 'Mensajeria', status: 'Conectado', health: 92, icon: 'message-square', color: '#8b5cf6' },
    { name: 'Jira Service Management', type: 'Tickets externos', status: 'Pendiente', health: 42, icon: 'workflow', color: '#f59e0b' },
    { name: 'Entra ID', type: 'Permisos y usuarios', status: 'Requiere revision', health: 68, icon: 'shield-check', color: '#ef4444' },
  ];

  maxValue(values: number[]): number {
    return Math.max(...values);
  }

  taskBadge(status: string): string {
    return { listo: 'Listo', pendiente: 'Pendiente', recomendado: 'Recomendado' }[status] ?? status;
  }

  taskColor(status: string): string {
    return { listo: '#315ff4', pendiente: '#f59e0b', recomendado: '#315ff4' }[status] ?? '#888';
  }

  openActionModal() {
    this.actionForm = {
      name: '',
      trigger: 'Ticket nuevo',
      method: 'POST',
      endpoint: '',
      owner: 'Ana Garcia',
      status: 'Borrador',
    };
    this.showActionModal = true;
  }

  saveAction() {
    if (!this.actionForm.name.trim() || !this.actionForm.endpoint.trim()) return;
    this.cloudActions.unshift({ ...this.actionForm, name: this.actionForm.name.trim(), endpoint: this.actionForm.endpoint.trim() });
    this.showActionModal = false;
  }

  runAction(action: CloudAction) {
    action.status = 'Activa';
  }

  openInsight(insight: Insight) {
    this.selectedInsight = insight;
    this.showInsightModal = true;
  }

  closeInsight() {
    this.showInsightModal = false;
    this.selectedInsight = null;
  }
}
