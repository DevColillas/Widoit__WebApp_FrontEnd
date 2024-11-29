import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-time-line-history',
  standalone: true,
  imports: [
    CommonModule,
    AvatarModule
  ],
  templateUrl: './time-line-history.component.html',
  styleUrl: './time-line-history.component.scss'
})
export class TimeLineHistoryComponent implements OnInit {
  timelineData: { date: string; time: string; description: string; status: string; icon: string }[] = [];

  ngOnInit(): void {
    this.timelineData = [
      { date: '09/07/2024', time: '14:16:13', description: 'Jhon Doe ha creado un nuevo documento.', status: 'created', icon: this.getIcon('created') },
      { date: '09/07/2024', time: '15:20:45', description: 'El paquete ha sido recogido.', status: 'inProgress', icon: this.getIcon('inProgress') },
      { date: '09/07/2024', time: '18:10:00', description: 'Documento actualizado.', status: 'updated', icon: this.getIcon('updated') },
      { date: '09/07/2024', time: '18:40:00', description: 'Documento actualizado.', status: 'updated', icon: this.getIcon('updated') },
      { date: '09/07/2024', time: '17:45:30', description: 'Error en la dirección de entrega.', status: 'error', icon: this.getIcon('error') },
      { date: '09/07/2024', time: '17:55:30', description: 'Error en la dirección de entrega.', status: 'error', icon: this.getIcon('error') },
      { date: '09/07/2024', time: '15:20:45', description: 'Jhon Doe ha llegado al punto de recogida.', status: 'inProgress', icon: this.getIcon('inProgress') },
      { date: '09/07/2024', time: '18:40:00', description: 'Jhon Doe ha firmado en el punto de recogida', status: 'updated', icon: this.getIcon('updated') },
      { date: '09/07/2024', time: '19:00:45', description: 'El paquete ha sido entregado.', status: 'inProgress', icon: this.getIcon('inProgress') },
      { date: '09/07/2024', time: '19:05:10', description: 'Entrega completada al destinatario.', status: 'completed', icon: this.getIcon('completed') },
    ];
  }

  getIcon(status: string): string {
    switch (status) {
      case 'created':
        return 'pi pi-file';
      case 'inProgress':
        return 'pi pi-box';
      case 'updated':
        return 'pi pi-file-edit';
      case 'error':
        return 'pi pi-exclamation-triangle';
      case 'completed':
        return 'pi pi-check';
      default:
        return 'pi pi-question';
    }
  }

}
