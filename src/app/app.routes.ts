import { Routes } from '@angular/router';
import { SearchCompanyComponent } from './company/search-company/search-company.component';
import { CompanyDetailsComponent } from './company/company-details/company-details.component';
import { OfficersListComponent } from './company/officers-list/officers-list.component';

export const routes: Routes = [
    {
        path: "search",
        component: SearchCompanyComponent
    },
    {
        path: "company-details",
        component: CompanyDetailsComponent
    },
    {
        path: "company-details/list-officers",
        component: OfficersListComponent
    }
];
