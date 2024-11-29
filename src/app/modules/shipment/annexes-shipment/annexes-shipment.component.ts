import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ShipmentAnnexes } from '../../../models/shipment-annexes';
import { ShipmentService } from '../../../services/shipment.service';
import { MessageService } from 'primeng/api';
import { ConfirmDialogService } from '../../../services/confirm-dialog.service';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import { UploadModalComponent } from '../../../modals/upload-modal/upload-modal.component';

@Component({
  selector: 'app-annexes-shipment',
  standalone: true,
  imports: [
    TableModule,
    NgClass,
    ButtonModule,
    ConfirmDialogComponent,
    UploadModalComponent,
  ],
  templateUrl: './annexes-shipment.component.html',
  styleUrl: './annexes-shipment.component.scss'
})
export class AnnexesShipmentComponent {
  private readonly shipmentService = inject(ShipmentService);
  private readonly messageService = inject(MessageService);
  private readonly confirmDialogService = inject(ConfirmDialogService);

  public selectedAttachment!: ShipmentAnnexes;

  public annexList = toSignal(this.shipmentService.getShipmentAttachments(), {
    initialValue: [],
  });

  public isUploadModalVisible: boolean = false;

  public openAttachment(attachment: ShipmentAnnexes) {
    //todo: realizar el método para ver el documento.
    this.messageService.add({
      severity: 'success',
      summary: `${attachment.fileName}`,
      detail: 'Estás viendo el documento'
    })
  }

  public showConfirmDialog(event: Event, action: string) {
    this.confirmDialogService.showConfirm(action, event);
  }

  public openUploadModal() {
    this.isUploadModalVisible = true; // Abrir el modal
  }

  public handleFilesUploaded(files: File[]) {
    // Manejar archivos subidos desde el componente hijo
    console.log('Archivos subidos:', files);
    this.messageService.add({
      severity: 'info',
      summary: 'Archivos recibidos',
      detail: `${files.length} archivos subidos`
    });
  }

  public handleModalClosed() {
    this.isUploadModalVisible = false; // Cerrar el modal cuando se notifique desde el hijo
  }
}
