import { ShipmentService } from './../../../services/shipment.service';
import { Component, EventEmitter, inject, OnInit, Output, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Shipment, ShipmentStatus } from '../../../models/data-dashboar.model';
import { CommonModule, DatePipe } from '@angular/common';

import { TableModule, Table, TableRowSelectEvent } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { SidebarModule } from 'primeng/sidebar';
import { DropdownModule } from 'primeng/dropdown';
import { Router, RouterLink } from '@angular/router';
import { DashboardFiltersComponent } from '../dashboard-filters/dashboard-filters.component';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipModule } from 'primeng/chip';
import { TooltipModule } from 'primeng/tooltip';
import { DashboardFilters, Status, StatusCMR } from '../../../models/dasboard-filters.model';
import { DashboardTableConfigComponent } from '../../../modals/dashboard-table-config/dashboard-table-config.component';
import { Column } from '../../../models/column.model';

@Component({
  selector: 'app-dashboard-list',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    InputTextModule,
    ButtonModule,
    FormsModule,
    SidebarModule,
    DropdownModule,
    CheckboxModule,
    ChipModule,
    TooltipModule,
    DashboardFiltersComponent,
    DashboardTableConfigComponent,
  ],
  templateUrl: './dashboard-list.component.html',
  styleUrl: './dashboard-list.component.scss'
})

export class DashboardListComponent implements OnInit {
  @ViewChild('shipmentTable') shipmentTable!: Table;
  @Output() statusesChange = new EventEmitter<string[]>();
  @Output() documentNumberofShipmentSelected = new EventEmitter<string>();

  private readonly _shipmentService = inject(ShipmentService);
  private readonly router = inject(Router)
  private _shipmentListSubscription: Subscription = new Subscription();
  private _datePipe: DatePipe = new DatePipe('en-US'); // Inicializa el DatePipe

  public shipmentList$: Observable<Shipment[]>;
  public initialValue: Shipment[] = [];
  public shipmentListSorted: Shipment[] = []; // Array to hold sorted data
  public isSorted: boolean | null = null;
  public cols!: Column[];
  public searchValue: string | undefined;
  //public allSelected: boolean = false;
  public selectedShipment!: Shipment[];
  public displaySidebar: boolean = true;
  public isFavorite: boolean = false;
  public filteredShipmentList: Shipment[] = [];
  public buttonStates: Status = { pendiente: false, cargando: false, enTransito: false, entregado: false, incidencia: false };
  public buttonStatesCMR: StatusCMR = { planificado: false, borrador: false, completado: false, incompleto: false };
  public filtersSaved: DashboardFilters = {
    dateInit: '',
    dateEnd: '',
    dateType: '',
    remitentesItems: [],
    destinatariosItems: [],
    transportistaItems: [],
    conductorItems: [],
    camionItems: [],
    remolqueItems: [],
    estado: this.buttonStates,
    estadoCMR: this.buttonStatesCMR
  };


  //only for styles
  public tableScrollHeight: string = `calc(100vh - 102px)`;

  //modal config table
  public showConfigTableModal: boolean = false;

  constructor() {
    this.shipmentList$ = this._shipmentService.shipmentList$;
  }

  ngOnInit(): void {
    this._shipmentService.getShipmentData();

    this.shipmentList$.subscribe((shipments) => {
      this.initialValue = shipments; // Store the initial value for resetting
      this.shipmentListSorted = [...shipments]; // Initialize sorted list
    });

    this.loadShipmentData();
  }

