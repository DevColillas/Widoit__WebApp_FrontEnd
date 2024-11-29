import { Component, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ShipmentService } from '../../../services/shipment.service';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-dynamic-button-group',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule
  ],
  templateUrl: './dynamic-button-group.component.html',
  styleUrl: './dynamic-button-group.component.scss'
})
export class DynamicButtonGroupComponent {
  // Usamos un setter para manejar los cambios en el input 'statuses'
  private _statuses: string[] = [];
  private _documentNumber: string = '';

  @Input() isDashboard: boolean = true;

  @Input()
  set statuses(value: string[]) {
    // Solo actualizamos si los valores de 'statuses' han cambiado
    if (value === undefined) return;
    this._statuses = value;
    this.buttons = this.isDashboard
      ? this.getDashboardButtons(this._statuses)
      : this.getShipmentButtons(this._statuses);
  }

  @Input()
  set selectedDocumentNumber(value: string) {
    if (value === undefined) return;
    this._documentNumber = value;
  }

  // Propiedad para almacenar los botones generados
  public buttons: any[] = [];

  private readonly shipmentService = inject(ShipmentService);

  private getDashboardButtons(statuses: string[]): any[] {
    const hasDraft = statuses.includes('Borrador');
    const hasPlanned = statuses.includes('Planificado');
    const hasCompleted = statuses.includes('Completado');
    const hasIncompleted = statuses.includes('Incompleto');
    const multipleSelection = statuses.length > 1;
    //multiseleccion
    const isAllDraft = statuses.every((status) => status === 'Borrador');
    const isAllPlanned = statuses.every((status) => status === 'Planificado');
    const isAllCompleted = statuses.every((status) => status === 'Completado');
    const isAllIncompleted = statuses.every((status) => status === 'Incompleto');

    const isDraftAndPlanned =
      statuses.includes('Borrador') &&
      statuses.includes('Planificado') &&
      statuses.every((status) => status === 'Borrador' || status === 'Planificado');
    const hasOtherStatus = !isAllDraft && !isAllPlanned && !isDraftAndPlanned;
    let buttons: any[] = [];

    if (multipleSelection) {
      if (hasOtherStatus) {
        buttons = [
          { label: 'Enviar', icon: 'pi pi-send', action: () => this.shipmentService.sendShipment() },
        ];
      } else if (isDraftAndPlanned) {
        buttons = [
          { label: 'Asignar Conductor', icon: 'pi pi-user-plus', action: () => this.shipmentService.assignDriver() },
          { label: 'Adjuntar', icon: 'pi pi-paperclip', action: () => this.shipmentService.attachFile() },
          { label: 'Enviar', icon: 'pi pi-send', action: () => this.shipmentService.sendShipment() },
        ];
      } if (isAllDraft) {
        buttons = [
          { label: 'Eliminar', icon: 'pi pi-trash', action: () => this.shipmentService.deleteShipment() },
          { label: 'Asignar Conductor', icon: 'pi pi-user-plus', action: () => this.shipmentService.assignDriver() },
          { label: 'Adjuntar', icon: 'pi pi-paperclip', action: () => this.shipmentService.attachFile() },
          { label: 'Enviar', icon: 'pi pi-send', action: () => this.shipmentService.sendShipment() },
        ];
      } else if (isAllCompleted) {
        buttons = [
          { label: 'Enviar', icon: 'pi pi-send', action: () => this.shipmentService.sendShipment() },
        ];
      } else if (isAllPlanned) {
        buttons = [
          { label: 'Incompleto', icon: 'pi pi-eye-slash', action: () => this.shipmentService.maskAsIncomplete() },
          { label: 'Asignar Conductor', icon: 'pi pi-user-plus', action: () => this.shipmentService.assignDriver() },
          { label: 'Adjuntar', icon: 'pi pi-paperclip', action: () => this.shipmentService.attachFile() },
          { label: 'Enviar', icon: 'pi pi-send', action: () => this.shipmentService.sendShipment() },
        ];
      } else if (isAllIncompleted) {
        buttons = [
          { label: 'Recuperar', icon: 'pi pi-undo', action: () => this.shipmentService.recoverShipment() },
          { label: 'Enviar', icon: 'pi pi-send', action: () => this.shipmentService.sendShipment() },
        ];
      }
    } else {
      if (hasDraft) {
        buttons = [
          { label: 'Eliminar', icon: 'pi pi-trash', action: () => this.shipmentService.deleteShipment() },
          { label: 'Asignar Conductor', icon: 'pi pi-user-plus', action: () => this.shipmentService.assignDriver() },
          { label: 'Adjuntar', icon: 'pi pi-paperclip', action: () => this.shipmentService.attachFile() },
          { label: 'Duplicar', icon: 'pi pi-copy', action: () => this.shipmentService.duplicateShipment() },
          { label: 'Enviar', icon: 'pi pi-send', action: () => this.shipmentService.sendShipment() },
          { label: 'Detalles', icon: 'pi pi-eye', action: () => this.shipmentService.shipmentDetails(this._documentNumber) },
        ];
      } else if (hasPlanned) {
        buttons = [
          { label: 'Incompleto', icon: 'pi pi-eye-slash', action: () => this.shipmentService.maskAsIncomplete() },
          { label: 'Asignar Conductor', icon: 'pi pi-user', action: () => this.shipmentService.assignDriver() },
          { label: 'eDoc', icon: 'pi pi-file', action: () => this.shipmentService.viewDocument() },
          { label: 'Adjuntar', icon: 'pi pi-paperclip', action: () => this.shipmentService.attachFile() },
          { label: 'Duplicar', icon: 'pi pi-copy', action: () => this.shipmentService.duplicateShipment() },
          { label: 'Enviar', icon: 'pi pi-send', action: () => this.shipmentService.sendShipment() },
          { label: 'Detalles', icon: 'pi pi-eye', action: () => this.shipmentService.shipmentDetails(this._documentNumber) },
        ];
      } else if (hasCompleted) {
        buttons = [
          { label: 'eDoc', icon: 'pi pi-file', action: () => this.shipmentService.viewDocument() },
          { label: 'Adjuntar', icon: 'pi pi-paperclip', action: () => this.shipmentService.attachFile() },
          { label: 'Duplicar', icon: 'pi pi-copy', action: () => this.shipmentService.duplicateShipment() },
          { label: 'Enviar', icon: 'pi pi-send', action: () => this.shipmentService.sendShipment() },
          { label: 'Detalles', icon: 'pi pi-eye', action: () => this.shipmentService.shipmentDetails(this._documentNumber) },
        ]
      } else if (hasIncompleted) {
        buttons = [
          { label: 'Recuperar', icon: 'pi pi-undo', action: () => this.shipmentService.recoverShipment() },
          { label: 'eDoc', icon: 'pi pi-file', action: () => this.shipmentService.viewDocument() },
          { label: 'Duplicar', icon: 'pi pi-copy', action: () => this.shipmentService.duplicateShipment() },
          { label: 'Enviar', icon: 'pi pi-send', action: () => this.shipmentService.sendShipment() },
          { label: 'Detalles', icon: 'pi pi-eye', action: () => this.shipmentService.shipmentDetails(this._documentNumber) },
        ];
      }
    }

    return buttons;
  }

