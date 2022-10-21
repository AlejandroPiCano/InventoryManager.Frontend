import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';
import { InventoryItemsListComponent } from './inventory-items-list.component';
import { InventoryItem } from '../../shared/models/InventoryItem';

describe('InventoryItemsListComponent', () => {
  let component: InventoryItemsListComponent;
  let fixture: ComponentFixture<InventoryItemsListComponent>;
  

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryItemsListComponent ]
      ,imports: [HttpClientTestingModule], 
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryItemsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

    //getItemsFilter length equals to 0
    it('getItemsFilter length equals to 0', () => {
      component.InventoryAppService.allInventoryItems = [new InventoryItem(1, 'Desc 2', 0, new Date())];
      
      var itemsFilter = component.getItemsFilter(1);
      expect(itemsFilter.length).toEqual(0);
    });

       //getItemsFilter length equals to 0
       it('getItemsFilter length equals to 0 with empty list', () => {
        component.InventoryAppService.allInventoryItems = [];
        
        var itemsFilter = component.getItemsFilter(0);
        expect(itemsFilter.length).toEqual(0);
      });

     //getItemsFilter length equals to 0
     it('getItemsFilter length equals to 1', () => {
      component.InventoryAppService.allInventoryItems = [new InventoryItem(1, 'Desc 2', 1, new Date())];
      
      var itemsFilter = component.getItemsFilter(1);
      expect(itemsFilter.length).toEqual(1);
    });


});
