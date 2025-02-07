declare global {
  interface Window {
    google: typeof google;
  }

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

// This export is needed to make this a module
export {}; 