import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Commons } from 'src/app/shared/Commons';
import { InventoryAppService } from '../../core/services/inventory-service.service';

@Component({
  selector: 'app-inventory-item-form',
  templateUrl: './inventory-form.component.html',
  styleUrls: ['./inventory-form.component.css'],
})
export class InventoryItemFormComponent implements OnInit {
  constructor(public InventoryAppService: InventoryAppService, private router: Router) {}
  @Output() public updateSucc: EventEmitter<string>  = new EventEmitter<string>();
  
  ngOnInit(): void {
    this.expirationDate = new Date();
  }

  public name: string = '';
  public type: number = 0;
  public expirationDate: Date = new Date();

  
  EmitUpdateSuccessfully() {
    this.updateSucc.emit("The item was create successfully");
  }

  
  ResetFields = () => {
    this.name = '';
    this.expirationDate = new Date();
    this.type = 0;
  };


  CreateInventoryItem() {

    console.log(Object.prototype.toString.call(this.expirationDate));
    console.log(this.expirationDate);
    // if(Object.prototype.toString.call(this.expirationDate) !== '[object Date]')
    // {
    //   alert('The field Expiration Date must be have a date value');
    //   return;
    // }

    if (!this.name) {
      alert('The field Name must be have value');
      return;
    }

    if (!this.type ||  isNaN(this.type)) {
      alert('The field Type must be have a numeric value');
      return;
    }

    this.InventoryAppService.CreateInventoryItem(this.name, this.type, this.expirationDate).subscribe((res) => {
      console.log(res);
      if (res.isValid) {
        this.ResetFields();       

        //refresh      
        new Commons(this.InventoryAppService, this.router).RefreshInventoryList();
        this.EmitUpdateSuccessfully();
      } else {
        alert(res.errors[0].errorMessage);
      }
    });
  }
}
