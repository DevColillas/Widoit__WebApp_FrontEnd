import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { FileUploadEvent, FileUploadModule } from 'primeng/fileupload';
import { ModalComponent } from '../../shared/components/modal/modal.component';

interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

@Component({
  selector: 'app-upload-modal',
  standalone: true,
  imports: [
    CommonModule,
    DialogModule,
    FileUploadModule,
    ModalComponent,
  ],
  templateUrl: './upload-modal.component.html',
  styleUrl: './upload-modal.component.scss'
})
export class UploadModalComponent {
  @Input() visible = false //for modal
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() filesUploaded = new EventEmitter<File[]>(); // Emitir archivos subidos al padre

  private readonly messageService = inject(MessageService);

  uploadedFiles: any[] = [];

 public onUpload(event: FileUploadEvent) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }

    this.messageService.add({ severity: 'info', summary: 'File Uploaded', detail: '' });
    this.filesUploaded.emit(this.uploadedFiles);
  }

  public onProgress(event: any) {
    console.log('Progress:', event);
    // Aquí puedes ver el porcentaje y manejar el progreso si es necesario
  }

  //global for all modals buttons
  public onCancel() {
    this.closeModal();
  }

  private hideModal() {
    this.visible = false;
    this.visibleChange.emit(this.visible); // Emit the change to close the modal
  }

  private closeModal() {
    this.hideModal();
  }
}