  // Método para inicializar shipmentListSorted con isHidden
  public loadShipmentData() {
    this.cols = [
      { field: 'fileNumber', header: 'Exp.', isVisible: true },
      { field: 'loadingDateTime', header: 'Carga', isVisible: true },
      { field: 'unloadingDateTime', header: 'Descarga', isVisible: true },
      { field: 'sender', header: 'Remitente', isVisible: true },
      { field: 'recipient', header: 'Destinatario', isVisible: true },
      { field: 'driver', header: 'Conductor', isVisible: true },
      { field: 'status', header: 'Estado', isVisible: true },
      { field: 'cmr', header: 'CMR', isVisible: true },

      { field: 'dispatchDate', header: 'F. exped.', isVisible: false },
      { field: 'documentNumber', header: 'Nº documento', isVisible: false },
      { field: 'loadingPlace', header: 'L. carga', isVisible: false },
      { field: 'transporter', header: 'Transportista', isVisible: false },
    ];
  }

  public formatDate(value: any, field: string): string | any {
    const dateFields = ['loadingDateTime', 'unloadingDateTime', 'dispatchDate']; // Campos que necesitan formato de fecha
    return dateFields.includes(field) ? this._datePipe.transform(value, 'dd/MM/yy HH:mm') : value;
  }

  // todo: Método que retorna el ancho mínimo de cada columna
  public getMinWidth(field: string): string {
    switch (field) {
      case 'fileNumber': return '80px';
      case 'loadingDateTime': return '100px';
      case 'unloadingDateTime': return '110px';
      case 'sender': return '130px';
      case 'recipient': return '130px';
      case 'driver': return '115px';
      case 'status': return '80px';
      case 'cmr': return '80px';
      case 'dispatchDate': return '100px';
      case 'documentNumber': return '80px';
      case 'loadingPlace': return '130px';
      case 'transporter': return '130px';
      default: return '100px'; // Ancho predeterminado
    }
  }

  public getMaxWidth(field: string): string {
    switch (field) {
      case 'sender': return '130px';
      case 'recipient': return '130px';;
      case 'documentNumber': return '80px';
      case 'loadingPlace': return '130px';
      case 'transporter': return '130px';
      default: return 'auto'; // Ancho predeterminado
    }
  }

  // Método para seleccionar o deseleccionar todos los elementos
  toggleAllRows(isSelected: boolean) {
    //this.allSelected = isSelected;
    this.selectedShipment = isSelected ? [...this.shipmentListSorted] : [];
    this.shipmentListSorted.forEach((shipment) => (shipment.selected = isSelected));
  }

  public toggleFavorite(rowData: Shipment, event: MouseEvent | undefined): void {
    if (!event) {
      return; // Si el evento es undefined, no hacemos nada
    }
    event.stopPropagation();
    rowData.isFavorite = !rowData.isFavorite;
  }

   //dynamic buttons
  private emitSelectedStatuses(): void {
    const statuses = this.selectedShipment.map(item => item.cmr); // `cmr` es el campo del estado
    this.statusesChange.emit(statuses);
  }

  private emitSelectedDocumentNumber(): void {
    const documentNumber = this.selectedShipment.map(item => item.documentNumber); // `docuemntNumber` es el campo del estado
    this.documentNumberofShipmentSelected.emit(documentNumber[0]);
  }

  public onRowToggle(event: TableRowSelectEvent, isSelected: boolean): void {
    if (event.data) {
      event.data.selected = isSelected;

      if (isSelected) {
        // Si se selecciona, agregar a la lista si no existe
        if (!this.selectedShipment.includes(event.data)) {
          this.selectedShipment.push(event.data);
        }
      } else {
        // Si se deselecciona, eliminar de la lista
        this.selectedShipment = this.selectedShipment.filter(
          (item: Shipment) => item !== event.data
        );
      }
    }

    // Emitir los estados seleccionados
    this.emitSelectedStatuses();
    //emitir el doc number
    this.emitSelectedDocumentNumber();
  }

  public onSearch(event: Event) {
    const target = event.target as HTMLInputElement;
    this.shipmentTable.filterGlobal(target.value, 'contains');
  }
  public clearSearch() {
    this.shipmentTable.value = [...this.initialValue]; // Restablece la lista de envíos
    this.filteredShipmentList = [];
    this.shipmentTable.clear(); // Limpia los filtros de la tabla
    this.searchValue = ''; // Limpia el valor de búsqueda
  }

