import { Component, EventEmitter, Input, Output, output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manage-address-modal',
  standalone: true,
  imports: [
    ButtonModule,
    ModalComponent,
    CommonModule,
  ],
  templateUrl: './manage-address-modal.component.html',
  styleUrl: './manage-address-modal.component.scss'
})
export class ManageAddressModalComponent {
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
