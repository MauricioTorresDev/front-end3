// src/app/feature/supplier/supplier-view/supplier-view.component.ts
import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgIf, NgClass } from '@angular/common';
import { SupplierService } from '../../../core/services/supplier.service';
import { Supplier } from '../../../core/interfaces/supplier';

@Component({
  selector: 'app-supplier-view',
  standalone: true,
  imports: [NgIf, NgClass, RouterLink],
  templateUrl: './supplier-view.component.html',
  styleUrls: ['./supplier-view.component.css']
})
export class SupplierViewComponent implements OnInit {
  supplier = signal<Supplier | null>(null);
  isLoading = signal<boolean>(true);
  error = signal<string | null>(null);

  constructor(
    private supplierService: SupplierService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadSupplier(Number(id));
    } else {
      this.router.navigate(['/suppliers']);
    }
  }

  loadSupplier(id: number): void {
    this.isLoading.set(true);
    this.supplierService.getSupplierById(id).subscribe({
      next: (data) => {
        this.supplier.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error loading supplier details', err);
        this.error.set('No se pudo cargar la información del proveedor');
        this.isLoading.set(false);
      }
    });
  }

  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'a':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'i':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  }

  getStatusText(status: string): string {
    switch (status.toLowerCase()) {
      case 'a':
        return 'Activo';
      case 'i':
        return 'Inactivo';
      default:
        return status;
    }
  }

  deleteSupplier(id: number): void {
    if (confirm('¿Estás seguro de eliminar este proveedor?')) {
      this.isLoading.set(true);
      this.supplierService.deleteSupplier(id).subscribe({
        next: () => {
          this.router.navigate(['/suppliers']);
        },
        error: (err) => {
          console.error('Error deleting supplier', err);
          this.error.set('No se pudo eliminar el proveedor');
          this.isLoading.set(false);
        }
      });
    }
  }

  restoreSupplier(id: number): void {
    if (confirm('¿Estás seguro de restaurar este proveedor?')) {
      this.isLoading.set(true);
      this.supplierService.restoreSupplier(id).subscribe({
        next: () => {
          this.loadSupplier(id);
        },
        error: (err) => {
          console.error('Error restoring supplier', err);
          this.error.set('No se pudo restaurar el proveedor');
          this.isLoading.set(false);
        }
      });
    }
  }
}
