import { Component, inject, signal } from '@angular/core';
import { DashboardListComponent } from './dashboard-list/dashboard-list.component';
import { DashboardFiltersComponent } from "./dashboard-filters/dashboard-filters.component";
import { ButtonModule } from 'primeng/button';
import { Router, RouterLink } from '@angular/router';
import { DynamicButtonGroupComponent } from '../../shared/components/dynamic-button-group/dynamic-button-group.component';
import { NewDocumentModalComponent } from '../../modals/new-document-modal/new-document-modal.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    DashboardListComponent,
    DynamicButtonGroupComponent,
    NewDocumentModalComponent,
    ButtonModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  private readonly router = inject(Router)

  // Signal para el estado del status
  public statusesSignal = signal<string[]>([]);

  //signal para el documentNumber
  public documentNumberSignal = signal<string>('');
  //showmodal new document
  public showNewDocumentModal: boolean = false;

  public updateStatuses(statuses: string[]) {
    this.statusesSignal.set(statuses);
  }

  public onStatusesChange(statuses: string[]): void {
    this.statusesSignal.set(statuses);
  }

  public updateDocumentNumber(documentNumber: string) {
    this.documentNumberSignal.set(documentNumber);
  }

  public onDocumentNumberChange(documentNumber: string): void {
    this.documentNumberSignal.set(documentNumber);
  }

  public openNewDocumentModal() {
    this.showNewDocumentModal = true;
  }
}
