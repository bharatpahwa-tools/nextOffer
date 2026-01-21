import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  @Input() activetab!: string;
  @Input() isSetupModalOpen: boolean = false;

  @Output() activetabChange = new EventEmitter<string>();
  @Output() toggleSetupModal = new EventEmitter<boolean>();

  supabaseUrl: string = localStorage.getItem('supabaseUrl') || '';
  supabaseKey: string = localStorage.getItem('supabaseKey') || '';

  changeTab(tab: string) {
    this.activetabChange.emit(tab);
  }

  isDarkMode = false;
  isMobileMenuOpen = false;

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    document.documentElement.classList.toggle('light');
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  openModal() {
    this.toggleSetupModal.emit(true);
  }

  title = 'NextOffer';
  logoUrl = 'assets/images/nextOfferLogo.png';

  navitems: { title: string; path: string }[] = [
    {
      title: 'Dashboard',
      path: '/dashboard',
    },
    {
      title: 'Timeline',
      path: '/timeline',
    },
    {
      title: 'Jobs',
      path: '/jobs',
    },
    {
      title: 'Skills',
      path: '/skills',
    },
  ];
}
