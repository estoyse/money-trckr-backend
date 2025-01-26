import { USER_EMAIL, USER_PASSWORD } from "./config.js";

export default async function initAuth(supabase) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: USER_EMAIL,
    password: USER_PASSWORD,
  });

  return data;
}