  //custom chips class
  public getCmrChipClass(cmr: string): string {
    switch (cmr) {
      case 'Planificado':
        return 'chip-planificado'; // Clase CSS para "Planificado"
      case 'Borrador':
        return 'chip-borrador';     // Clase CSS para "Borrador"
      case 'Completado':
        return 'chip-completado'; // Clase CSS para "Completado
      case 'Incompleto':
        return 'chip-incompleto';
      default:
        return 'chip-default';      // Clase CSS predeterminada
    }
  }

  public getStatusChipClass(status: string[]): string {
    if (status.includes('Incidencia')) {
      return 'chip-with-incidence';
    } else {
      return 'chip-default';
    }
  }

  public getStatusIcon(status: string): string {
    switch (status) {
      case 'Pendiente':
        return 'pi pi-question-circle'; // Ícono para "Pendiente"
      case 'Cargando':
        return 'pi pi-sync';            // Ícono para "Cargando"
      case 'En tránsito':
        return 'pi pi-truck';           // Ícono para "En tránsito"
      case 'Entregado':
        return 'pi pi-check';           // Ícono para "Entregado"
      case 'Incidencia':
        return 'pi pi-exclamation-circle'; // Ícono para "Incidencia" (de momento no hace falta en el dashboard, pero puede servir en un futuro)
      default:
        return 'pi pi-info-circle';     // Ícono predeterminado
    }
  }

  // Alterna la visibilidad del sidebar
  toggleSidebar() {
    this.displaySidebar = !this.displaySidebar;
  }
  applyFilters(filtroData?: any) {
    // Define la lógica para aplicar los filtros aquí
    this.filtersSaved = filtroData

    if (!filtroData) return;

    // Aplica los filtros en shipmentListSorted y actualiza la lista de visualización
    this.filteredShipmentList = this.shipmentListSorted.filter((shipment) => {
      let matches = true;

      if(filtroData.remitentesItems && filtroData.remitentesItems.length){
        matches = matches && filtroData.remitentesItems.includes(shipment.sender);
      }

      // Filtrar por destinatario si está presente en filtroData
      if (filtroData.destinatariosItems && filtroData.destinatariosItems.length) {
        matches = matches && filtroData.destinatariosItems.includes(shipment.recipient);
      }


      // Filtrar por transportista si está presente
      if (filtroData.transportistaItems && filtroData.transportistaItems.length) {
        matches = matches && filtroData.transportistaItems.includes(shipment.transporter);
      }


      // Filtrar por conductor si está presente
      if (filtroData.conductorItems && filtroData.conductorItems.length) {
        matches = matches && filtroData.conductorItems.includes(shipment.driver);
      }

      // Filtrar por fecha si están presentes en filtroData
      if (filtroData.dateInit) {
        const dateInit = new Date(filtroData.dateInit);
        if(filtroData.dateType === 'expedicion'){
          const shipmentDateDispatch = new Date(shipment.dispatchDate);
          matches = matches && shipmentDateDispatch >= dateInit;
        }
        if(filtroData.dateType === 'carga'){
          const shipmentDateLoading = new Date(shipment.loadingDateTime);
          matches = matches && shipmentDateLoading >= dateInit;
        }
        if(filtroData.dateType === 'descarga'){
          const shipmentDateUnloading = new Date(shipment.unloadingDateTime);
          matches = matches && shipmentDateUnloading >= dateInit;
        }
      }

      if (filtroData.dateEnd) {
        const dateEnd = new Date(filtroData.dateEnd);
        if(filtroData.dateType === 'expedicion'){
          const shipmentDateDispatch = new Date(shipment.dispatchDate);
          matches = matches && shipmentDateDispatch <= dateEnd;
        }
        if(filtroData.dateType === 'carga'){
          const shipmentDateLoading = new Date(shipment.loadingDateTime);
          matches = matches && shipmentDateLoading <= dateEnd;
        }
        if(filtroData.dateType === 'descarga'){
          const shipmentDateUnloading = new Date(shipment.unloadingDateTime);
          matches = matches && shipmentDateUnloading <= dateEnd;
        }
      }

      if (filtroData.estado.pendiente || filtroData.estado.cargando || filtroData.estado.enTransito || filtroData.estado.entregado || filtroData.estado.incidencia) {
        const estadosSeleccionados: ShipmentStatus[] = [];
        if (filtroData.estado.pendiente) estadosSeleccionados.push('Pendiente');
        if (filtroData.estado.cargando) estadosSeleccionados.push('Cargando');
        if (filtroData.estado.enTransito) estadosSeleccionados.push('En tránsito');
        if (filtroData.estado.entregado) estadosSeleccionados.push('Entregado');
        if (filtroData.estado.incidencia) estadosSeleccionados.push('Incidencia');

        matches = shipment.status.some((estado) => estadosSeleccionados.includes(estado));
      }

      if (filtroData.estadoCMR.borrador || filtroData.estadoCMR.planificado || filtroData.estadoCMR.completado || filtroData.estadoCMR.incompleto) {
        matches =
          matches &&
          (filtroData.estadoCMR.borrador && shipment.cmr === 'Borrador') ||
          (filtroData.estadoCMR.planificado && shipment.cmr === 'Planificado') ||
          (filtroData.estadoCMR.completado && shipment.cmr === 'Completado') ||
          (filtroData.estadoCMR.incompleto && shipment.cmr === 'Incompleto');
      }

      return matches;
    });

    // **Nuevo**: Ordenar por favoritos si `isFavoriteSorted` es `true`
    if (this.isFavoriteSorted) {
      this.filteredShipmentList.sort((a, b) => {
        return (b.isFavorite ? 1 : 0) - (a.isFavorite ? 1 : 0);
      });
    }

    // Actualiza la lista de visualización
    this.shipmentTable.value = this.filteredShipmentList;


  }

