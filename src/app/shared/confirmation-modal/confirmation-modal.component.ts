import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'confirmation-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirmation-modal.component.html',
  styleUrl: './confirmation-modal.component.css',
})
export class ConfirmationModalComponent {
  @Input({ required: true }) isConfirmationModalOpen!: boolean;
  @Input({ required: true }) confirmationType!: string;
  @Input({ required: true }) assetId!: string;

  @Output()
  confirmAction = new EventEmitter();
  isActionConfirmed: boolean = false;

  userAction(isActionConfirmed: boolean) {
    this.isActionConfirmed = isActionConfirmed;
    this.confirmAction.emit({
      action: this.isActionConfirmed,
      id: this.assetId,
    });
  }
}
