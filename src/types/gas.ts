export interface AppConfiguration {
  appName: string;
  [key: string]: any;
}

export interface User {
  email: string;
  name: string;
  roles: string[];
}

export interface GetUserArgs {
  email?: string;
}

export interface PutUserArgs {
  email: string;
  name: string;
  roles: string[];
}

export interface PutAppConfigArgs {
  appName: string;
  [key: string]: any;
} 