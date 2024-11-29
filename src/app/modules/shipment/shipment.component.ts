import { CommonModule, isPlatformBrowser } from "@angular/common";
import { Component, inject } from "@angular/core";
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

@Component({
  selector: 'app-shipment',
  standalone: true,
  imports: [
    CommonModule,
    TabViewModule,
    ButtonModule,
    AnnexesShipmentComponent,
    DocumentShipmentComponent,
    DriverShipmentComponent,
    HistoryShipmentComponent,
    IncidenceShipmentComponent,
    ProductShipmentComponent,
    RoutesShipmentComponent,
    BreadcrumbComponent
  ],
  templateUrl: './shipment.component.html',
  styleUrl: './shipment.component.scss'
})
export class ShipmentComponent {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly windowRefService = inject(WindowRefService);
  public documentNumber: string = '';
  public shipmentService = inject(ShipmentService);
  public activeShipmentIndex: number = 0;
  public shipmentCrmStatus: string = '';


  constructor() {
    this.documentNumber = this.activatedRoute.snapshot.paramMap.get('documentNumber')!;
    this.shipmentCrmStatus = this.shipmentService.getShipmentCrmStatus(this.documentNumber);
    console.log(this.shipmentCrmStatus);
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
}
