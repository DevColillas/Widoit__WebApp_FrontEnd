import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmDialogService } from '../../../services/confirm-dialog.service';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ConfirmDialogModule,
    ButtonModule,
  ],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.scss'
})
export class ConfirmDialogComponent {
  @Input() message: string = '';
  @Input() header: string = '';
  @Input() icon: string = '';
  @Input() acceptButtonStyleClass: string = '';
  @Input() rejectButtonStyleClass: string = '';
  @Input() target: EventTarget | null = null;
  @Input() acceptLabel: string = '';
  @Input() rejectLabel: string = '';
  @Output() onAccept = new EventEmitter<void>();
  @Output() onReject = new EventEmitter<void>();

  private readonly confirmationService = inject(ConfirmationService);

  constructor(private confirmDialogService: ConfirmDialogService) {
    this.confirmDialogService.registerComponent(this);
  }

  public showConfirmDialog() {
    this.confirmationService.confirm({
      target: this.target as EventTarget,
      message: this.message,
      header: this.header,
      icon: this.icon,
      acceptButtonStyleClass: this.acceptButtonStyleClass,
      rejectButtonStyleClass: this.rejectButtonStyleClass,
      acceptLabel: this.acceptLabel,
      rejectLabel: this.rejectLabel,
      acceptIcon: 'pi pi-save mr-2',
      rejectIcon: 'none',
      accept: () => {
        this.onAccept.emit();
      },
      reject: () => {
        this.onReject.emit();
      }
    });
  }
}
