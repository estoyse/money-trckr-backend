const toNumber = str => {
  const scrapped = str.match(/\d{1,3}(?:\.\d{3})*(?:,\d{2})/g);
  return parseFloat(scrapped[0].replace(/\./g, "").replace(",", "."));
};

const clearText = str => {
  return str
    .replace(/[\u{1F300}-\u{1F9FF}]/gu, "") // Remove emojis
    .replace(/_/g, "") // Remove underscores
    .trim() // Remove extra spaces
    .replace(/\s+/g, " ");
};

const parseDateTime = dateStr => {
  const cleanStr = dateStr.replace(/🕓\s+/, "");
  const [time, dateWithDots] = cleanStr.split(" ");
  const [day, month, year] = dateWithDots.split(".");
  const [hours, minutes] = time.split(":");

  // Create date in UTC
  const date = new Date(
    Date.UTC(
      parseInt(year),
      parseInt(month) - 1, // months are 0-based in JavaScript
      parseInt(day),
      parseInt(hours) - 5, // adjust for GMT+5
      parseInt(minutes)
    )
  );

  return date;
};

const operationType = str => {
  if (str.includes("To'lov")) return 0;
  if (str.includes("Naqd pul yechish")) return 1;
  if (str.includes("Amaliyot")) return 2;
  return 3;
};

export function moneyTransferInfo(msg) {
  const [transferType, amount, location, cardDetails, date] = msg.split("\n");

  return {
    type: operationType(transferType),
    amount: toNumber(amount),
    location: clearText(location),
    transaction_date: parseDateTime(date),
    account: clearText(cardDetails),
  };
}
