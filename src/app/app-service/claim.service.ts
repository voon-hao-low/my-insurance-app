import { Injectable } from '@angular/core';
import { Claim } from '../app-interface/claim';

@Injectable({
  providedIn: 'root'
})

export class ClaimService {

  claimList: Claim[] = [];

  getAllClaim(): Claim[] {
    var claimListString = localStorage.getItem('claimList');

    if (!!claimListString) {
      this.claimList = JSON.parse(claimListString);
    }

    return this.claimList;
  }

  getFilteredClaim(isSearchByPolicyId: boolean, value: string): Claim[] {
    if (isSearchByPolicyId) {
      return this.claimList.filter(item =>
        item.policyId.toLowerCase().includes(value.toLowerCase())
      );
    }

    return this.claimList.filter(item =>
      item.claimId === Number(value)
    );
  }
}