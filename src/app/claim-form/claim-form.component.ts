import { Component } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
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
  claimSubmission = new FormGroup({
    name: new FormControl(''),
    policyId: new FormControl(''),
    claimReason: new FormControl(''),
    claimAmount: new FormControl('')
  })

  onSubmit() {
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
      return;
    }

    localStorage.setItem('claimList', JSON.stringify([submittedClaim]))
  }

  constructor() {
  }

}