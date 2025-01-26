export async function addData(transaction, supabase) {
  supabase
    .from("notifications")
    .insert(transaction)
    .then(() => {
      console.log("Data added successfully!");
    });
}
