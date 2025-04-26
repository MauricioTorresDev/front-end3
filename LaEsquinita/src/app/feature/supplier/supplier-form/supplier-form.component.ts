import { NgIf } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Supplier } from '../../../core/interfaces/supplier';
import { SupplierService } from '../../../core/services/supplier.service';

@Component({
  selector: 'app-supplier-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, RouterLink],
  templateUrl: './supplier-form.component.html',
  styleUrls: ['./supplier-form.component.css']
})
export class SupplierFormComponent implements OnInit {
  supplierForm!: FormGroup;
  isEditMode = signal<boolean>(false);
  isLoading = signal<boolean>(false);
  supplierId = signal<number | null>(null);
  submitError = signal<string | null>(null);

  constructor(
    private fb: FormBuilder,
    private supplierService: SupplierService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.initForm();

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode.set(true);
      this.supplierId.set(Number(id));
      this.loadSupplierData(Number(id));
    } else {
      this.generateSupplierCode();
    }
  }

  initForm(): void {
    this.supplierForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      direction: ['', [Validators.required, Validators.maxLength(200)]],
      email: ['', [Validators.required, Validators.email]],
      ruc: ['', [Validators.required, Validators.pattern('^[0-9]{11}$')]],
      representative: ['', [Validators.required, Validators.maxLength(100)]],
      email_representative: ['', [Validators.required, Validators.email]],
      phone_representative: ['', [Validators.required, Validators.pattern('^[0-9]{9}$')]],
      status: ['A', Validators.required],
      code_supplier: ['', Validators.required]
    });
  }

  generateSupplierCode(): void {
    this.isLoading.set(true);

    this.supplierService.getSuppliers().subscribe({
      next: (suppliers) => {
        const maxId = suppliers.length > 0
          ? Math.max(...suppliers.map(s => s.id_supplier ?? 0))
          : 0;

        const newId = maxId + 1;

        const code = `P00${newId}`;
        this.supplierForm.get('code_supplier')?.setValue(code);

        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error fetching suppliers', error);
        this.isLoading.set(false);

        const fallbackCode = `P00${Math.floor(Math.random() * 1000)}`;
        this.supplierForm.get('code_supplier')?.setValue(fallbackCode);
      }
    });
  }


  loadSupplierData(id: number): void {
    this.isLoading.set(true);
    this.supplierService.getSupplierById(id).subscribe({
      next: (supplier) => {
        this.supplierForm.patchValue(supplier);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error loading supplier', error);
        this.isLoading.set(false);
        this.router.navigate(['/suppliers']);
      }
    });
  }

  onSubmit(): void {
    if (this.supplierForm.invalid) {
      this.supplierForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.submitError.set(null);

    const supplierData: Supplier = this.supplierForm.value;

    if (this.isEditMode()) {
      this.supplierService.patchSupplier(this.supplierId()!, supplierData).subscribe({
        next: () => {
          this.isLoading.set(false);
          this.router.navigate(['/suppliers']);
        },
        error: (error) => {
          console.error('Error updating supplier', error);
          this.isLoading.set(false);
          this.submitError.set('Ocurrió un error al actualizar el proveedor. Por favor, inténtalo de nuevo.');
        }
      });
    } else {
      this.supplierService.createSupplier(supplierData).subscribe({
        next: () => {
          this.isLoading.set(false);
          this.router.navigate(['/suppliers']);
        },
        error: (error) => {
          console.error('Error creating supplier', error);
          this.isLoading.set(false);
          this.submitError.set('Ocurrió un error al crear el proveedor. Por favor, inténtalo de nuevo.');
        }
      });
    }
  }

  hasError(controlName: string, errorType: string): boolean {
    const control = this.supplierForm.get(controlName);
    return control !== null && control.touched && control.hasError(errorType);
  }
}
