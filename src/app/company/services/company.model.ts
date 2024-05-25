export interface ICompanyResponse {
    page_number: number;
    kind: string;
    total_results: number;
    items: Array<ICompany>;
  }


export interface ICompany {
    company_status: string;
    address_snippet: string;
    date_of_creation: string;
    description: string;
    company_number: string;
    title: string;
    company_type: string;
    address: IAddress;
  }
  
  interface IAddress {
    premises: string;
    postal_code: string;
    country: string;
    locality: string;
    address_line_1: string;
  }