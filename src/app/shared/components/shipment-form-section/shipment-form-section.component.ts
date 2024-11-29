import { Component, input } from '@angular/core';

@Component({
  selector: 'app-shipment-form-section',
  standalone: true,
  imports: [],
  templateUrl: './shipment-form-section.component.html',
  styleUrl: './shipment-form-section.component.scss'
})
export class ShipmentFormSectionComponent {
  title = input<string>();
}
