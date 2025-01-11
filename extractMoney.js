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
  const formattedDate = `${year}-${month.padStart(2, "0")}-${day.padStart(
    2,
    "0"
  )} ${time}`;
  return new Date(formattedDate);
};

const operationType = str => {
  if (str.includes("To'lov")) return "expense";
  if (str.includes("Naqd")) return "transfer";
  return "income";
};

export function moneyTransferInfo(msg) {
  const [transferType, amount, location, cardDetails, date, balance] =
    msg.split("\n");

  return {
    type: operationType(transferType),
    amount: toNumber(amount),
    location: clearText(location),
    date: parseDateTime(date),
  };
}
