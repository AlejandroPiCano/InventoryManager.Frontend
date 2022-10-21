import { Router } from '@angular/router';
import { InventoryAppService } from '../core/services/inventory-service.service';
import { InventoryItem } from './models/InventoryItem';

export class Commons {
  constructor(private InventoryAppService: InventoryAppService, private router: Router) {}

  RefreshInventoryList() {
    this.InventoryAppService.GetInventoryList().subscribe({
      next: (result) => {        
        this.InventoryAppService.allInventoryItems = result as InventoryItem[];
      },
      error: (err) => {
        console.log(err);

        if (err.status == 403) {
          this.router.navigate(['inventories']);
        } else if (err.status == 401) {
          this.router.navigate(['inventories']);
        }
      },
    });
  }
}
