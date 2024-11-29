import { CheckboxModule } from 'primeng/checkbox';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { Column } from '../../models/column.model';

@Component({
  selector: 'app-dashboard-table-config',
  standalone: true,
  imports: [
    ModalComponent,
    CommonModule,
    FormsModule,
    ButtonModule,
    TableModule,
    CheckboxModule,
  ],
  templateUrl: './dashboard-table-config.component.html',
  styleUrl: './dashboard-table-config.component.scss'
})
export class DashboardTableConfigComponent implements OnInit {
  @Input() visible = false //for modal
  @Output() visibleChange = new EventEmitter<boolean>();
  @Input() columns: Column[] = [];
  @Output() applyChanges = new EventEmitter<Column[]>(); // Evento para enviar cambios

  public selectedColumns: Column[] = [];
  public tempColumns: Column[] = []; //columnas temporales hasta aplicar cambios

  // Función para contar los elementos seleccionados
  get selectedCount(): number {
    return this.tempColumns.filter(col => col.isVisible).length;
  }
  ngOnInit(): void {
    // Inicializa selectedColumns con las columnas no ocultas
    // this.selectedColumns = this.columns.filter(col => col.isVisible);
    this.initializeTempColumns();

  }

  // Copia el estado de `columns` en `tempColumns` al abrir el modal
  private initializeTempColumns() {
    this.tempColumns = this.columns.map(col => ({ ...col })); // Copia profunda de cada columna
  }

  // Verifica si una columna es "fileNumber" para aplicarle reglas especiales
  public isFileNumberColumn(column: Column): boolean {
    return column.field === 'fileNumber' || column.field === 'cmr' || column.field === 'status';
  }
  // Método para manejar el cambio en el estado de los checkboxes
  public toggleColumnSelection(col: Column) {
    // // Actualiza la lista de columnas seleccionadas temporalmente
    // if (!this.selectedColumns.includes(col) && !col.isVisible) {
    //   this.selectedColumns.push(col); // Se agrega solo si la columna está visible
    // } else {
    //   this.selectedColumns = this.selectedColumns.filter(item => item !== col); // Elimina si no está seleccionada
    // }
  }

  // Método para aplicar los cambios y emitirlos al padre
  public onApply() {
    this.columns.forEach((col, index) => {
      col.isVisible = this.tempColumns[index].isVisible;
    });
    this.applyChanges.emit(this.columns);
    this.closeModal();
  }

  public onCancel() {
    this.initializeTempColumns();
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
