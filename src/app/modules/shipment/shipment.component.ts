import { CommonModule, isPlatformBrowser } from "@angular/common";
import { Component, inject, signal } from "@angular/core";
import { ButtonModule } from "primeng/button";
import { TabViewModule } from "primeng/tabview";
import { ActivatedRoute, Router } from "@angular/router";
import { ShipmentService } from "../../services/shipment.service";
import { AnnexesShipmentComponent } from "./annexes-shipment/annexes-shipment.component";
import { DocumentShipmentComponent } from "./document-shipment/document-shipment.component";
import { DriverShipmentComponent } from "./driver-shipment/driver-shipment.component";
import { HistoryShipmentComponent } from "./history-shipment/history-shipment.component";
import { IncidenceShipmentComponent } from "./incidence-shipment/incidence-shipment.component";
import { ProductShipmentComponent } from "./product-shipment/product-shipment.component";
import { RoutesShipmentComponent } from "./routes-shipment/routes-shipment.component";
import { BreadcrumbComponent } from "../../shared/components/breadcrumb/breadcrumb.component";
import { WindowRefService } from "../../services/window-ref.service";
import { DynamicButtonGroupComponent } from "../../shared/components/dynamic-button-group/dynamic-button-group.component";
import { ChipModule } from "primeng/chip";

@Component({
  selector: 'app-shipment',
  standalone: true,
  imports: [
    CommonModule,
    TabViewModule,
    ButtonModule,
    ChipModule,
    AnnexesShipmentComponent,
    DocumentShipmentComponent,
    DriverShipmentComponent,
    HistoryShipmentComponent,
    IncidenceShipmentComponent,
    ProductShipmentComponent,
    RoutesShipmentComponent,
    BreadcrumbComponent,
    DynamicButtonGroupComponent,
  ],
  templateUrl: './shipment.component.html',
  styleUrl: './shipment.component.scss'
})
export class ShipmentComponent {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly windowRefService = inject(WindowRefService);

  public documentNumber = signal<string>('');
  public shipmentService = inject(ShipmentService);
  public activeShipmentIndex: number = 0;
  public shipmentCrmStatus = signal<string[]>([]);

  //dynamic buttons
  // Signal para el estado del status
  public isDashboard: boolean = false;


  constructor() {
    this.documentNumber.set(this.activatedRoute.snapshot.paramMap.get('documentNumber')!);
    this.shipmentService.getShipmentData();
    this.shipmentCrmStatus.set([this.shipmentService.getShipmentCrmStatus(this.documentNumber())]);
  }


  ngOnInit(): void {
    const window = this.windowRefService.nativeWindow;
    if (window) {
      const navigationState = window.history.state;
      const activeTab = navigationState?.['activeTab'];
      this.setActiveTab(activeTab || 'document');
    } else {
      this.setActiveTab('document'); // Fallback en servidor
    }
  }
  // Método para cambiar el tab activo basado en un valor interno
  private setActiveTab(tab: string) {
    const tabMap: Record<string, number> = {
      document: 0,
      route: 1,
      driver: 2,
      product: 3,
      annexes: 4,
      history: 5,
      incidence: 6,
    };
    this.activeShipmentIndex = tabMap[tab] ?? 0;
  }

  // Método para manejar el cambio de tab manualmente
  onTabChange(event: any) {
    this.activeShipmentIndex = event.index;
  }

  //chip styles
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
}
