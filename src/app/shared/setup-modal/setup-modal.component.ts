import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-setup-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './setup-modal.component.html',
  styleUrl: './setup-modal.component.css',
})
export class SetupModalComponent {
  @Input() isSetupModalOpen: boolean = false;
  @Input() supabaseUrl: string = '';
  @Input() supabaseKey: string = '';

  @Output() supabaseUrlChange = new EventEmitter<string>();
  @Output() supabaseKeyChange = new EventEmitter<string>();
  @Output() toggleSetupModal = new EventEmitter();

  supabaseIconUrl: string =
    'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/webp/supabase.webp';

  closeModal() {
    this.toggleSetupModal.emit();
  }

  saveSupabaseConfig() {
    console.log(this.supabaseUrl, this.supabaseKey);
    this.supabaseKeyChange.emit(this.supabaseKey);
    this.supabaseUrlChange.emit(this.supabaseUrl);
    this.toggleSetupModal.emit();
  }
}
