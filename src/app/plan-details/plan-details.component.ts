import { Component, inject } from "@angular/core";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { Insurance } from "../app-interface/insurance";
import { InsuranceService } from "../app-service/insurance.service";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-plan-details',
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  templateUrl: './plan-details.component.html',
  styleUrl: './plan-details.component.css'
})
export class PlanDetailsComponent {

  route: ActivatedRoute = inject(ActivatedRoute);
  insurance: Insurance | undefined;
  insuranceService: InsuranceService = inject(InsuranceService);
  estimatedPremium: string | undefined;

  premiumCalculation = new FormGroup({
    age: new FormControl(''),
    sumInsured: new FormControl(''),
    duration: new FormControl('')
  })

  calculatePremium() {
    this.estimatedPremium = (Number(this.insurance?.price) + Number(this.premiumCalculation.value.age) * 2 + Number(this.premiumCalculation.value.sumInsured) / 1000 + Number(this.premiumCalculation.value.duration) * 10).toFixed(2)
    console.log("Your Estimated Premium is", this.estimatedPremium)
  }

  constructor() {
    this.insuranceService.getInsuranceById(parseInt(this.route.snapshot.params['id'])).then(insurance => this.insurance = insurance);
  }
}