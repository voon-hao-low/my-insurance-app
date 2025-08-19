import { Component, inject, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { LoadingService } from "../app-service/loading.service";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { AsyncPipe } from "@angular/common";

@Component({
    selector: "loading-spinner",
    standalone: true,
    imports: [
        MatProgressSpinnerModule,
        AsyncPipe
    ],
    templateUrl: "./loading-spinner.component.html",
    styleUrls: ["./loading-spinner.component.css"],
})
export class LoadingSpinnerComponent implements OnInit {
    loading$: Observable<boolean>;
    loadingService: LoadingService = inject(LoadingService);

    ngOnInit() { }

    constructor() {
        this.loading$ = this.loadingService.loading$;
    }
}