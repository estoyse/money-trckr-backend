import { TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions/index.js";
import { NewMessage } from "telegram/events/index.js";
import { moneyTransferInfo } from "./extractMoney.js";
import {
  TELEGRAM_API_HASH,
  TELEGRAM_API_ID,
  TELEGRAM_STRING_SESSION,
  SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY,
} from "./config.js";
import { addData } from "./addData.js";
import { createClient } from "@supabase/supabase-js";
import initExpress from "./express.js";
import initAuth from "./auth.js";

const apiId = +TELEGRAM_API_ID;
const apiHash = TELEGRAM_API_HASH;
const stringSession = new StringSession(TELEGRAM_STRING_SESSION);

async function initBot() {
  // Create the client
  const client = new TelegramClient(stringSession, apiId, apiHash, {
    connectionRetries: 5,
  });
  client.start();

  console.log("Client is ready!");
  client.addEventHandler(handleMessage, new NewMessage({}));
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

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
  addData(transfer, supabase);
}

// Start the client
initBot().catch(console.error);
initExpress();
initAuth(supabase);

process.on("SIGINT", () => {
  process.exit();
});
