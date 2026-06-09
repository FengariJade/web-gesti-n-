import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {

  theme = signal<'light' | 'dark'>('light');

  toggle() {
    this.theme.set(this.theme() === 'light' ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', this.theme());
  }

  init() {
    const saved = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const preferred = saved ?? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    this.theme.set(preferred);
    document.documentElement.setAttribute('data-theme', preferred);
  }

  save() {
    localStorage.setItem('theme', this.theme());
  }
}