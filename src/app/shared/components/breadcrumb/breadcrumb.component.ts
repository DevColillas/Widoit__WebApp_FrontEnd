import { Component, Input, OnInit, signal } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [
    BreadcrumbModule
  ],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss'
})
export class BreadcrumbComponent implements OnInit {

  @Input() documentNumber: string | undefined;
  @Input() sectionTitle: string | undefined;

  public breadcrumbItems = signal<MenuItem[]>([]);

  ngOnInit(): void {
    if(this.documentNumber) {
      this.breadcrumbItems = signal<MenuItem[]>([{
        icon: 'pi pi-home',
        label: '',
        routerLink: '/',
      },
      {
        label: `Documento Nº - ${this.documentNumber}`, // Muestra el documentNumber en el breadcrumb
        route: undefined, // Sin ruta, ya que representa la página actual
      }]);
    } else if (this.sectionTitle) {
      this.breadcrumbItems = signal<MenuItem[]>([{
        icon: 'pi pi-home',
        label: '',
        routerLink: '/',
      },
      {
        label: `Perfil`, // Muestra el documentNumber en el breadcrumb
        route: undefined, // Sin ruta, ya que representa la página actual
      }]);
    }

  }
}
