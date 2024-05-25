import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CompanyService } from '../services/company.service';
import { ICompany, ICompanyResponse } from '../services/company.model';
import { NgFor, NgIf } from '@angular/common';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: `./search-results.component.html`,
  styleUrl: `./search-results.component.scss`
})

export class SearchResultsComponent {
  @Input() companies: ICompanyResponse | null = null;
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 0;
  @Output() pageChange = new EventEmitter<number>();

  constructor(private companyService:CompanyService, private router: Router){}

  onPageChange(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.pageChange.emit(page);
    }
  }

  viewCompanyDetails(company: ICompany): void {
    this.companyService.setSelectedCompany(company);
    this.router.navigate(['/company-details']);
  }

}
