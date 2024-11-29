import { Component } from '@angular/core';
import { HeaderComponent } from '../../../layout/header/header.component';
import { RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    ToastModule,
    RouterOutlet,
    HeaderComponent,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

}
