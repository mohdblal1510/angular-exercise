import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SearchCompanyComponent } from './company/search-company/search-company.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,SearchCompanyComponent],
  template: `
    <router-outlet />
  `,
  styles: [],
})
export class AppComponent {
  title = 'angular-exercise';
}
