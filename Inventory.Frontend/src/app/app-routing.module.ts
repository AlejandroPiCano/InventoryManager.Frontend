import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventoryItemsListComponent } from './components/inventory-items-list/inventory-items-list.component';

const routes: Routes = [
  { path: '', component: InventoryItemsListComponent},
    { path: 'inventories', component: InventoryItemsListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
