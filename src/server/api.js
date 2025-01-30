/**
 * Gets all members from the Google Sheet
 * @returns {Array<{name: string, email: string, roles: string[]}>}
 */
function getMembers() {
  return require('./api/getMembers').getMembers();
}

/**
 * Updates or creates a member in the Google Sheet
 * @param {Object} args
 * @param {string} args.name
 * @param {string} args.email
 * @param {string[]} args.roles
 * @returns {Object} The updated/created member
 */
function putMember(args) {
  return require('./api/putMember').putMember(args);
}

/**
 * Initializes the Google Sheet with required structure if needed
 * @returns {boolean}
 */
function initializeSheets() {
  return require('./api/initializeSheets').initializeSheets();
} 