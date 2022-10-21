import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { InventoryItem } from '../../shared/models/InventoryItem';
import { InventoryAppService } from '../../core/services/inventory-service.service';

import { InventoryItemDetailComponent } from './inventory-detail.component';

describe('InventoryItemDetailComponent', () => {
  let component: InventoryItemDetailComponent;
  let fixture: ComponentFixture<InventoryItemDetailComponent>;
  let service: InventoryAppService;
  let httpClientSpy: {
    post: jasmine.Spy,
    put: jasmine.Spy,
    delete: jasmine.Spy,
    get: jasmine.Spy,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryItemDetailComponent ]
      ,imports: [HttpClientTestingModule], 
    })
    .compileComponents();

    httpClientSpy = jasmine.createSpyObj('HttpClient', [
      'post',
      'put',
      'get',
      'delete',
    ]);
    service = new InventoryAppService(httpClientSpy as any);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryItemDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //DeleteInventoryItem result 0
  it('DeleteInventoryItem length result 0', () => {
    component.InventoryAppService = service;
    component.item.id == 1;
    
    const mocResultCreate = {
      result: 0,
      errors: [],
  };
  const mocResultGet = [new InventoryItem(1, 'Desc 2', 0, new Date())];     
    
  httpClientSpy.get.and.returnValue(of(mocResultGet));
    httpClientSpy.delete.and.returnValue(of(mocResultCreate));

    component.DeleteInventoryItem();
    expect(component.InventoryAppService.allInventoryItems.length).toEqual(1);
  });

    //UpdateInventoryItem result 0
    it('UpdateInventoryItem result 0', () => {
      component.InventoryAppService = service;
      
      const mocResultCreate = {
        result: 0,
        errors: [],
    };

    const mocResultGet = [new InventoryItem(1, 'Desc 2', 0, new Date())];     
    
    httpClientSpy.get.and.returnValue(of(mocResultGet));
      httpClientSpy.put.and.returnValue(of(mocResultCreate));
      
      component.UpdateInventoryItem(true);
      expect(component.InventoryAppService.allInventoryItems.length).toEqual(1);
    });

      //DeleteInventoryItem result 1
  it('DeleteInventoryItem result 1', () => {
    component.InventoryAppService = service;
    component.item.id == 1;
    const mocResultCreate = {
      result: 1,
      errors: [],
  };
  const mocResultGet = [new InventoryItem(1, 'Desc 2', 0, new Date())];     
    
  httpClientSpy.get.and.returnValue(of(mocResultGet));
    httpClientSpy.delete.and.returnValue(of(mocResultCreate));

    component.DeleteInventoryItem();
    expect(component.InventoryAppService.allInventoryItems.length).toEqual(0);
  });

    //UpdateInventoryItem length equals to 0
    it('UpdateInventoryItem result 1', () => {
      component.InventoryAppService = service;
      
      const mocResultCreate = {
        result: 1,
        errors: [],
    };

    const mocResultGet = [new InventoryItem(1, 'Desc 2', 0, new Date())];     
    
    httpClientSpy.get.and.returnValue(of(mocResultGet));
      httpClientSpy.put.and.returnValue(of(mocResultCreate));
      
      component.UpdateInventoryItem(true);
      expect(component.InventoryAppService.allInventoryItems.length).toEqual(0);
    });
});
