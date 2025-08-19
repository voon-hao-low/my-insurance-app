import { Component, inject } from "@angular/core";
import { RouterModule } from "@angular/router";
import { PlanCardComponent } from "./plan-card/plan-card.component";
import { Insurance } from "../app-interface/insurance";
import { CommonModule } from "@angular/common";
import { InsuranceService } from "../app-service/insurance.service";
import { FormsModule } from "@angular/forms";
import { LoadingService } from "../app-service/loading.service";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    PlanCardComponent,
    MatProgressSpinnerModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  loadingService: LoadingService = inject(LoadingService);
  insuranceList: Insurance[] = [];
  filteredInsuranceList: Insurance[] = [];
  displayInsuranceList: Insurance[] = [];
  insuranceService: InsuranceService = inject(InsuranceService);
  isSearchByCategory: boolean = false;
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

  calculatePagination(listToSlice: Insurance[]): void {
    var startIndex = (this.page - 1) * this.pageSize;
    var endIndex = startIndex + this.pageSize;

    this.displayInsuranceList = listToSlice.slice(startIndex, endIndex);
    this.totalPages = Math.ceil(listToSlice.length / 10);
  }

  onSearch(): void {
    clearTimeout(this.debounceTimeout);
    this.debounceTimeout = setTimeout(() => {
      if (!this.searchText) {
        this.filteredInsuranceList = this.insuranceList;
      } else {
        this.filteredInsuranceList = this.insuranceService.getFilteredInsurance(this.isSearchByCategory, this.searchText);
      }

      this.page = 1;
      this.calculatePagination(this.filteredInsuranceList);
    }, 1000);
  }

  onPagination(pageModify: number): void {
    this.page = pageModify;
    this.calculatePagination(this.filteredInsuranceList);
  }

  constructor() {
    this.loadingService.loadingOn();
    this.insuranceService.getAllInsurance().then(insuranceList => {
      this.insuranceList = insuranceList;
      this.filteredInsuranceList = insuranceList;
      this.calculatePagination(insuranceList);
    }).finally(() => this.loadingService.loadingOff());
  }
}