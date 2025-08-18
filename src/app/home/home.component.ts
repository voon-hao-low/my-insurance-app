import { Component, inject } from "@angular/core";
import { RouterModule } from "@angular/router";
import { PlanCardComponent } from "./plan-card/plan-card.component";
import { Insurance } from "../app-interface/insurance";
import { CommonModule } from "@angular/common";
import { InsuranceService } from "../app-service/insurance.service";
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    PlanCardComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  insuranceList: Insurance[] = [];
  filteredInsuranceList: Insurance[] = [];
  insuranceService: InsuranceService = inject(InsuranceService);
  isSearchByCategory: boolean = false;
  searchText: string = '';
  debounceTimeout: any;

  onSearch(): void {
    if (!this.searchText) {
      this.filteredInsuranceList = this.insuranceList;
      return
    }

    clearTimeout(this.debounceTimeout);
    this.debounceTimeout = setTimeout(() => {
      this.filteredInsuranceList = this.insuranceService.getFilteredInsurance(this.isSearchByCategory, this.searchText);
    }, 1000);
  }

  constructor() {
    this.insuranceService.getAllInsurance().then(insuranceList => {
      this.insuranceList = insuranceList;
      this.filteredInsuranceList = insuranceList
    });
  }
}