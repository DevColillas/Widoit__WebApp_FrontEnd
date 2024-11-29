import { Component } from '@angular/core';
import { TimeLineHistoryComponent } from './time-line-history/time-line-history.component';

@Component({
  selector: 'app-history-shipment',
  standalone: true,
  imports: [
    TimeLineHistoryComponent
  ],
  templateUrl: './history-shipment.component.html',
  styleUrl: './history-shipment.component.scss'
})
export class HistoryShipmentComponent {

}
