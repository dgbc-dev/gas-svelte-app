import polyfillScriptRun from "./polyfillScriptRun";
polyfillScriptRun();

/** @typedef {import('../types/gas').AppConfiguration} AppConfiguration */
/** @typedef {import('../types/gas').User} User */
/** @typedef {import('../types/gas').ViewConfiguration} ViewConfiguration */
/** @typedef {import('../types/gas').View} View */
/** @typedef {import('../types/gas').GetUserArgs} GetUserArgs */
/** @typedef {import('../types/gas').PutUserArgs} PutUserArgs */
/** @typedef {import('../types/gas').PutAppConfigArgs} PutAppConfigArgs */
/** @typedef {import('../types/gas').GetViewConfigArgs} GetViewConfigArgs */
/** @typedef {import('../types/gas').GetViewDataArgs} GetViewDataArgs */

// Add mock data for development
const mockMembers = [
  {
    name: "John Doe",
    email: "john@example.com",
    roles: ["admin", "user"]
  },
  {
    name: "Jane Smith",
    email: "jane@example.com",
    roles: ["user"]
  },
  {
    name: "Bob Wilson",
    email: "bob@example.com",
    roles: ["superAdmin", "user"]
  },
  {
    name: "Alice Brown",
    email: "alice@example.com",
    roles: ["user"]
  }
];

/**
 * Generic function to handle API calls
 * @param {string} functionName
 * @param {any} [args=[]] - Optional arguments
 * @returns {Promise<any>}
 */
const callAPI = async (functionName, args = []) => {
  // For development mode, handle mock data
  if (import.meta.env.DEV) {
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
    
    switch (functionName) {
      case "getMembers":
        return mockMembers;
      // Keep existing mock cases if any
      default:
        console.log("No mock data for", functionName);
    }
  }

  console.log("calling api", functionName, args);
  return new Promise((resolve, reject) => {
    google.script.run
      .withSuccessHandler(resolve)
      .withFailureHandler(reject)
      [functionName](...(Array.isArray(args) ? args : [args]));
  });
};

export const GAS_API = {
  /**
   * @returns {Promise<AppConfiguration>} the app configuration
   */
  getAppConfiguration: () => callAPI("getAppConfiguration"),

  /**
   * @param {PutAppConfigArgs} args
   * @returns {Promise<AppConfiguration>} the app configuration
   */
  putAppConfiguration: (args) => callAPI("putAppConfiguration", args),

  /**
   * @param {GetUserArgs} [args] - Optional parameter containing user email
   * @returns {Promise<User>}
   */
  getUser: (args) => callAPI("getUser", args),

  /**
   * @param {PutUserArgs} args
   * @returns {Promise<User>}
   */
  putUser: (args) => callAPI("putUser", args),

  /**
   * @param {GetViewConfigArgs} args
   * @returns {Promise<ViewConfiguration>}
   */
  getViewConfiguration: (args) => callAPI("getViewConfiguration", args),

  /**
   * @param {GetViewDataArgs} args
   * @returns {Promise<View>}
   */
  getViewData: (args) => callAPI("getViewData", args),

  /**
   * @returns {Promise<Array<{name: string, email: string, roles: string[]}>>}
   */
  getMembers: () => callAPI("getMembers"),
};
