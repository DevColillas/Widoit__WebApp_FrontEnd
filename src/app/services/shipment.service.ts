import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { Shipment } from '../models/data-dashboar.model';
import { environment } from '../../environments/environment.prod';
import { ShipmentAnnexes } from '../models/shipment-annexes';
import { Router } from '@angular/router';
import { response } from 'express';

@Injectable({
  providedIn: 'root'
})
export class ShipmentService {

  // "any" at the moment. Will implement type when overall structure of app is clear
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly _getShipmentDataUrl: string = environment.GET_SHIPMENT_DATA_URL;
  private _shipmentList$ = new BehaviorSubject<Shipment[]>([]);

  //product
  private _productsFormData: any = {};
  //driver
  private _isDriverFormDataValid = false;
  private _driverFormData: any = {};
  get shipmentList$() {
    return this._shipmentList$.asObservable();
  }

  constructor() { }

  public getShipmentData() {
    this.http.get<Shipment[]>(this._getShipmentDataUrl).subscribe({
      next: (response) => {
        this._shipmentList$.next(response);
      },
      error: (error) => {
        switch (error.status) {
          case 404:
            this.router.navigate(['/404']);
            break;
          case 500:
            this.router.navigate(['/500']);
            break;
          default:
        }
        console.error('error al obtener datos de envios', error);
        // console.log(error, 'error getting shipment data');
      }
    })
  }

  // Método para buscar un shipment por fileNumber en la lista local
  public getShipmentByFileNumber(fileNumber: string): Observable<Shipment | undefined> {
    return this._shipmentList$.pipe(
      map((shipments) => shipments.find(shipment => shipment.fileNumber === fileNumber))
    );
  }

  public getShipmentCrmStatus(documentNumber: string): string {
    return this._shipmentList$.value.find(shipment => shipment.documentNumber === documentNumber)?.cmr || '';
  }

  //product section
  public onProductsFormDataChange(data: any, isValid: boolean) {
    this._productsFormData = data;
  }


  //driver data
  get isDataValid(): boolean {
    return this._isDriverFormDataValid;
  }

  get driverFormData(): any {
    return this._driverFormData;
  }

  onDriverFormDataChange(data: any, isValid: boolean) {
    this._driverFormData = data;
    this._isDriverFormDataValid = true;
  }

  submitDriverForm() {
    console.log('Driver form submitted');
  }


  deleteShipment(): void {
    throw new Error('Method not implemented.');
  }
  shipmentDetails(documentNumber: string): void {
    this.router.navigate(['/shipment', documentNumber], {
      state: { activeTab: 'document' } //we want to show first routes tab view
    });
  }
  maskAsIncomplete(): void {
    throw new Error('Method not implemented.');
  }
  archiveShipment(): void {
    throw new Error('Method not implemented.');
  }
  sendShipment(): void {
    throw new Error('Method not implemented.');
  }
  attachFile(): void {
    throw new Error('Method not implemented.');
  }
  viewDocument(): void {
    throw new Error('Method not implemented.');
  }
  assignDriver(): void {
    throw new Error('Method not implemented.');
  }
  duplicateShipment(): void {
    throw new Error('Method not implemented.');
  }
  recoverShipment(): void {
    throw new Error('Method not implemented.');
  }

  changeCrmStatusToPlanned() {
    throw new Error('Method not implemented.');
  }
  saveChanges() {
    throw new Error('Method not implemented.');
  }

  submitShipmentForm() {
    // console.log('Route form submitted');
    // console.log(this._routeFormData);

    console.log('products form submitted');
  }

  getShipmentAttachments(): Observable<ShipmentAnnexes[]> {
    return of([
      {
        fileName: 'FOTO 1.jpg',
        id: '1',
        author: 'John Doe',
        date: '01/04/24 10:52',
        fileType: 'image',
      },
      {
        fileName: 'Informe de daños.doc',
        id: '2',
        author: 'John Doe',
        date: '01/04/24 10:52',
        fileType: 'document',
      },
      {
        fileName: 'FOTO 2.jpg',
        id: '3',
        author: 'Jose Pocillo',
        date: '01/04/24 10:52',
        fileType: 'image',
        isDeleteAble: true
      },
      {
        fileName: 'Albarán.pdf',
        id: '4',
        author: 'John Doe',
        date: '01/04/24 10:52',
        fileType: 'document',
      },
      {
        fileName: 'FOTO 3.jpg',
        id: '5',
        author: 'John Doe',
        date: '01/04/24 10:52',
        fileType: 'image',
      },
      {
        fileName: 'Informe de daños.doc',
        id: '6',
        author: 'Jose Pocillo',
        date: '01/04/24 10:52',
        fileType: 'document',
        isDeleteAble: true
      },
      {
        fileName: 'FOTO 4.jpg',
        id: '7',
        author: 'Jose Pocillo',
        date: '01/04/24 10:52',
        fileType: 'image',
        isDeleteAble: true
      },
      {
        fileName: 'Informe de daños.doc',
        id: '8',
        author: 'John Doe',
        date: '01/04/24 10:52',
        fileType: 'document',
      },
    ]);
  }
}
