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
  displayClaimList: Claim[] = [];
  claimService: ClaimService = inject(ClaimService)
  isSearchByPolicyId: boolean = false;
  searchText: string = '';
  debounceTimeout: any;
  page: number = 1;
  pageSize: number = 10;
  totalPages: number = 0;

  get visiblePages(): number[] {
    const startPage = Math.max(1, this.page - 2);
    const endPage = Math.min(this.totalPages, startPage + 4);
    const adjustedStartPage = Math.max(1, endPage - 4);

    return Array.from({ length: endPage - adjustedStartPage + 1 }, (_, i) => adjustedStartPage + i);
  }

  calculatePagination(listToSlice: Claim[]): void {
    var startIndex = (this.page - 1) * this.pageSize;
    var endIndex = startIndex + this.pageSize;

    this.totalPages = Math.ceil(listToSlice.length / 10);
    this.displayClaimList = listToSlice.slice(startIndex, endIndex);
  }

  onSearch() {
    clearTimeout(this.debounceTimeout);
    this.debounceTimeout = setTimeout(() => {
      if (!this.searchText) {
        this.filteredClaimList = this.claimList;
      } else {
        this.filteredClaimList = this.claimService.getFilteredClaim(this.isSearchByPolicyId, this.searchText)
      }

      this.page = 1;
      this.calculatePagination(this.filteredClaimList);
    }, 1000);
  }

  onPagination(pageModify: number): void {
    this.page = pageModify;
    this.calculatePagination(this.filteredClaimList);
  }

  constructor() {
    this.claimList = this.claimService.getAllClaim();
    this.filteredClaimList = this.claimService.getAllClaim();
    this.calculatePagination(this.claimList);
  }
}