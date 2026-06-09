import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface NetworkSite {
  id: number;
  name: string;
  publicIp: string;
  network: string;
  workstations: number;
  snmp: number;
  analysisStatus: 'activo' | 'pendiente' | 'sin agente' | 'error';
}

@Component({
  selector: 'app-network-discovery',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule
  ],
  templateUrl: './network-discovery.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class NetworkDiscovery {

  searchQuery = '';
  openDropdownId: number | null = null;

  sites: NetworkSite[] = [
    { id: 1, name: 'Oficina Central',   publicIp: '190.41.23.15',  network: '192.168.1.0/24',  workstations: 24, snmp: 3, analysisStatus: 'activo'    },
    { id: 2, name: 'Datacenter Lima',   publicIp: '200.48.12.88',  network: '10.0.0.0/24',     workstations: 12, snmp: 8, analysisStatus: 'activo'    },
    { id: 3, name: 'Oficina Norte',     publicIp: '190.41.55.22',  network: '192.168.2.0/24',  workstations: 8,  snmp: 1, analysisStatus: 'pendiente' },
    { id: 4, name: 'Sede Bogotá',       publicIp: '181.129.44.10', network: '172.16.0.0/24',   workstations: 15, snmp: 2, analysisStatus: 'activo'    },
    { id: 5, name: 'Oficina México DF', publicIp: '201.122.33.77', network: '192.168.10.0/24', workstations: 20, snmp: 4, analysisStatus: 'error'     },
    { id: 6, name: 'Unassigned',        publicIp: '',              network: '',                workstations: 0,  snmp: 0, analysisStatus: 'sin agente' },
  ];

  get filtered(): NetworkSite[] {
    return this.sites.filter(s =>
      s.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      s.publicIp.includes(this.searchQuery) ||
      s.network.includes(this.searchQuery)
    );
  }

  statusColor(s: string): string {
    return { activo: '#315ff4', pendiente: '#f59e0b', 'sin agente': '#9aa5b4', error: '#ef4444' }[s] ?? '#888';
  }

  statusBg(s: string): string {
    return { activo: 'rgba(0,196,94,0.12)', pendiente: 'rgba(245,158,11,0.12)', 'sin agente': 'rgba(154,165,180,0.12)', error: 'rgba(239,68,68,0.12)' }[s] ?? '';
  }

  toggleDropdown(id: number, e: Event) {
    e.stopPropagation();
    this.openDropdownId = this.openDropdownId === id ? null : id;
  }

  closeDropdown() {
    this.openDropdownId = null;
  }
}
