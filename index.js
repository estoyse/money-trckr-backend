import { TelegramClient } from "telegram";
import express from "express";
import { StringSession } from "telegram/sessions/index.js";
import { NewMessage } from "telegram/events/index.js";
import { moneyTransferInfo } from "./extractMoney.js";
import {
  TELEGRAM_API_HASH,
  TELEGRAM_API_ID,
  TELEGRAM_STRING_SESSION,
} from "./config.js";
import { writeData } from "./writeDoc.js";

// Create readline interface for user input

// Your Telegram API credentials
const apiId = +TELEGRAM_API_ID;
const apiHash = TELEGRAM_API_HASH;
const stringSession = new StringSession(TELEGRAM_STRING_SESSION);

async function init() {
  // Create the client
  const client = new TelegramClient(stringSession, apiId, apiHash, {
    connectionRetries: 5,
  });
  client.start();

  console.log("Client is ready!");
  client.addEventHandler(handleMessage, new NewMessage({}));
}

// Message handler function
async function handleMessage(event) {
  const message = event.message;

  if (
    message.senderId.value !== 856254490n ||
    !/(To'lov|Naqd pul yechish|To'ldirish|Amaliyot)/.test(message.text)
  ) {
    return;
  }

  const transfer = moneyTransferInfo(message.text);
  writeData(transfer);
}

// Start the client
init().catch(console.error);

// Handle cleanup
process.on("SIGINT", () => {
  process.exit();
});

const app = express();
const port = 8000;

app.get("/health", (req, res) => {
  res.send("OK");
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on http://0.0.0.0:${port}`);
});
