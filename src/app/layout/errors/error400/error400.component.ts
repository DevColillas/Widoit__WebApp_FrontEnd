import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-error400',
  standalone: true,
  imports: [
    ButtonModule,
  ],
  templateUrl: './error400.component.html',
  styleUrl: '../errors.component.scss'
})
export class Error400Component {
  public return() {
    window.history.back();
  }
}
