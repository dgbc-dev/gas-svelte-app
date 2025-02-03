import { getViewConfiguration } from "./api/getViewConfiguration";
import { getViewData } from "./api/getViewData";
import { getUser } from "./api/getUser";
import { putUser } from "./api/putUser";

type MockEndpoints = {
  // User
  getUser: typeof getUser;
  putUser: typeof putUser;

  // Views
  getViewConfiguration: typeof getViewConfiguration;
  getViewData: typeof getViewData;
};

export default function getMockEndpoints(): MockEndpoints {
  return {
    // User
    getUser,
    putUser,

    // Views
    getViewConfiguration,
    getViewData,
  };
}
