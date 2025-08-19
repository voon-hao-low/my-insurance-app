import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterLink,
    RouterOutlet,
    LoadingSpinnerComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class App {
  protected readonly title = 'my-insurance-app';

  isDropdownOpen: boolean = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  constructor() {
    localStorage.clear()
    localStorage.setItem('seqNum', '1')
  }
}
