import { z } from "zod";

// const UserPreferences = z.record(z.any());
const UserPreferences = z.object({
  theme: z.enum(["light", "dark"]).optional(),
});

const UserProfile = z
  .object({
    imageUrl: z.string(),
  })
  .and(z.record(z.string()))
  .optional();

const UserActivity = z.object({
  label: z.string(),
  value: z.string(), // You can add custom validation to ensure it's an ISO string
});

const UserRoles = z.array(z.enum(["superAdmin", "admin"]));

const User = z.object({
  email: z.string().email(),
  roles: UserRoles,
  profile: UserProfile,
  preferences: UserPreferences,
  activity: z.array(UserActivity),
});

const ViewConfiguration = z.object({
  id: z.string(),
  dataSource: z.object({
    spreadsheetId: z.string(),
    gid: z.string(),
    storageType: z.string(),
    schema: z.object({
      fields: z.array(z.any())
    })
  }),
  fields: z.array(z.any())
});

// You need to export in this format. See
// https://stackoverflow.com/questions/48791868/use-typescript-with-google-apps-script
// for more info.
export { UserPreferences, UserProfile, UserActivity, User };

export type UserPreferencesType = z.infer<typeof UserPreferences>;
export type UserProfileType = z.infer<typeof UserProfile>;
export type UserActivityType = z.infer<typeof UserActivity>;
export type UserType = z.infer<typeof User>;
export type ViewConfigurationType = z.infer<typeof ViewConfiguration>;
