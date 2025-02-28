import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Pagination } from '../../shared/models/pagination';
import { Product } from '../../shared/models/product';
import { Observable } from 'rxjs';
import { ShopParams } from '../../shared/ShopParams';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl = 'https://localhost:5001/api/'
  private http = inject(HttpClient);
  types: string[] = [];
  brands: string[] = [];

  getProducts(shopParam: ShopParams) {
    let param = new HttpParams();

    if (shopParam.brands.length > 0) {
      param = param.append('brands', shopParam.brands.join(','));
    }

    if (shopParam.types.length > 0) {
      param = param.append('types', shopParam.types.join(','));
    }

    if (shopParam.sort) {
      param = param.append('sort', shopParam.sort);
    }

    param = param.append('pageSize', shopParam.pageSize);
    param = param.append('pageIndex', shopParam.pageNumber);

    if (shopParam.search) {
      param = param.append('search', shopParam.search);
    }

    return this.http.get<any>(this.baseUrl + 'products', {
      params: param
    });
  }

  getProduct(id: number){
    return this.http.get<Product>(this.baseUrl + 'products/' + id);
  }

  getBrands() {
    return this.http.get<string[]>(this.baseUrl + 'products/brands');
  }

  getBrands1() {
    this.http.get<any>(this.baseUrl + 'products/brands').subscribe({
      next: resp => {
        this.brands = resp;
        console.log(resp);
      }
    });

    return this.brands;

    //return this.http.get<any>(this.baseUrl + 'products/brands');

  }

  // getBrands() {
  //    this.http.get<any>(this.baseUrl + 'products/brands').subscribe({
  //     next: (resp) => {
  //       this.brands = resp;
  //       //console.log(this.brands);
  //     }
  //   });
  //   console.log(this.brands);

  //   return this.brands;
  // }

  getTypes() {
    //   return this.http.get<string[]>(this.baseUrl + 'products/types').subscribe({
    //       next: resp => this.types = resp 
    // });

    return this.http.get<any>(this.baseUrl + 'products/types');

  }
}
