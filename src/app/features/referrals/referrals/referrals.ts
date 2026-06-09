import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-referrals',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule
  ],
  templateUrl: './referrals.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Referrals {
  email = '';
  linkUnlocked = false;
  referralLink = '';

  unlockLink() {
    if (this.email && this.email.includes('@')) {
      this.referralLink = `https://gestion.app/ref/${btoa(this.email).slice(0, 10)}`;
      this.linkUnlocked = true;
    }
  }

  copyLink() {
    navigator.clipboard.writeText(this.referralLink);
  }

  steps = [
    {
      icon: 'lucide:unlock',
      title: 'Desbloquea tu enlace',
      description: 'Ingresa tu email para obtener tu enlace de referido único',
    },
    {
      icon: 'lucide:share-2',
      title: 'Comparte con amigos',
      description: 'Copia tu enlace de referido y compártelo con tus amigos',
    },
    {
      icon: 'lucide:gift',
      title: 'Obtén recompensas',
      description: null,
      rewards: [
        { position: '1ro', amount: '$250' },
        { position: '3ro', amount: '$350' },
        { position: '5to+', amount: '$500' },
      ],
    },
  ];
}