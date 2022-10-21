import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter
} from '@angular/core';
import { InventoryItem } from '../../shared/models/InventoryItem';
import { InventoryAppService } from '../../core/services/inventory-service.service';
import { Router } from '@angular/router';
import { Commons } from 'src/app/shared/Commons';

@Component({
  selector: 'app-inventory-item-detail',
  templateUrl: './inventory-detail.component.html',
  styleUrls: ['./inventory-detail.component.css'],
})
export class InventoryItemDetailComponent implements OnInit {
  @Input() item: InventoryItem = new InventoryItem(0, '', 0, new Date());

   @Output() public updateSucc: EventEmitter<any>  = new EventEmitter();

  commons: Commons;

  constructor(public InventoryAppService: InventoryAppService, private router: Router) {
    this.commons = new Commons(this.InventoryAppService, this.router);
  }

  ngOnInit(): void {}

  UpdateInventoryItem(groupValue: boolean) {
    this.item.type = groupValue ? 1 : 0;
    this.InventoryAppService.UpdateInventoryItem(this.item).subscribe((res) => {
      if (res.result == 0) {
        this.commons.RefreshInventoryList();
        this.EmitUpdateSuccessfully();
      } else {
        alert(res.errors[0]);
      }
    });
  }

  EmitUpdateSuccessfully() {
    this.updateSucc.emit("The item was update successfully");
  }

  DeleteInventoryItem() {
    if (confirm('Do you really want to remove the task?')) {
      this.InventoryAppService.DeleteInventoryItem(this.item.name).subscribe((res) => {
        if (res.isValid) {
          this.commons.RefreshInventoryList();
        }else {
          alert(res.errors[0].errorMessage);
        }
      });
    }
  }
}
