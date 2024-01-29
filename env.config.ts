export const envConfig = {
  APP_ID: process.env.NEXT_PUBLIC_APP_ID, //Replace with your App ID
  REGION: process.env.NEXT_PUBLIC_REGION, //Replace with your App Region
  AUTH_KEY: process.env.NEXT_PUBLIC_AUTH_KEY, //Replace with your Auth Key
  UID: process.env.NEXT_PUBLIC_UID,
} as const;
