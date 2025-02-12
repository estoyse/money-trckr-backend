import { moneyTransferInfo } from "./extractMoney.js";
export async function handleHumo(message, supabase) {
  if (
    message.senderId.value !== 856254490n ||
    !/(To'lov|Naqd pul yechish|To'ldirish|Amaliyot)/.test(message.text)
  ) {
    return;
  }

  const transfer = moneyTransferInfo(message.text);
  addData(transfer, supabase);
}
