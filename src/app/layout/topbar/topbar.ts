import { Component, Input, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../core/services/themeService';


@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './topbar.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TopbarComponent {
  @Input() pageTitle    = 'Dashboard';
  @Input() pageSubtitle = 'Resumen general';

  themeService = inject(ThemeService);

  toggle() {
    this.themeService.toggle();
    this.themeService.save();
  }
}