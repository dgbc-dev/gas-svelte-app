import sleep from "../sleep";
import query from "../query";
import { getViewConfiguration } from "./getViewConfiguration";

/**
 *
 * @param {GetViewDataArgs} args
 * @returns {Promise<View>}
 */
export async function getViewData({ id }) {
  console.log("getting view data for viewId:", id);
  const viewConfiguration = await getViewConfiguration({ id });

  if (!viewConfiguration) {
    throw new Error("View configuration not found");
  }

  console.log("getting view data for config:", viewConfiguration);
  await sleep(2000);
  const resultSet = query(viewConfiguration);

  /** @type {View} */
  let mockResponse = {
    source: "mocks",
    configuration: viewConfiguration,
    queryResult: {
      producedAt: new Date().toISOString(),
      records: resultSet,
    },
  };

  return JSON.parse(JSON.stringify(mockResponse));
}
