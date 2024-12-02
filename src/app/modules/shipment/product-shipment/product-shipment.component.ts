import { Component, computed, effect, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ShipmentService } from '../../../services/shipment.service';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ShipmentFormSectionComponent } from '../../../shared/components/shipment-form-section/shipment-form-section.component';
import { Nature } from '../../../models/nature.model';


@Component({
  selector: 'app-product-shipment',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    InputGroupAddonModule,
    ButtonModule,
    InputGroupModule,
    InputNumberModule,
    InputTextareaModule,
    FormsModule,
    ShipmentFormSectionComponent,
  ],
  templateUrl: './product-shipment.component.html',
  styleUrl: './product-shipment.component.scss'
})
export class ProductShipmentComponent {
  private readonly fb = inject(FormBuilder);
  private shipmentService = inject(ShipmentService)
  public nature: Nature[] | undefined;
  public selectedNature: (Nature | null)[] = [];

  productsForm: FormGroup = this.fb.group({
    products: this.fb.array([this.createProductGroup()]),
    totalVolume: [{ value: 0, disabled: true }, Validators.required],
    totalWeight: [{ value: 0, disabled: true }, Validators.required],
    observations: ['Lorem ipsum dolor sit amet consectetur. Cursus porttitor sed est quis. Tellus sit gravida tincidunt vel sagittis platea volutpat scelerisque. Amet suspendisse pellentesque sed ut lacus. Pulvinar nunc ultrices ut scelerisque rhoncus.'],
  });

  // Signal to hold the form values
  public productsSignal = signal(this.productsForm.get('products')?.value || []);

  constructor() {
    effect(() => {
      this.productsForm.get('totalWeight')?.setValue(this.totalWeightSignal(), { emitEvent: false });
      this.productsForm.get('totalVolume')?.setValue(this.totalVolumeSignal(), { emitEvent: false });
    });

    // Subscribe to form changes and update the signal
    this.productsForm.valueChanges.pipe(takeUntilDestroyed()).subscribe(() => {
      this.productsSignal.set(this.productsForm.get('products')?.value || []);
    });
  }

  ngOnInit(): void {
    
  }

  // Derived signals
  public totalWeightSignal = computed(() =>
    this.productsSignal().reduce(
      (sum: any, product: any) => sum + (product.quantity * product.unitWeight || 0),
      0
    )
  );

  public totalVolumeSignal = computed(() =>
    this.productsSignal().reduce((sum: any, product: any) => sum + (product.volume || 0), 0)
  );



  createProductGroup(): FormGroup {
    return this.fb.group({
      nature: ['Tangibles', Validators.required],
      name: ['Bobina de Papel', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      volume: [0, [Validators.required, Validators.min(0)]],
      unitWeight: [0, [Validators.required, Validators.min(0)]],
      totalWeight: [{ value: 0, disabled: true }],
    });
  }

  get products(): FormArray {
    return this.productsForm.get('products') as FormArray;
  }

  addProduct(): void {
    this.products.push(this.createProductGroup());
  }

  removeProduct(index: number): void {
    this.products.removeAt(index);
  }

  public calculateRowWeight(index: number): number {
    const product = this.products.at(index).value;
    return product.quantity * product.unitWeight;
  }

  changeNatureProduct(event: any, index: number): void{
    this.selectedNature[index] = event.value;
  }


}
