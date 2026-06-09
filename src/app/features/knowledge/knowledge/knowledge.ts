import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Article {
  id: number;
  title: string;
  category: string;
  author: string;
  authorInitials: string;
  authorColor: string;
  views: number;
  helpful: number;
  status: 'publicado' | 'borrador' | 'archivado';
  updated: string;
  tags: string[];
  content: string;
}

@Component({
  selector: 'app-knowledge',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './knowledge.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Knowledge{

  searchQuery = '';
  selectedCategory = 'todas';
  selectedStatus = 'todos';
  selectedArticle: Article | null = null;
  viewMode: 'grid' | 'list' = 'grid';

  categories = ['todas', 'Hardware', 'Software', 'Red', 'Seguridad', 'Servidor', 'General'];
  statuses   = ['todos', 'publicado', 'borrador', 'archivado'];

  articles: Article[] = [
    {
      id: 1, title: 'Cómo resetear contraseña de Windows', category: 'Software',
      author: 'Ana García', authorInitials: 'AG', authorColor: '#315ff4',
      views: 342, helpful: 89, status: 'publicado', updated: 'Hace 2d',
      tags: ['windows', 'contraseña', 'acceso'],
      content: 'Para resetear la contraseña de Windows, accede al modo de recuperación presionando F8 al inicio...'
    },
    {
      id: 2, title: 'Configurar VPN en Windows 11', category: 'Red',
      author: 'Miguel Ruiz', authorInitials: 'MR', authorColor: '#8b5cf6',
      views: 218, helpful: 74, status: 'publicado', updated: 'Hace 5d',
      tags: ['vpn', 'red', 'windows11'],
      content: 'Para configurar una conexión VPN en Windows 11, ve a Configuración > Red > VPN...'
    },
    {
      id: 3, title: 'Solución a pantalla azul BSOD', category: 'Hardware',
      author: 'Jade Velez', authorInitials: 'JV', authorColor: '#315ff4',
      views: 501, helpful: 92, status: 'publicado', updated: 'Hace 1s',
      tags: ['bsod', 'hardware', 'error'],
      content: 'La pantalla azul de la muerte (BSOD) puede ser causada por drivers desactualizados...'
    },
    {
      id: 4, title: 'Configuración de firewall corporativo', category: 'Seguridad',
      author: 'Pablo García', authorInitials: 'PG', authorColor: '#ef4444',
      views: 156, helpful: 67, status: 'publicado', updated: 'Hace 1s',
      tags: ['firewall', 'seguridad', 'red'],
      content: 'Para configurar el firewall corporativo, accede al panel de administración...'
    },
    {
      id: 5, title: 'Instalación de impresoras en red', category: 'Hardware',
      author: 'Laura Pérez', authorInitials: 'LP', authorColor: '#d97706',
      views: 289, helpful: 81, status: 'publicado', updated: 'Hace 3d',
      tags: ['impresora', 'red', 'hardware'],
      content: 'Para instalar una impresora en red, primero verifica que esté encendida y conectada...'
    },
    {
      id: 6, title: 'Backup automático con Windows Server', category: 'Servidor',
      author: 'Miguel Ruiz', authorInitials: 'MR', authorColor: '#8b5cf6',
      views: 134, helpful: 58, status: 'publicado', updated: 'Hace 1s',
      tags: ['backup', 'servidor', 'windows-server'],
      content: 'Para configurar backups automáticos en Windows Server, abre el Administrador del servidor...'
    },
    {
      id: 7, title: 'Guía de onboarding para nuevos usuarios', category: 'General',
      author: 'Ana García', authorInitials: 'AG', authorColor: '#315ff4',
      views: 445, helpful: 96, status: 'publicado', updated: 'Hace 1s',
      tags: ['onboarding', 'usuarios', 'guía'],
      content: 'Bienvenido al equipo. En esta guía encontrarás todo lo que necesitas para empezar...'
    },
    {
      id: 8, title: 'Políticas de seguridad de contraseñas', category: 'Seguridad',
      author: 'Pablo García', authorInitials: 'PG', authorColor: '#ef4444',
      views: 203, helpful: 71, status: 'borrador', updated: 'Hace 4d',
      tags: ['seguridad', 'contraseñas', 'políticas'],
      content: 'Las contraseñas deben tener al menos 12 caracteres, incluir mayúsculas, números y símbolos...'
    },
    {
      id: 9, title: 'Resolución de problemas de red Wi-Fi', category: 'Red',
      author: 'Jade Velez', authorInitials: 'JV', authorColor: '#315ff4',
      views: 378, helpful: 85, status: 'publicado', updated: 'Hace 6d',
      tags: ['wifi', 'red', 'troubleshooting'],
      content: 'Si tienes problemas con la conexión Wi-Fi, sigue estos pasos de diagnóstico...'
    },
    {
      id: 10, title: 'Manual de uso del sistema de tickets', category: 'General',
      author: 'Laura Pérez', authorInitials: 'LP', authorColor: '#d97706',
      views: 167, helpful: 62, status: 'archivado', updated: 'Hace 2s',
      tags: ['tickets', 'soporte', 'manual'],
      content: 'El sistema de tickets permite registrar y dar seguimiento a incidencias técnicas...'
    },
  ];

  get filtered(): Article[] {
    return this.articles.filter(a => {
      const matchSearch   = a.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                            a.tags.some(t => t.includes(this.searchQuery.toLowerCase()));
      const matchCategory = this.selectedCategory === 'todas'  || a.category === this.selectedCategory;
      const matchStatus   = this.selectedStatus   === 'todos'  || a.status   === this.selectedStatus;
      return matchSearch && matchCategory && matchStatus;
    });
  }

  get stats() {
    return {
      total:      this.articles.length,
      publicados: this.articles.filter(a => a.status === 'publicado').length,
      borradores: this.articles.filter(a => a.status === 'borrador').length,
      vistas:     this.articles.reduce((acc, a) => acc + a.views, 0),
    };
  }

  statusColor(s: string): string {
    return { publicado: '#315ff4', borrador: '#f59e0b', archivado: '#9aa5b4' }[s] ?? '#888';
  }

  statusBg(s: string): string {
    return { publicado: 'rgba(0,196,94,0.12)', borrador: 'rgba(245,158,11,0.12)', archivado: 'rgba(154,165,180,0.12)' }[s] ?? '';
  }

  categoryIcon(c: string): string {
    return {
      Hardware: 'lucide:cpu', Software: 'lucide:app-window', Red: 'lucide:network',
      Seguridad: 'lucide:shield', Servidor: 'lucide:server', General: 'lucide:book-open'
    }[c] ?? 'lucide:file-text';
  }

  open(article: Article) { this.selectedArticle = article; }
  close() { this.selectedArticle = null; }

  get popular(): Article[] {
    return [...this.articles]
      .filter(a => a.status === 'publicado')
      .sort((a, b) => b.views - a.views)
      .slice(0, 5);
  }

  get recent(): Article[] {
    return [...this.articles]
      .filter(a => a.status === 'publicado')
      .slice(0, 4);
  }

  get allTags(): string[] {
    const tags = this.articles.flatMap(a => a.tags);
    return [...new Set(tags)];
  }
}