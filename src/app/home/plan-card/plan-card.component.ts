import { Component, Input } from "@angular/core";
import { RouterLink } from "@angular/router";
import { Insurance } from "../../app-interface/insurance";
import { CommonModule } from "@angular/common";

@Component({
    selector: 'app-plan-card',
    imports: [
        CommonModule,
        RouterLink
    ],
    templateUrl: './plan-card.component.html',
    styleUrl: './plan-card.component.css'
})
export class PlanCardComponent {

    @Input() insurance!: Insurance;

}