declare global {
  var google: {
    script: {
      run: {
        withSuccessHandler(handler: (result: any) => void): any;
        withFailureHandler(handler: (error: Error) => void): any;
        [key: string]: any;
      };
    };
  };
}

export interface AppConfiguration {
  appName: string;
  [key: string]: any;
}

export interface User {
  email: string;
  name: string;
  roles: string[];
}

export interface ViewConfiguration {
  id: string;
  [key: string]: any;
}

export interface View {
  id: string;
  [key: string]: any;
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

export interface GetViewConfigArgs {
  id: string;
}

export interface GetViewDataArgs {
  id: string;
}

// This export is needed to make this a module
export {}; 