import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { ICompany, ICompanyResponse } from './company.model';
import { OfficerResponse } from './officer.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  pageSize = 5; 

  private companiesSubject = new BehaviorSubject<ICompanyResponse | null>((null));
  private selectedCompanySubject = new BehaviorSubject<ICompany | null>((null));
  private displayedCompaniesSubject = new BehaviorSubject<ICompanyResponse | null>((null));
  private currentPageSubject = new BehaviorSubject<number>(1);

  private companiesApiUrl = '/api/TruProxyAPI/rest/Companies/v1/Search?Query=';
  private officersApiUrl = '/api/TruProxyAPI/rest/Companies/v1/Officers?CompanyNumber=';

  companies$ = this.companiesSubject.asObservable();
  selectedCompany$ = this.selectedCompanySubject.asObservable();
  displayedCompanies$ = this.displayedCompaniesSubject.asObservable();
  currentPage$ = this.currentPageSubject.asObservable();

  constructor(private http:HttpClient) { }

   searchCompanies(searchTerm: string): Observable<void> {
    const url = `${this.companiesApiUrl}${searchTerm}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': 'PwewCEztSW7XlaAKqkg4IaOsPelGynw6SN9WsbNf'
    });

    return this.http.get<ICompanyResponse>(url, { headers }).pipe(
      tap(response => {
        this.companiesSubject.next(response);
      }),
      map(() => {})
    );
  }

  getCompanyOfficers(companyNumber: string): Observable<OfficerResponse> {
    const url = `${this.officersApiUrl}${companyNumber}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': 'PwewCEztSW7XlaAKqkg4IaOsPelGynw6SN9WsbNf'
    });

    return this.http.get<OfficerResponse>(url, { headers });
  }

  setSelectedCompany(selectedCompany:ICompany){
    this.selectedCompanySubject.next(selectedCompany);
  }

  updateDisplayedCompanies(): void {
    const companies = this.companiesSubject.getValue();
    if (companies) {
      const startIndex = (this.currentPageSubject.getValue() - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      this.displayedCompaniesSubject.next({
        ...companies,
        items: companies.items.slice(startIndex, endIndex)
      });
    }
  }

  updateCurrentPage(currentPage:number):void{
    this.currentPageSubject.next(currentPage);
  }

  totalPages(): number {
    const companies = this.companiesSubject.getValue();
    if (!companies) {
      return 0;
    }
    return Math.ceil(companies.total_results / this.pageSize);
  }
}
