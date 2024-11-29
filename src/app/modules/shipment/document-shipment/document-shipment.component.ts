import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ShipmentService } from '../../../services/shipment.service';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-document-shipment',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    ToggleButtonModule,

  ],
  templateUrl: './document-shipment.component.html',
  styleUrl: './document-shipment.component.scss'
})
export class DocumentShipmentComponent {
  private readonly fb = inject(FormBuilder);
  private readonly shipmentService = inject(ShipmentService);

  public documentForm: FormGroup = this.fb.group({
    identifiers: this.fb.group({
      fileNumber: [{ value: '123456789', disabled: false }],
      internalMarker: [{ value: '12345', disabled: false }],
    }),
    documentType: this.fb.group({
      cmrOption: [{ value: true, disabled: true }],
      billOfLadingOption: [{ value: false, disabled: true }],
    }),
    successiveTransport: this.fb.group({
      yesOption: [{ value: true, disabled: true }],
      noOption: [{ value: false, disabled: true }],
    }),
  });

  ngOnInit(): void {
    // Solo inicializar valores, no es necesario manejar eventos ya que es de solo lectura
  }
}