  private getShipmentButtons(statuses: string[]): any[] {
    const hasDraft = statuses.includes('Borrador');
    const hasPlanned = statuses.includes('Planificado');
    const hasCompleted = statuses.includes('Completado');
    const hasIncompleted = statuses.includes('Incompleto');
    let buttons: any[] = [];

    if (hasDraft) {
      buttons = [
        { label: 'Guardar', icon: 'pi pi-save', action: () => this.shipmentService.saveChanges() },
        // { label: 'Cancela', icon: 'pi pi-times-circle', action: () => this.shipmentService.cancelChanges() }, //return to dashboard.
        { label: 'Planificar', icon: 'pi pi-check-circle', action: () => this.shipmentService.changeCrmStatusToPlanned() },
        { label: 'eliminar', icon: 'pi pi-trash', action: () => this.shipmentService.deleteShipment()},
      ];
    } else if (hasPlanned) {
      buttons = [
        { label: 'Guardar', icon: 'pi pi-save', action: () => this.shipmentService.saveChanges() },
        { label: 'eDoc', icon: 'pi pi-file', action: () => this.shipmentService.viewDocument() },
        { label: 'Enviar', icon: 'pi pi-send', action: () => this.shipmentService.sendShipment() },
        { label: 'Incompleto', icon: 'pi pi-delete-left', action: () => this.shipmentService.maskAsIncomplete() },
      ];
    } else if (hasCompleted) {
      buttons = [
        { label: 'Guardar', icon: 'pi pi-save', action: () => this.shipmentService.saveChanges() },
        { label: 'eDoc', icon: 'pi pi-file', action: () => this.shipmentService.viewDocument() },
        { label: 'Enviar', icon: 'pi pi-send', action: () => this.shipmentService.sendShipment() },
      ]
    } else if (hasIncompleted) {
      buttons = [
        { label: 'Duplicar', icon: 'pi pi-copy', action: () => this.shipmentService.duplicateShipment() },
        { label: 'eDoc', icon: 'pi pi-file', action: () => this.shipmentService.viewDocument() },
        { label: 'Recuperar', icon: 'pi pi-undo', action: () => this.shipmentService.recoverShipment() },
      ];
    }

    return buttons;
  }
}
