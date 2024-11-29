import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-error404',
  standalone: true,
  imports: [
    ButtonModule,
  ],
  templateUrl: './error404.component.html',
  styleUrl: '../errors.component.scss'
})
export class Error404Component {
  public return() {
    window.history.back();
  }
}
