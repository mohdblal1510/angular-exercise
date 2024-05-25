import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../services/company.service';
import { OfficerResponse } from '../services/officer.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-officers-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: `./officers-list.component.html`,
  styles: ``
})
export class OfficersListComponent implements OnInit {
  officerResponse: OfficerResponse | null = null;
  companyName?:string = '';
  companyNumber?:string = '';

  constructor(private companyService: CompanyService, private router: Router) { }

  ngOnInit(): void {
    this.companyService.selectedCompany$.subscribe(data => {this.companyName = data?.title})
    this.companyService.selectedCompany$.subscribe(data => {this.companyNumber = data?.company_number})

    if (this.companyNumber)
    {
    this.companyService.getCompanyOfficers(this.companyNumber).subscribe(response => {
      this.officerResponse = response;
    });
    }
  }

  goBack(): void {
    this.router.navigate(['/company-details']); 
  }
}
