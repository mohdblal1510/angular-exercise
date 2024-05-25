import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from '../services/company.service';
import { ICompanyResponse } from '../services/company.model';
import { SearchResultsComponent } from '../search-results/search-results.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-company',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,SearchResultsComponent,CommonModule],
  templateUrl: './search-company.component.html',
  styles: ``
})
export class SearchCompanyComponent implements OnInit {

  constructor(private router: Router, 
    private route: ActivatedRoute, 
    private companyService:CompanyService,
    private formBuilder: FormBuilder) {}

  searchForm!: FormGroup;
  companies: ICompanyResponse | null = null;
  displayedCompanies: ICompanyResponse | null = null;
  isLoading = false;
  error = false;
  currentPage = 1;

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      searchTerm: ['', Validators.required]
    });
    this.companyService.companies$.subscribe(data => {
      this.companies = data;
    });
    this.companyService.displayedCompanies$.subscribe(data => {
      this.displayedCompanies = data;
    });
    this.companyService.currentPage$.subscribe(data => {
      this.currentPage = data;
    });
  }

  get searchTermControl() {
    return this.searchForm.get('searchTerm');
  }

  onSearch() {
    if (this.searchForm.invalid) {
      return;
    }

    const searchTerm = this.searchTermControl?.value;
    this.isLoading = true;
    this.error = false;
    
    this.companyService.searchCompanies(searchTerm).subscribe(()=> {
        this.isLoading = false;
        this.currentPage = 1;
        this.companyService.updateDisplayedCompanies();
      },
      err => {
        this.isLoading = false;
        this.error = true;
      }
    );
  }

  onPageChange(page: number) {
    this.companyService.updateCurrentPage(page);
    //this.currentPage = page;
    this.companyService.updateDisplayedCompanies();
  }

  totalPages(): number {
    return this.companyService.totalPages();
  }

  onSearchAgain() {
    this.companies = null;
    this.displayedCompanies = null;
    this.searchForm.reset();
  }
}
