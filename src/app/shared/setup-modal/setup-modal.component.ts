import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SupabaseService } from '../../core/services/supabase.service';

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
  @Input() isSupabaseReady: boolean = false;

  @Output() supabaseUrlChange = new EventEmitter<string>();
  @Output() supabaseKeyChange = new EventEmitter<string>();
  @Output() toggleSetupModal = new EventEmitter();

  constructor(private supabaseService: SupabaseService) {}

  supabaseIconUrl: string =
    'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/webp/supabase.webp';

  connectionStatus: 'idle' | 'testing' | 'success' | 'error' = 'idle';

  closeModal() {
    this.toggleSetupModal.emit();
  }

  async verifyConnection() {
    if (!this.supabaseUrl || !this.supabaseKey) return;

    this.connectionStatus = 'testing';
    const isConnected = await this.supabaseService.testConnection(
      this.supabaseUrl,
      this.supabaseKey,
    );

    this.connectionStatus = isConnected ? 'success' : 'error';
    if (this.connectionStatus === 'success') {
      this.isSupabaseReady = true;
    }
  }

  saveSupabaseConfig() {
    console.log(this.supabaseUrl, this.supabaseKey);
    this.supabaseKeyChange.emit(this.supabaseKey);
    this.supabaseUrlChange.emit(this.supabaseUrl);
    this.toggleSetupModal.emit();
  }
}
