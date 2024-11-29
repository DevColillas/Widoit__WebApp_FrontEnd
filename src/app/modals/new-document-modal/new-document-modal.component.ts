import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ShipmentService } from '../../services/shipment.service';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-document-modal',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    ButtonModule,
    InputGroupModule,
    InputTextModule,
    ToggleButtonModule,
    ModalComponent,
  ],
  templateUrl: './new-document-modal.component.html',
  styleUrl: './new-document-modal.component.scss'
})
export class NewDocumentModalComponent implements OnInit {
  @Input() visible = false //for modal
  @Output() visibleChange = new EventEmitter<boolean>();

  private readonly fb = inject(FormBuilder);
  private readonly shipmentService = inject(ShipmentService);
  private readonly router = inject(Router); // Inyección del Router

  ngOnInit(): void {
    this.newDocumentForm.get('documentType')?.patchValue({
      cmrOption: true,
      billOfLadingOption: false,
    });

    this.newDocumentForm.get('successiveTransport')?.patchValue({
      yesOption: true,
      noOption: false,
    });
  }

  public newDocumentForm: FormGroup = this.fb.group({
    identifiers: this.fb.group({
      documentNumber: [{ value: 'DOC-123', disabled: true }, Validators.required], //todo: validator custom para que si o si tenga el formato que queremos.
      fileNumber: ['123456789'], //todo: Es opcional. Pero si hay algun valor, tiene que tener el formato que queremos.
      internalMarker: ['12345'], //todo: Es opcional. Pero si hay algun valor, tiene que tener el formato que queremos.
    }),
    documentType: this.fb.group({
      cmrOption: [true],
      billOfLadingOption: [false],
    }),
    successiveTransport: this.fb.group({
      yesOption: [true],
      noOption: [false]
    })
  });

  public onDocumentToggleChange(option: string): void {
    const documentTypeGroup = this.newDocumentForm.get('documentType') as FormGroup;

    // Si el toggle seleccionado es 'cmrOption', activamos 'cmrOption' y desactivamos 'billOfLadingOption'.
    if (option === 'cmrOption') {
      documentTypeGroup.patchValue({
        cmrOption: true,
        billOfLadingOption: false,
      });
    } else if (option === 'billOfLadingOption') {
      documentTypeGroup.patchValue({
        cmrOption: false,
        billOfLadingOption: true,
      });
    }
  }

  public onSuccessiveToggleChange(option: string): void {
    const successiveTransportGroup = this.newDocumentForm.get('successiveTransport') as FormGroup;

    // Si el toggle seleccionado es 'cmrOption', activamos 'cmrOption' y desactivamos 'billOfLadingOption'.
    if (option === 'yesOption') {
      successiveTransportGroup.patchValue({
        yesOption: true,
        noOption: false
      });
    } else if (option === 'noOption') {
      successiveTransportGroup.patchValue({
        yesOption: false,
        noOption: true
      });
    }
  }

  public onApply(): void {
    if (this.newDocumentForm.valid) {
      // Simular el envío de datos
      const formData = this.newDocumentForm.getRawValue();
      console.log('Datos enviados:', JSON.stringify(formData));

      // Redirección a la ruta deseada
      this.closeModal();
      this.navigateToShipment('344201'); //todo: enviar el documentNumber o el dato que queramos único para poder cargar los datos en la siguiente página
    } else {
      // Si el formulario no es válido, mostrar alerta con los errores
      const errors = this.getFormValidationErrors();
      alert(
        `El formulario contiene errores. Revise los siguientes campos:\n${errors.join(
          '\n'
        )}`
      );
    }
  }

  private getFormValidationErrors(): string[] {
    const errors: string[] = [];
    const formControls = this.newDocumentForm.controls;

    if (formControls['identifiers']?.get('documentNumber')?.invalid) {
      errors.push('El número de documento es obligatorio y debe ser válido.');
    }
    if (formControls['identifiers']?.get('fileNumber')?.invalid) {
      errors.push(
        'El número de expediente debe tener el formato correcto si se proporciona.'
      );
    }
    if (formControls['identifiers']?.get('internalMarker')?.invalid) {
      errors.push(
        'El marcador interno debe tener el formato correcto si se proporciona.'
      );
    }

    return errors;
  }

  public navigateToShipment(id: string) {
    this.router.navigate([`/shipment/${id}`], {
      state: { activeTab: 'route' } //we want to show first routes tab view
    });
  }

  //global for all modals buttons
  public onCancel() {
    this.closeModal();
  }

  private hideModal() {
    this.visible = false;
    this.visibleChange.emit(this.visible); // Emit the change to close the modal
  }

  private closeModal() {
    this.hideModal();
  }
}
