import { inject, Injectable } from '@angular/core';
import { Insurance } from '../app-interface/insurance';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root'
})

export class InsuranceService {

  insuranceList: Insurance[] = [];

  async getAllInsurance(): Promise<Insurance[]> {
    const result = await fetch('https://dummyjson.com/products?limit=194&select=id,title,category,price,thumbnail');
    const data = await result.json() ?? {};

    if (!!data.products) {
      this.insuranceList = data.products.map((product: { id: any; title: any; category: any; price: any; thumbnail: any; }) => ({
        id: product.id,
        planName: product.title,
        category: product.category,
        price: product.price,
        image: product.thumbnail
      }));
    }

    return this.insuranceList;
  }

  getFilteredInsurance(isSearchByCategory: boolean, value: string): Insurance[] {
    return this.insuranceList
      .filter(insurance => (isSearchByCategory ? insurance.category : insurance.planName)
        .toLowerCase().includes(value.toLowerCase()));
  }

  async getInsuranceById(id: number): Promise<Insurance | undefined> {
    const result = await fetch('https://dummyjson.com/products/' + id + '?select=id,title,description,category,price,warrantyInformation,thumbnail');
    const data = await result.json();
    if (!!data) {
      return {
        id: data.id,
        planName: data.title,
        category: data.category,
        price: data.price,
        description: data.description,
        coverageDetail: data.warrantyInformation,
        image: data.thumbnail
      }
    }

    return undefined;
  }
}