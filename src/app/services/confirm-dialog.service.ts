import { EventEmitter, inject, Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ConfirmDialogComponent } from '../shared/components/confirm-dialog/confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmDialogService {
  private confirmDialogComponent?: ConfirmDialogComponent;
  private readonly messageService = inject(MessageService);

  // Manejo de eventos con EventEmitter
  private onAcceptEmitter = new EventEmitter<void>();
  private onRejectEmitter = new EventEmitter<void>();

  registerComponent(component: ConfirmDialogComponent) {
    this.confirmDialogComponent = component;
  }

  public showConfirm(action: string, event: Event) {
    if (!this.confirmDialogComponent) {
      console.error('ConfirmDialogComponent is not registered.');
      return;
    }

    // Obtener la configuración basada en la acción
    const config = this.getConfiguration(action);

    if (!config) {
      console.error(`No configuration found for action: ${action}`);
      return;
    }

    // Configurar el componente y abrir el diálogo
    this.confirmDialogComponent.message = config.message;
    this.confirmDialogComponent.header = config.header;
    this.confirmDialogComponent.icon = config.icon;
    this.confirmDialogComponent.acceptButtonStyleClass = config.acceptButtonStyleClass;
    this.confirmDialogComponent.rejectButtonStyleClass = config.rejectButtonStyleClass;
    this.confirmDialogComponent.target = event.target;
    this.confirmDialogComponent.acceptLabel = config.acceptLable;
    this.confirmDialogComponent.rejectLabel = config.rejectLabel;

    // Limpiar EventEmitters existentes
    this.onAcceptEmitter = new EventEmitter<void>();
    this.onRejectEmitter = new EventEmitter<void>();

    // Conectar los EventEmitters al componente
    this.confirmDialogComponent.onAccept = this.onAcceptEmitter;
    this.confirmDialogComponent.onReject = this.onRejectEmitter;

    // Suscribirse a eventos con las acciones configuradas
    this.onAcceptEmitter.subscribe(() => config.onAccept?.());
    this.onRejectEmitter.subscribe(() => config.onReject?.());

    this.confirmDialogComponent.showConfirmDialog();
  }

  private getConfiguration(action: string) {
    const configurations: { [key: string]: any } = {
      save: {
        message: 'Si le das a Guardar los cambios permanecerán, si Cancelas podràs seguir editando.',
        header: '¿Deseas guardar cambios antes de salir?',
        icon: 'pi pi-exclamation-triangle',
        acceptButtonStyleClass: 'p-button',
        rejectButtonStyleClass: 'p-button-outlined',
        rejectLabel: 'Cancelar',
        acceptLable: 'Guardar',
        onAccept: () => {
          console.log('Save action executed.');
          // todo: función de guardar.
        },
        onReject: () => {
          console.log('Save action rejected.');
        },
      },
      delete: {
        message: '¿Estás seguro?',
        header: 'Borrar archivo',
        icon: 'pi pi-trash',
        acceptButtonStyleClass: 'p-button',
        rejectButtonStyleClass: 'p-button-outlined',
        rejectLabel: 'Cancelar',
        acceptLable: 'Aceptar',
        onAccept: () => {
          //esto es solamente de prueba y visual
          this.messageService.add({ severity: 'error', summary: 'Eliminado', detail: '¡Tu archivo ha sido elimando!' })
          // todo: función de eliminar fila.
        },
        onReject: () => {
          console.log('Delete action rejected.');
        },
      },
    };

    return configurations[action];
  }
}
