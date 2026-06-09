import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface VulnerableDevice {
  name: string;
  type: 'PC' | 'Servidor' | 'Mac' | 'Linux';
  missingPatches: number;
}

interface MissingPatch {
  name: string;
  classification: 'Crítica' | 'Importante' | 'Moderada' | 'Baja';
  osType: string;
  devices: number;
}

interface DeviceRow {
  name: string;
  type: 'PC' | 'Servidor' | 'Mac' | 'Linux';
  site: string;
  folder: string;
  lastLogin: string;
  availability: 'en línea' | 'fuera de línea';
  lastScan: string;
  patchesAvailable: number;
  restartPending: boolean;
  softwareUpdates: number;
}

interface PatchRow {
  name: string;
  osType: string;
  classification: 'Crítica' | 'Importante' | 'Moderada' | 'Baja';
  products: string;
  size: string;
  cves: number;
  cvss: number;
  restartRequired: boolean;
  devices: number;
}

@Component({
  selector: 'app-patches',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './patches.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Patches {

  activeTab: 'resumen' | 'dispositivos' | 'parches' = 'resumen';
  patchesSubTab: 'disponibles' | 'fallidos' | 'instalados' = 'disponibles';
  showPatchesDropdown = false;
  searchDevices = '';
  searchPatches = '';

  osStats = [
    { label: 'Windows PC',     icon: 'lucide:monitor', total: 5, patched: 3 },
    { label: 'Windows Server', icon: 'lucide:server',  total: 3, patched: 1 },
    { label: 'Mac',            icon: 'lucide:laptop',  total: 2, patched: 2 },
    { label: 'Linux',          icon: 'lucide:terminal',total: 2, patched: 1 },
  ];

  deviceStats = [
    { label: 'Dispositivos que faltan parches críticos',            value: 3, icon: 'lucide:alert-octagon' },
    { label: 'Dispositivos faltantes parches de SO',                value: 7, icon: 'lucide:monitor-x' },
    { label: 'Fallido Parches de SO',                              value: 1, icon: 'lucide:x-circle' },
    { label: 'Dispositivos pendiente reinicio',                     value: 2, icon: 'lucide:refresh-cw' },
    { label: 'Dispositivos que faltan actualizaciones de software', value: 4, icon: 'lucide:package-x' },
    { label: 'Disponible parches de SO',                           value: 12, icon: 'lucide:package-check' },
  ];

  vulnerableDevices: VulnerableDevice[] = [
    { name: 'SRV-PROD-01',   type: 'Servidor', missingPatches: 8 },
    { name: 'DESKTOP-MR002', type: 'PC',       missingPatches: 5 },
    { name: 'DESKTOP-SC005', type: 'PC',       missingPatches: 4 },
    { name: 'SRV-BACKUP-01', type: 'Servidor', missingPatches: 3 },
    { name: 'DESKTOP-JL004', type: 'PC',       missingPatches: 2 },
  ];

  missingPatches: MissingPatch[] = [
    { name: 'KB5034441 — Windows Security Update', classification: 'Crítica',    osType: 'Windows 10/11',  devices: 4 },
    { name: 'KB5035853 — Cumulative Update',        classification: 'Importante', osType: 'Windows Server', devices: 3 },
    { name: 'KB5034123 — .NET Framework Update',    classification: 'Moderada',   osType: 'Windows 10',     devices: 2 },
    { name: 'macOS Sonoma 14.3.1 Security',         classification: 'Crítica',    osType: 'macOS',          devices: 1 },
    { name: 'Ubuntu 22.04.4 LTS Kernel Update',     classification: 'Importante', osType: 'Linux Ubuntu',   devices: 2 },
  ];

  deviceRows: DeviceRow[] = [
    { name: 'SRV-PROD-01',    type: 'Servidor', site: 'Datacenter',      folder: 'Servidores', lastLogin: 'Hace 5m',  availability: 'en línea',      lastScan: 'Hace 1h',  patchesAvailable: 8, restartPending: true,  softwareUpdates: 2 },
    { name: 'DESKTOP-MR002',  type: 'PC',       site: 'Oficina Central', folder: 'Ventas',     lastLogin: 'Hace 10m', availability: 'en línea',      lastScan: 'Hace 2h',  patchesAvailable: 5, restartPending: false, softwareUpdates: 1 },
    { name: 'DESKTOP-SC005',  type: 'PC',       site: 'Oficina Central', folder: 'RRHH',       lastLogin: 'Hace 15m', availability: 'en línea',      lastScan: 'Hace 3h',  patchesAvailable: 4, restartPending: true,  softwareUpdates: 0 },
    { name: 'SRV-BACKUP-01',  type: 'Servidor', site: 'Datacenter',      folder: 'Servidores', lastLogin: 'Hace 2h',  availability: 'fuera de línea',lastScan: 'Hace 6h',  patchesAvailable: 3, restartPending: false, softwareUpdates: 3 },
    { name: 'DESKTOP-JL004',  type: 'PC',       site: 'Oficina Norte',   folder: 'TI',         lastLogin: 'Hace 1d',  availability: 'fuera de línea',lastScan: 'Hace 1d',  patchesAvailable: 2, restartPending: false, softwareUpdates: 0 },
    { name: 'LINUX-PG003',    type: 'Linux',    site: 'Remoto',          folder: 'DevOps',     lastLogin: 'Hace 1m',  availability: 'en línea',      lastScan: 'Hace 30m', patchesAvailable: 1, restartPending: false, softwareUpdates: 2 },
  ];

  patchRows: PatchRow[] = [
    { name: 'KB5034441 — Windows Security Update',  osType: 'Windows 10/11',  classification: 'Crítica',    products: 'Windows 10, 11',    size: '245 MB', cves: 3, cvss: 9.8, restartRequired: true,  devices: 4 },
    { name: 'KB5035853 — Cumulative Update',         osType: 'Windows Server', classification: 'Importante', products: 'Windows Server',    size: '1.2 GB', cves: 1, cvss: 7.5, restartRequired: true,  devices: 3 },
    { name: 'KB5034123 — .NET Framework 4.8',        osType: 'Windows 10',     classification: 'Moderada',   products: '.NET Framework',    size: '89 MB',  cves: 0, cvss: 5.2, restartRequired: false, devices: 2 },
    { name: 'macOS Sonoma 14.3.1',                   osType: 'macOS',          classification: 'Crítica',    products: 'macOS Sonoma',      size: '3.1 GB', cves: 5, cvss: 9.1, restartRequired: true,  devices: 1 },
    { name: 'Ubuntu Kernel 6.5.0-26',               osType: 'Linux Ubuntu',   classification: 'Importante', products: 'Ubuntu 22.04 LTS',  size: '120 MB', cves: 2, cvss: 7.8, restartRequired: true,  devices: 2 },
  ];

  get filteredDevices(): DeviceRow[] {
    return this.deviceRows.filter(d =>
      d.name.toLowerCase().includes(this.searchDevices.toLowerCase()) ||
      d.site.toLowerCase().includes(this.searchDevices.toLowerCase())
    );
  }

  get filteredPatches(): PatchRow[] {
    return this.patchRows.filter(p =>
      p.name.toLowerCase().includes(this.searchPatches.toLowerCase())
    );
  }

  typeIcon(t: string): string {
    return { PC: 'lucide:monitor', Servidor: 'lucide:server', Mac: 'lucide:laptop', Linux: 'lucide:terminal' }[t] ?? 'lucide:monitor';
  }

  classColor(c: string): string {
    return { Crítica: '#ef4444', Importante: '#f97316', Moderada: '#f59e0b', Baja: '#22c55e' }[c] ?? '#888';
  }

  classBg(c: string): string {
    return { Crítica: 'rgba(239,68,68,0.12)', Importante: 'rgba(249,115,22,0.12)', Moderada: 'rgba(245,158,11,0.12)', Baja: 'rgba(34,197,94,0.12)' }[c] ?? '';
  }

  availColor(a: string): string {
    return a === 'en línea' ? '#315ff4' : '#9aa5b4';
  }

  get patchPercent(): number {
    const total   = this.osStats.reduce((a, s) => a + s.total, 0);
    const patched = this.osStats.reduce((a, s) => a + s.patched, 0);
    return total > 0 ? Math.round((patched / total) * 100) : 0;
  }

  get totalDevices(): number { return this.osStats.reduce((a, s) => a + s.total, 0); }
  get patchedDevices(): number { return this.osStats.reduce((a, s) => a + s.patched, 0); }

  setPatchesTab(tab: 'disponibles' | 'fallidos' | 'instalados') {
    this.patchesSubTab = tab;
    this.showPatchesDropdown = false;
    this.activeTab = 'parches';
  }
}