  public isRowHovered(rowData: any): boolean {
    return rowData.hovered || rowData.selected;
  }

  public navigateToShipment(documentNumber: string) {
    this.router.navigate(['/shipment', documentNumber], {
      state: { activeTab: 'document' } //we want to show first routes tab view
    });
  }

  public openConfigTableModal() {
    this.showConfigTableModal = true;
  }

  public onApplyChanges(updatedColumns: Column[]) {
    // Actualiza las columnas visibles en la tabla
    this.cols = [...updatedColumns];
  }

  //para cuando el texto se corta con ellipsis

  public isTextEllipsed(element: HTMLElement): boolean {
    return element.scrollWidth > element.clientWidth;
  }

  //fav sort
  public isFavoriteSorted: boolean = false; // Indica si la tabla está ordenada por favoritos
  public toggleFavoriteSorting(): void {
    this.isFavoriteSorted = !this.isFavoriteSorted;

    // Si está activado el orden por favoritos, ordenar la lista filtrada
    if (this.isFavoriteSorted) {
      this.shipmentListSorted.sort((a, b) => {
        return (b.isFavorite ? 1 : 0) - (a.isFavorite ? 1 : 0);
      });
    } else {
      // Restablecer al orden original
      this.shipmentListSorted = [...this.initialValue];
    }

    // Actualizar el valor de la tabla
    this.shipmentTable.value = this.filteredShipmentList.length ? this.filteredShipmentList : this.shipmentListSorted;
  }

  //todo: ordenar columnas
  public saveColumnOrder() {
    const order = this.cols.map(col => col.field);
    localStorage.setItem('columnOrder', JSON.stringify(order));
  }

  public loadColumnOrder() {
    const order = JSON.parse(localStorage.getItem('columnOrder') || '[]');
    this.cols = this.cols.sort((a, b) => order.indexOf(a.field) - order.indexOf(b.field));
  }

  // dynamic buttons

}
