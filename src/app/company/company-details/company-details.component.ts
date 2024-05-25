import { Component, OnInit } from '@angular/core';
import { ICompany } from '../services/company.model';
import { CompanyService } from '../services/company.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: `./company-details.component.html`,
  styles: ``
})
export class CompanyDetailsComponent implements OnInit {
  company: ICompany | null | undefined;

  constructor(private companyService:CompanyService, private router: Router) { }

  ngOnInit(): void {
    this.companyService.selectedCompany$.subscribe(data => {
      this.company = data;
    });
  }

  goBack(): void {
    this.router.navigate(['/search']); // Change to your actual results route
  }

  listOfficers(companyNumber:string){
    this.router.navigate(
      ['company-details/list-officers']
    );
  }
}