type EnvironmentDetails = {
  executeAs: "USER_DEPLOYING" | "USER_ACCESSING";
  domain: {
    type: "Personal" | "Workspace";
    name: string;
  };
};

const ENV: EnvironmentDetails = {
  executeAs: "USER_DEPLOYING", // "USER_DEPLOYING" | "USER_ACCESSING"
  domain: {
    type: "Personal",
    name: "",
  },
};

export {ENV};  // fix from original fork from mikedownsdev