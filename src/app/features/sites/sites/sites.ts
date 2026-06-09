import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Site {
  id: number;
  name: string;
  country: string;
  region: string;
  phone: string;
  address: string;
  contact: string;
  contactPhone: string;
  devicesUnmanaged: number;
}

@Component({
  selector: 'app-sites',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
  ],
  templateUrl: './sites.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Sites {

  searchQuery = '';
  selectedCountry = 'todos';
  selectedRegion = 'todas';
  selectedSite: Site | null = null;

  countries = ['todos', 'Perú', 'Colombia', 'México', 'Argentina'];
  regions   = ['todas', 'Lima', 'Bogotá', 'CDMX', 'Buenos Aires', 'Arequipa'];

  sites: Site[] = [
    { id: 1,  name: 'Oficina Central',     country: 'Perú',      region: 'Lima',          phone: '+51 1 234-5678',  address: 'Av. Javier Prado 1234, San Isidro',   contact: 'Ana García',    contactPhone: '987-654-321', devicesUnmanaged: 0  },
    { id: 2,  name: 'Datacenter Lima',     country: 'Perú',      region: 'Lima',          phone: '+51 1 876-5432',  address: 'Av. La Marina 567, San Miguel',        contact: 'Miguel Ruiz',   contactPhone: '976-543-210', devicesUnmanaged: 2  },
    { id: 3,  name: 'Oficina Norte',       country: 'Perú',      region: 'Arequipa',      phone: '+51 54 111-2233', address: 'Calle Mercaderes 890, Arequipa',       contact: 'Laura Pérez',   contactPhone: '965-432-109', devicesUnmanaged: 1  },
    { id: 4,  name: 'Sede Bogotá',         country: 'Colombia',  region: 'Bogotá',        phone: '+57 1 999-8877',  address: 'Carrera 15 #88-64, Chapinero',         contact: 'Carlos Ruiz',   contactPhone: '310-555-0001', devicesUnmanaged: 0 },
    { id: 5,  name: 'Oficina México DF',   country: 'México',    region: 'CDMX',          phone: '+52 55 1234-5678',address: 'Paseo de la Reforma 222, Cuauhtémoc',  contact: 'Sofía Castro',  contactPhone: '55-9876-5432', devicesUnmanaged: 3 },
    { id: 6,  name: 'Sede Buenos Aires',   country: 'Argentina', region: 'Buenos Aires',  phone: '+54 11 4321-0987',address: 'Av. Corrientes 1500, CABA',            contact: 'Pablo García',  contactPhone: '11-9876-5432', devicesUnmanaged: 0 },
  ];

  get filtered(): Site[] {
    return this.sites.filter(s => {
      const matchSearch  = s.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                           s.contact.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchCountry = this.selectedCountry === 'todos' || s.country === this.selectedCountry;
      const matchRegion  = this.selectedRegion  === 'todas' || s.region  === this.selectedRegion;
      return matchSearch && matchCountry && matchRegion;
    });
  }

  open(site: Site) { this.selectedSite = site; }
  close() { this.selectedSite = null; }
}