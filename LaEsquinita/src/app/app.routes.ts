// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { SupplierListComponent } from './feature/supplier/supplier-list/supplier-list.component';
import { SupplierFormComponent } from './feature/supplier/supplier-form/supplier-form.component';
import { SupplierViewComponent } from './feature/supplier/supplier-view/supplier-view.component';

export const routes: Routes = [
     { path: '', redirectTo: 'suppliers', pathMatch: 'full' },
     { path: 'suppliers', component: SupplierListComponent },
     { path: 'suppliers/new', component: SupplierFormComponent },
     { path: 'suppliers/view/:id', component: SupplierViewComponent },
     { path: 'suppliers/edit/:id', component: SupplierFormComponent },
     { path: '**', redirectTo: 'suppliers' }
];
