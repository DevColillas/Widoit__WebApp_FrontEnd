import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CollapseComponent } from '../../../shared/components/collapse/collapse.component';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { Shipment } from '../../../models/data-dashboar.model';
import { DashboardFilters, Status, StatusCMR } from '../../../models/dasboard-filters.model';

type FiltroKey = keyof DashboardFiltersComponent['filters'];

@Component({
  selector: 'app-dashboard-filters',
  standalone: true,
  imports: [
    CollapseComponent,
    FormsModule,
    CalendarModule,
    AutoCompleteModule,
    ButtonModule,
  ],
  templateUrl: './dashboard-filters.component.html',
  styleUrl: './dashboard-filters.component.scss'
})
export class DashboardFiltersComponent implements OnChanges, OnInit {

  @Input() shipmentListSorted: Shipment[] = [];
  @Input() filtersSaved!: DashboardFilters;

  dateInit: Date | null = null;
  dateEnd: Date | null = null;

  remitentes: any[] = ['Remitentes 1', 'Remitentes 2', 'Remitentes 3', 'Remitentes 4', 'Remitentes 5'];
  filteredRemitente: string[] = [];
  remitenteItems: string[] = []; //NgModel

  destinatarios: any[] = ['Destinatario 1', 'Destinatario 2', 'Destinatario 3', 'Destinatario 4', 'Destinatario 5'];
  filteredDestinatario: string[] = [];
  destinatarioItems: string[] = []; //NgModel

  transportista: any[] = ['Transportista 1', 'Transportista 2', 'Transportista 3', 'Transportista 4', 'Transportista 5'];
  filteredTransportista: string[] = [];
  transportistaItems: string[] = []; //NgModel

  conductor: any[] = ['Conductor 1', 'Conductor 2', 'Conductor 3', 'Conductor 4', 'Conductor 5'];
  filteredConductor: string[] = [];
  conductorItems: string[] = []; //NgModel
  /*
  camion: any[] = ['Camión 1', 'Camión 2', 'Camión 3', 'Camión 4', 'Camión 5'];
  filteredCamion: string[] = [];
  camionItems: string[] = []; //NgModel

  remolque: any[] = ['Remolque 1', 'Remolque 2', 'Remolque 3', 'Remolque 4', 'Remolque 5'];
  filteredRemolque: string[] = [];
  remolqueItems: string[] = []; //NgModel
  */

 public filters!: DashboardFilters
 public buttonDate: any = { expedicion: false, carga: false, descarga: false };
 public buttonStates: Status = { pendiente: false, cargando: false, enTransito: false, entregado: false, incidencia: false };
 public buttonCMR: StatusCMR = { borrador: false, planificado: false, completado: false, incompleto: false };

  @Output() filtersApplied = new EventEmitter<any>();
  @Output() clearFilters = new EventEmitter<any>();

  ngOnInit(){
    if(this.filtersSaved){
      //console.log(this.filtersSaved)
      this.filters = this.filtersSaved
      if(this.filtersSaved.dateInit){
        this.dateInit = new Date(this.filtersSaved.dateInit)
      }
      if(this.filtersSaved.dateEnd){
        this.dateEnd = new Date(this.filtersSaved.dateEnd)
      }
      this.destinatarioItems = this.filtersSaved.destinatariosItems
      this.transportistaItems = this.filtersSaved.transportistaItems
      this.conductorItems = this.filtersSaved.conductorItems
      this.buttonStates = this.filtersSaved.estado
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['shipmentListSorted'] && changes['shipmentListSorted'].currentValue) {
      this.initializeFiltersValue();
    }
  }

  initializeFiltersValue() {
    this.remitentes = [...new Set(this.shipmentListSorted.map((shipment) => shipment.sender))];
    this.destinatarios = [...new Set(this.shipmentListSorted.map((shipment) => shipment.recipient))];
    this.transportista = [...new Set(this.shipmentListSorted.map((shipment) => shipment.transporter))];
    this.conductor = [...new Set(this.shipmentListSorted.map((shipment) => shipment.driver))];
   }

  /* Functions */
  searchDestinatarios(event: any) {
    const query = event.query.toLowerCase();
    this.filteredDestinatario = this.destinatarios.filter(item => item.toLowerCase().includes(query));
  }

  searchRemitentes(event: any) {
    const query = event.query.toLowerCase();
    this.filteredRemitente = this.remitentes.filter(item => item.toLowerCase().includes(query));
  }

  searchTransportista(event: any) {
    const query = event.query.toLowerCase();
    this.filteredTransportista = this.transportista.filter(item => item.toLowerCase().includes(query));
  }

  searchConductor(event: any) {
    const query = event.query.toLowerCase();
    this.filteredConductor = this.conductor.filter(item => item.toLowerCase().includes(query));
  }

  toggleButtonDate(button: 'expedicion' | 'carga' | 'descarga') {
    // only one button can be active at a time
    this.buttonDate = { expedicion: false, carga: false, descarga: false };
    this.buttonDate[button] = !this.buttonDate[button];
    this.filters.dateType = button;
  }

  toggleButtonState(button: 'pendiente' | 'cargando' | 'enTransito' | 'entregado' | 'incidencia') {
    this.buttonStates[button] = !this.buttonStates[button];
    this.filters.estado = { ...this.buttonStates };
  }

  toggleButtonCMR(button: 'planificado' | 'borrador' | 'completado' | 'incompleto') {
    this.buttonCMR[button] = !this.buttonCMR[button];
    this.filters.estadoCMR = { ...this.buttonCMR };
  }

  clear(){
    this.clearFilters.emit();
    // clear inputs
    this.dateInit = null;
    this.dateEnd = null;
    this.destinatarioItems = [];
    this.transportistaItems = [];
    this.conductorItems = [];
    this.buttonDate = { expedicion: false, carga: false, descarga: false };
    this.buttonStates = {
      pendiente: false,
      cargando: false,
      enTransito: false,
      entregado: false,
      incidencia: false
    };
    this.buttonCMR = {
      planificado: false,
      borrador: false,
      completado: false,
      incompleto: false
    };
    // clear filters
    this.filters = {
      dateInit: '',
      dateEnd: '',
      dateType: '',
      remitentesItems: [] as string[],
      destinatariosItems: [] as string[],
      transportistaItems: [] as string[],
      conductorItems: [] as string[],
      camionItems: [] as string[],
      remolqueItems: [] as string[],
      estado: this.buttonStates,
      estadoCMR: this.buttonCMR
    };
  }


  actualizarFiltro(key: FiltroKey, value: any) {
    this.filters[key] = value;
  }

  aplicarFiltros() {
    this.filtersApplied.emit(this.filters);
  }
}
