// src/app/feature/supplier/supplier-list/supplier-list.component.ts
import { Component, OnInit, signal } from '@angular/core';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Supplier } from '../../../core/interfaces/supplier';
import { SupplierService } from '../../../core/services/supplier.service';

@Component({
  selector: 'app-supplier-list',
  standalone: true,
  imports: [NgFor, NgIf, NgClass, RouterLink, FormsModule],
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.css']
})
export class SupplierListComponent implements OnInit {
  suppliers = signal<Supplier[]>([]);
  filteredSuppliers = signal<Supplier[]>([]);
  isLoading = signal<boolean>(true);
  searchTerm = signal<string>('');

  constructor(private supplierService: SupplierService) { }

  ngOnInit(): void {
    this.loadSuppliers();
  }

  loadSuppliers(): void {
    this.isLoading.set(true);
    this.supplierService.getSuppliers().subscribe({
      next: (data) => {
        this.suppliers.set(data);
        this.filteredSuppliers.set(data);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error loading suppliers', error);
        this.isLoading.set(false);
      }
    });
  }

  loadActiveSuppliers(): void {
    this.isLoading.set(true);
    this.supplierService.getSuppliersByStatus('A').subscribe({
      next: (data) => {
        this.suppliers.set(data);
        this.filteredSuppliers.set(data);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error loading active suppliers', error);
        this.isLoading.set(false);
      }
    });
  }

  loadInactiveSuppliers(): void {
    this.isLoading.set(true);
    this.supplierService.getSuppliersByStatus('I').subscribe({
      next: (data) => {
        this.suppliers.set(data);
        this.filteredSuppliers.set(data);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error loading inactive suppliers', error);
        this.isLoading.set(false);
      }
    });
  }

  onSearch(term: string): void {
    this.searchTerm.set(term);
    if (!term) {
      this.filteredSuppliers.set(this.suppliers());
      return;
    }

    const filtered = this.suppliers().filter(supplier =>
      supplier.name.toLowerCase().includes(term.toLowerCase()) ||
      supplier.ruc.includes(term) ||
      supplier.code_supplier.toLowerCase().includes(term.toLowerCase())
    );

    this.filteredSuppliers.set(filtered);
  }

  deleteSupplier(id: number): void {
    if (confirm('¿Estás seguro de eliminar este proveedor?')) {
      this.supplierService.deleteSupplier(id).subscribe({
        next: () => {
          this.loadSuppliers();
        },
        error: (error) => {
          console.error('Error deleting supplier', error);
        }
      });
    }
  }

  restoreSupplier(id: number): void {
    if (confirm('¿Estás seguro de restaurar este proveedor?')) {
      this.supplierService.restoreSupplier(id).subscribe({
        next: () => {
          this.loadSuppliers();
        },
        error: (error) => {
          console.error('Error restoring supplier', error);
        }
      });
    }
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
}
