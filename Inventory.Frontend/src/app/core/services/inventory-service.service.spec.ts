import { TestBed } from '@angular/core/testing';
import { InventoryItem } from '../../shared/models/InventoryItem';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { InventoryAppService } from './inventory-service.service';
import { Observable, of } from 'rxjs';

describe('InventoryAppService', () => {
  let service: InventoryAppService;
  let httpClientSpy: {
    post: jasmine.Spy,
    put: jasmine.Spy,
    delete: jasmine.Spy,
    get: jasmine.Spy,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [InventoryAppService],
    });
    httpClientSpy = jasmine.createSpyObj('HttpClient', [
      'post',
      'put',
      'get',
      'delete',
    ]);
    service = new InventoryAppService(httpClientSpy as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should the length at the beginning be 0', () => {
    expect(service.allInventoryItems.length).toEqual(0);
  });

  //CreateInventoryItem should the response No Errors
  it('CreateInventoryItem should the response No Errors', (done: DoneFn) => {
    const mocResultCreate = {
      data: {
        result: 0,
        errors: [],
      },
    };
    httpClientSpy.post.and.returnValue(of(mocResultCreate));

    service
      .CreateInventoryItem('Desc 1')
      .subscribe((res) => expect(res).toEqual(mocResultCreate));
    done();
  });

  //CreateInventoryItem should the response No Errors
  it('CreateInventoryItem should the response Errors', (done: DoneFn) => {
    const mocResultCreate = {
      data: {
        result: 2,
        errors: ['The field Name must be have value'],
      },
    };
    httpClientSpy.post.and.returnValue(of(mocResultCreate));

    service
      .CreateInventoryItem('', 1, new Date())
      .subscribe((res) => expect(res).toEqual(mocResultCreate));
    done();
  });

  //UpdateInventoryItem should the response No Errors
  it('UpdateInventoryItem should the response No Errors', (done: DoneFn) => {
    const mocResultCreate = {
      data: {
        result: 0,
        errors: [],
      },
    };
    httpClientSpy.put.and.returnValue(of(mocResultCreate));
    
    service
      .UpdateInventoryItem(new InventoryItem(1, 'Desc 2', 0, new Date()))
      .subscribe((res) => expect(res).toEqual(mocResultCreate));
    done();
  });

  //UpdateInventoryItem should the response with Errors
  it('UpdateInventoryItem should the response with Errors', (done: DoneFn) => {
    const mocResultCreate = {
      data: {
        result: 2,
        errors: ['The field Id must be a non negative value'],
      },
    };
    httpClientSpy.put.and.returnValue(of(mocResultCreate));

    service
      .UpdateInventoryItem(new InventoryItem(-1, 'Desc 2', 0, new Date()))
      .subscribe((res) => expect(res).toEqual(mocResultCreate));
    done();
  });

  //DeleteInventoryItem should the response No Errors
  it('DeleteInventoryItem should the response No Errors', (done: DoneFn) => {
    const mocResultCreate = {
      data: {
        result: 0,
        errors: [],
      },
    };
    httpClientSpy.delete.and.returnValue(of(mocResultCreate));

    service
      .DeleteInventoryItem(1)
      .subscribe((res) => expect(res).toEqual(mocResultCreate));
    done();
  });

  
   //DeleteInventoryItem should the response No Errors
   it('Get should the response No Errors', (done: DoneFn) => {
    const mocResultCreate = [new InventoryItem(1, 'Desc 2', 0, new Date())];     
    
    httpClientSpy.get.and.returnValue(of(mocResultCreate));

    service.GetInventoryList();
    expect(service.allInventoryItems).toEqual(mocResultCreate);
    done();
  });
});
