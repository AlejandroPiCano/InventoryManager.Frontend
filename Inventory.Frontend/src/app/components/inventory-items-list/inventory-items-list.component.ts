import { Component, OnInit } from '@angular/core';
import { InventoryItem } from '../../shared/models/InventoryItem';
import { InventoryAppService } from '../../core/services/inventory-service.service';
import { Router } from '@angular/router';
import { Commons } from 'src/app/shared/Commons';
import { NavBarService } from 'src/app/shared/nav-bar.service';

@Component({
  selector: 'app-inventory-items-list',
  templateUrl: './inventory-items-list.component.html',
  styleUrls: ['./inventory-items-list.component.css'],
})

export class InventoryItemsListComponent implements OnInit {
  public Title: string = 'Inventory List';
  public showingMessage: boolean = false;
  public message: string = '';
  public InventoryItemExample: InventoryItem = new InventoryItem(1,"de prueba output", 1, new Date());

  constructor(
    public InventoryAppService: InventoryAppService,
    private router: Router,
    private nav: NavBarService
  ) {}

  ngOnInit(): void {
    this.nav.show();
    new Commons(this.InventoryAppService, this.router).RefreshInventoryList();
  }

  getItemsFilter(groupId: number): InventoryItem[] {
    return this.InventoryAppService.allInventoryItems.filter((i) => i.type == groupId);
  }

  showMessage(message: string) {
    this.showingMessage = true;
    this.message = message;

    setTimeout(() => {
      this.message = '';
      this.showingMessage = false;
    }, 3000);
  }
}
