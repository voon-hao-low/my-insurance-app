import { Component, inject } from "@angular/core";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { Insurance } from "../app-interface/insurance";
import { InsuranceService } from "../app-service/insurance.service";
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-plan-details',
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './plan-details.component.html',
  styleUrl: './plan-details.component.css'
})
export class PlanDetailsComponent {

  route: ActivatedRoute = inject(ActivatedRoute);
  insurance: Insurance | undefined;
  insuranceService: InsuranceService = inject(InsuranceService);
  estimatedPremium: string | undefined;
  calculationResultVisible: boolean = false;

  premiumCalculation = new FormGroup({
    age: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
    sumInsured: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*000$')]),
    duration: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')])
  })

  get age() {
    return this.premiumCalculation.get('age');
  }

  get sumInsured() {
    return this.premiumCalculation.get('sumInsured');
  }

  get duration() {
    return this.premiumCalculation.get('duration');
  }

  onCalculate() {
    if (this.premiumCalculation.invalid) {
      this.premiumCalculation.markAllAsTouched();
      return;
    }

    this.estimatedPremium = (Number(this.insurance?.price) + Number(this.premiumCalculation.value.age) * 2 + Number(this.premiumCalculation.value.sumInsured) / 1000 + Number(this.premiumCalculation.value.duration) * 10).toFixed(2)
    this.calculationResultVisible = true;
  }

  onClose() {
    this.calculationResultVisible = false;
  }

  constructor() {
    this.insuranceService.getInsuranceById(parseInt(this.route.snapshot.params['id'])).then(insurance => this.insurance = insurance);
  }
}