export interface OfficerAddress {
    premises: string;
    postal_code: string;
    country: string;
    locality: string;
    address_line_1: string;
  }
  
  export interface OfficerLink {
    appointments: string;
  }
  
  export interface OfficerItem {
    address: OfficerAddress;
    name: string;
    appointed_on: string;
    officer_role: string;
    links: { officer: OfficerLink };
    date_of_birth: { month: number; year: number };
    occupation: string;
    country_of_residence: string;
    nationality: string;
  }
  
  export interface OfficerResponse {
    etag: string;
    links: { self: string };
    kind: string;
    items_per_page: number;
    items: OfficerItem[];
  }