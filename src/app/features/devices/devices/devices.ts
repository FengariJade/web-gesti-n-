import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Device {
  id: number;
  name: string;
  type: 'PC' | 'Servidor' | 'Mac' | 'Linux';
  site: string;
  user: string;
  status: 'en línea' | 'fuera de línea' | 'alerta';
  os: string;
  lastSeen: string;
  patches: number;
  alerts: number;
}

@Component({
  selector: 'app-devices',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './devices.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Devices {

  searchQuery = '';
  selectedStatus = 'todos';
  selectedType = 'todos';
  selectedDevice: Device | null = null;

  statuses = ['todos', 'en línea', 'fuera de línea', 'alerta'];
  types    = ['todos', 'PC', 'Servidor', 'Mac', 'Linux'];

  devices: Device[] = [
    { id: 1,  name: 'DESKTOP-AG001',   type: 'PC',       site: 'Oficina Central', user: 'Ana García',    status: 'en línea',      os: 'Windows 11',    lastSeen: 'Ahora',     patches: 0, alerts: 0 },
    { id: 2,  name: 'SRV-PROD-01',     type: 'Servidor', site: 'Datacenter',      user: 'Sistema',       status: 'alerta',        os: 'Windows Server', lastSeen: 'Hace 5m',   patches: 3, alerts: 2 },
    { id: 3,  name: 'MACBOOK-LP',      type: 'Mac',      site: 'Remoto',          user: 'Laura Pérez',   status: 'en línea',      os: 'macOS Sonoma',  lastSeen: 'Ahora',     patches: 1, alerts: 0 },
    { id: 4,  name: 'DESKTOP-MR002',   type: 'PC',       site: 'Oficina Central', user: 'Miguel Ruiz',   status: 'en línea',      os: 'Windows 10',    lastSeen: 'Hace 10m',  patches: 5, alerts: 1 },
    { id: 5,  name: 'SRV-BACKUP-01',   type: 'Servidor', site: 'Datacenter',      user: 'Sistema',       status: 'fuera de línea',os: 'Linux Ubuntu',  lastSeen: 'Hace 2h',   patches: 0, alerts: 3 },
    { id: 6,  name: 'LINUX-PG003',     type: 'Linux',    site: 'Remoto',          user: 'Pablo García',  status: 'en línea',      os: 'Ubuntu 22.04',  lastSeen: 'Hace 1m',   patches: 2, alerts: 0 },
    { id: 7,  name: 'DESKTOP-JL004',   type: 'PC',       site: 'Oficina Norte',   user: 'Juan López',    status: 'fuera de línea',os: 'Windows 11',    lastSeen: 'Hace 1d',   patches: 8, alerts: 0 },
    { id: 8,  name: 'MACBOOK-DS',      type: 'Mac',      site: 'Remoto',          user: 'Dany Sapta',    status: 'en línea',      os: 'macOS Ventura', lastSeen: 'Ahora',     patches: 0, alerts: 0 },
    { id: 9,  name: 'SRV-WEB-02',      type: 'Servidor', site: 'Datacenter',      user: 'Sistema',       status: 'en línea',      os: 'Linux Debian',  lastSeen: 'Hace 2m',   patches: 1, alerts: 0 },
    { id: 10, name: 'DESKTOP-SC005',   type: 'PC',       site: 'Oficina Central', user: 'Sofía Castro',  status: 'alerta',        os: 'Windows 10',    lastSeen: 'Hace 15m',  patches: 4, alerts: 2 },
  ];

  get filtered(): Device[] {
    return this.devices.filter(d => {
      const matchSearch = d.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                          d.user.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchStatus = this.selectedStatus === 'todos' || d.status === this.selectedStatus;
      const matchType   = this.selectedType   === 'todos' || d.type   === this.selectedType;
      return matchSearch && matchStatus && matchType;
    });
  }

  get stats() {
    return {
      total:    this.devices.length,
      online:   this.devices.filter(d => d.status === 'en línea').length,
      offline:  this.devices.filter(d => d.status === 'fuera de línea').length,
      alerts:   this.devices.filter(d => d.status === 'alerta').length,
      patches:  this.devices.reduce((a, d) => a + d.patches, 0),
    };
  }

  statusColor(s: string): string {
    return { 'en línea': '#315ff4', 'fuera de línea': '#9aa5b4', 'alerta': '#ef4444' }[s] ?? '#888';
  }

  statusBg(s: string): string {
    return { 'en línea': 'rgba(0,196,94,0.12)', 'fuera de línea': 'rgba(154,165,180,0.12)', 'alerta': 'rgba(239,68,68,0.12)' }[s] ?? '';
  }

  typeIcon(t: string): string {
    return { PC: 'lucide:monitor', Servidor: 'lucide:server', Mac: 'lucide:laptop', Linux: 'lucide:terminal' }[t] ?? 'lucide:monitor';
  }

  open(device: Device) { this.selectedDevice = device; }
  close() { this.selectedDevice = null; }
}