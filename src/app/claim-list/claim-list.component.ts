import { Component, inject } from "@angular/core";
import { RouterModule } from "@angular/router";
import { Claim } from "../app-interface/claim";
import { FormsModule } from "@angular/forms";
import { ClaimService } from "../app-service/claim.service";

@Component({
  selector: 'app-claim-list',
  imports: [
    RouterModule,
    FormsModule
  ],
  templateUrl: './claim-list.component.html',
  styleUrl: './claim-list.component.css'
})
export class ClaimListComponent {
  claimList: Claim[] = [];
  filteredClaimList: Claim[] = [];
  claimService: ClaimService = inject(ClaimService)
  isSearchByPolicyId: boolean = false;
  searchText: string = '';
  debounceTimeout: any;

  onSearch() {
    if (!this.searchText) {
      this.filteredClaimList = this.claimList;
      return;
    }

    clearTimeout(this.debounceTimeout);
    this.debounceTimeout = setTimeout(() => {
      this.filteredClaimList = this.claimService.getFilteredClaim(this.isSearchByPolicyId, this.searchText)
    }, 1000);
  }

  constructor() {
    this.claimList = this.claimService.getAllClaim();
    this.filteredClaimList = this.claimService.getAllClaim();
  }
}