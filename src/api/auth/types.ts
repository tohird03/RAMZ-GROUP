export interface ILoginForm {
  phone: string;
  password: string;
}
export interface ILoginResponse {
  tokens: {
    accessToken: string;
    refreshToken: string;
  }
}

export interface ICurrency {
  id: string;
  name: string;
  symbol: 'UZS' | 'USD';
  exchangeRate: number;
}

export interface IEditCurrency {
  exchangeRate: number;
  id: string;
}
