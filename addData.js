export async function addData(transaction, supabase) {
  supabase.from("notifications").insert(transaction);
}
