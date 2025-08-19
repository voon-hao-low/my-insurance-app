import { Component } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { RouterModule } from "@angular/router";

@Component({
  selector: 'app-claim-form',
  imports: [
    RouterModule,
    ReactiveFormsModule
  ],
  templateUrl: './claim-form.component.html',
  styleUrl: './claim-form.component.css'
})
export class ClaimFormComponent {
  submitClaimVisible: boolean = false;
  claimId: number | undefined;

  claimSubmission = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(200)]),
    policyId: new FormControl('', [Validators.required, Validators.pattern('^PLC[0-9]{3,3}$')]),
    claimReason: new FormControl('', [Validators.required, Validators.maxLength(200)]),
    claimAmount: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')])
  })

  get name() {
    return this.claimSubmission.get('name')
  }

  get policyId() {
    return this.claimSubmission.get('policyId')
  }

  get claimReason() {
    return this.claimSubmission.get('claimReason')
  }

  get claimAmount() {
    return this.claimSubmission.get('claimAmount')
  }

  onSubmit() {
    if (this.claimSubmission.invalid) {
      this.claimSubmission.markAllAsTouched();
      return;
    }

    var seqNumString = localStorage.getItem('seqNum');
    localStorage.setItem('seqNum', (Number(seqNumString) + 1).toString())

    const submittedClaim = {
      name: this.claimSubmission.value.name,
      policyId: this.claimSubmission.value.policyId,
      claimReason: this.claimSubmission.value.claimReason,
      claimAmount: this.claimSubmission.value.claimAmount,
      claimId: Number(seqNumString),
      status: Math.floor(Math.random() * 10) === 0 ? 'Pending' : 'Approved'
    }

    var claimListString = localStorage.getItem('claimList');

    if (!!claimListString) {
      var claimList: object[] = JSON.parse(claimListString);
      claimList.push(submittedClaim)

      localStorage.setItem('claimList', JSON.stringify(claimList));
    } else {
      localStorage.setItem('claimList', JSON.stringify([submittedClaim]))
    }

    this.claimId = Number(seqNumString);
    this.submitClaimVisible = true;
  }

  onClose() {
    this.claimId = undefined;
    this.submitClaimVisible = false;
  }

  constructor() {
  }

}