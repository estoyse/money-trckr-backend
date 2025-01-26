import * as dotenv from "dotenv";
dotenv.config();

export const TELEGRAM_API_HASH = process.env.TELEGRAM_API_HASH;
export const TELEGRAM_API_ID = process.env.TELEGRAM_API_ID;
export const TELEGRAM_STRING_SESSION = process.env.TELEGRAM_STRING_SESSION;

export const SUPABASE_URL = process.env.SUPABASE_URL;
export const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const USER_EMAIL = process.env.USER_EMAIL;
export const USER_PASSWORD = process.env.USER_PASSWORD;
