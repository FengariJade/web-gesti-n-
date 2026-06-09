import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface App {
  name: string;
  category: string;
  description: string;
  icon: string;
  iconBg: string;
  badge?: 'by-atera' | 'new';
  downloads?: string;
  trialDays?: number;
}

@Component({
  selector: 'app-app-center',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule
  ],
  templateUrl: './app-center.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppCenter {

  searchQuery = '';
  selectedCategory = 'todas';

  categories = ['todas', 'Productivity', 'Backup', 'Security', 'Remote Access', 'Network Monitoring', 'Sales Enablement'];

  apps: App[] = [
    { name: 'AI Copilot',          category: 'Productivity',        icon: 'lucide:sparkles',       iconBg: 'linear-gradient(135deg,#a855f7,#6366f1)', badge: 'new',  trialDays: 14,  description: 'Maximize team efficiency, ensuring superior support with new levels of speed and consistency powered by your AI companion.' },
    { name: 'Acronis',             category: 'Backup',              icon: 'lucide:shield',          iconBg: '#1a1a2e',                                 downloads: '3.4K',  trialDays: 30,  description: 'Backup and cyber protection software featuring flexible storage, instant restore, data protection mapping, anti-malware recovery, and more.' },
    { name: 'Axcient',             category: 'Backup',              icon: 'lucide:database-backup', iconBg: '#ea580c',                                 downloads: '3.4K',  trialDays: 30,  description: 'Beat ransomware, cyberattacks, human error, and natural disasters with an industry-leading business continuity and disaster recovery (BCDR) solution.' },
    { name: 'Bitdefender',         category: 'Security',            icon: 'lucide:shield-check',    iconBg: '#dc2626',                                 downloads: '4.1K',  trialDays: 45,  description: 'Advanced cybersecurity protection - plus a ton of powerful add-ons! - that detects and neutralizes any threats to your end users\' devices.' },
    { name: 'Vicarius',            category: 'Security',            icon: 'lucide:eye',             iconBg: '#0f0f0f',                                 downloads: '3.9K',  trialDays: 14,  description: 'Stay ahead of vulnerabilities with real-time detection and automated remediation — powered by advanced patching, scripting, and CVE threat...' },
    { name: 'ThreatDown',          category: 'Security',            icon: 'lucide:shield-alert',    iconBg: '#1e3a5f',                                 downloads: '2.1K',  trialDays: 15,  description: 'Streamline endpoint security management, including subscriptions, role-based access, reporting, add-on modules, and more.' },
    { name: 'Splashtop Premium',   category: 'Remote Access',       icon: 'lucide:monitor-play',    iconBg: '#0ea5e9',                                 badge: 'new',       trialDays: 7,   description: 'Enhance your Splashtop experience with advanced features and customizable settings, for unmatched control and performance.' },
    { name: 'Splashtop SOS',       category: 'Remote Access',       icon: 'lucide:life-buoy',       iconBg: '#0284c7',                                 badge: 'new',       trialDays: 14,  description: 'Deliver on-demand remote support to unmonitored devices with quick, secure connections to resolve issues fast.' },
    { name: 'Work From Home',      category: 'Remote Access',       icon: 'lucide:home',            iconBg: '#0ea5e9',                                 badge: 'new',  trialDays: 7,   description: 'Ensure minimum disruption to regular work processes by enabling your customers to work from home!' },
    { name: 'Webroot',             category: 'Security',            icon: 'lucide:lock',            iconBg: '#16a34a',                                 downloads: '9.8K',                  description: 'Cloud-based endpoint protection and real-time blocking of unwanted internet domain requests plus Security Awareness Training (SAT).' },
    { name: 'Emsisoft',            category: 'Security',            icon: 'lucide:shield',          iconBg: '#1d4ed8',                                                   trialDays: 30,  description: 'Protect and manage your Windows devices with a lightweight, dual-engine security solution designed for employee home networks and office endpoints.' },
    { name: 'Ironscales',          category: 'Security',            icon: 'lucide:mail-check',      iconBg: '#1e40af',                                                   trialDays: 30,  description: 'An AI-driven, anti-phishing email security platform which continuously detects and resolves threats that slip through traditional defenses.' },
    { name: 'Zomentum',            category: 'Sales Enablement',    icon: 'lucide:trending-up',     iconBg: '#f0f0f0',                                                   trialDays: 30,  description: 'Transform your sales, marketing, and customer service operations with Zomentum\'s powerful and intuitive CRM platform.' },
    { name: 'Cynet',               category: 'Security',            icon: 'lucide:scan-eye',        iconBg: '#ec4899',                                 downloads: '14K',   trialDays: 14,  description: 'Resource-lite cybersecurity that is fast to deploy, easy to use, and provides stellar protection across endpoints, networks, users, and SaaS applications.' },
    { name: 'Network Discovery',   category: 'Network Monitoring',  icon: 'lucide:network',         iconBg: '#7c3aed',                                 badge: 'new',  downloads: '22.4K', trialDays: 14, description: 'Network Discovery provides automated security scans for complete, real-time visibility of your end-user networks and devices.' },
    { name: 'Keeper',              category: 'Security',            icon: 'lucide:key-round',       iconBg: '#d97706',                                 downloads: '5.2K',  trialDays: 14,  description: 'Keeper Security provides easy-to-use zero-trust cybersecurity for passwords, secrets, and confidential information.' },
    { name: 'Domotz',             category: 'Network Monitoring',  icon: 'lucide:activity',        iconBg: '#0f172a',                                                   trialDays: 14,  description: 'Monitor and manage your networks, IT infrastructure, and devices in real time with Domotz\' powerful and user-friendly platform.' },
  ];

  get filtered(): App[] {
    return this.apps.filter(a => {
      const matchSearch   = a.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                            a.category.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                            a.description.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchCategory = this.selectedCategory === 'todas' || a.category === this.selectedCategory;
      return matchSearch && matchCategory;
    });
  }
}