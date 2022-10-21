import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryItemFormComponent } from './inventory-form.component';
import { InventoryItem } from '../../shared/models/InventoryItem';
import { InventoryAppService } from '../../core/services/inventory-service.service';
import { of } from 'rxjs';

describe('InventoryItemFormComponent', () => {
  let component: InventoryItemFormComponent;
  let service: InventoryAppService;
  let httpClientSpy: {
    post: jasmine.Spy,
    put: jasmine.Spy,
    delete: jasmine.Spy,
    get: jasmine.Spy,
  };
  let fixture: ComponentFixture<InventoryItemFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      declarations: [ InventoryItemFormComponent ]
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
    fixture = TestBed.createComponent(InventoryItemFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

   //CreateInventoryItem length equals to 0
   it('CreateInventoryItem result equals to 0', () => {
    component.InventoryAppService = service;
    component.name = "Desc";
    const mocResultCreate = {
        result: 0,
        errors: [],
    };
    
    httpClientSpy.post.and.returnValue(of(mocResultCreate));
    const mocResultGet = [new InventoryItem(1, 'Desc 2', 0, new Date())];     
      httpClientSpy.get.and.returnValue(of(mocResultGet));

    component.CreateInventoryItem();
    expect(component.InventoryAppService.allInventoryItems.length).toEqual(1);
  });

     //CreateInventoryItem length equals to 0
     it('CreateInventoryItem without desc', () => {
      component.InventoryAppService = service;
      component.name = "";
      const mocResultCreate = {
          result: 0,
          errors: [],
      };
      
      httpClientSpy.post.and.returnValue(of(mocResultCreate));
      const mocResultGet = [new InventoryItem(1, 'Desc 2', 0, new Date())];     
        httpClientSpy.get.and.returnValue(of(mocResultGet));
  
      component.CreateInventoryItem();
      expect(component.InventoryAppService.allInventoryItems.length).toEqual(0);
    });

     //CreateInventoryItem length equals to 0
     it('CreateInventoryItem result equals to 1', (done: DoneFn) => {
      component.InventoryAppService = service;
      component.name = "Desc";
      const mocResultCreate = {
          result: 1,
          errors: ["Error"],
      };
      
      httpClientSpy.post.and.returnValue(of(mocResultCreate));
      const mocResultGet = [new InventoryItem(1, 'Desc 2', 0, new Date())];     
      httpClientSpy.get.and.returnValue(of(mocResultGet));
  
      component.CreateInventoryItem();
      expect(component.InventoryAppService.allInventoryItems.length).toEqual(0);
      done();
    });
});
