import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-error500',
  standalone: true,
  imports: [
    ButtonModule,
  ],
  templateUrl: './error500.component.html',
  styleUrl: '../errors.component.scss'
})
export class Error500Component {
  public return() {
    window.history.back();
  }
}
