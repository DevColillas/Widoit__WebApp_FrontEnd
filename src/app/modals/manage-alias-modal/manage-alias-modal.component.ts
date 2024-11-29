import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ModalComponent } from '../../shared/components/modal/modal.component';

@Component({
  selector: 'app-manage-alias-modal',
  standalone: true,
  imports: [
    DialogModule,
    ButtonModule,
    ModalComponent,
    CommonModule,
  ],
  templateUrl: './manage-alias-modal.component.html',
  styleUrl: './manage-alias-modal.component.scss'
})
export class ManageAliasModalComponent {
  @Input() visible = false //for modal
  @Output() visibleChange = new EventEmitter<boolean>();

  public onCancel() {
    this.closeModal();
  }

  private hideModal() {
    this.visible = false;
    this.visibleChange.emit(this.visible); // Emit the change to close the modal
  }

  public closeModal() {
    this.hideModal();
  }

}
