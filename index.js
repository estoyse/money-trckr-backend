import { createClient } from "@supabase/supabase-js";
import { TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions/index.js";
import { NewMessage } from "telegram/events/index.js";
import {
  TELEGRAM_API_HASH,
  TELEGRAM_API_ID,
  TELEGRAM_STRING_SESSION,
  SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY,
} from "./config.js";
import initAuth from "./supabaseAuth.js";
import initExpress from "./express.js";
import { handleHumo } from "./handleTransaction.js";
import { commentOnChannelPost } from "./commentOnChannelPost.js";

const apiId = +TELEGRAM_API_ID;
const apiHash = TELEGRAM_API_HASH;
const stringSession = new StringSession(TELEGRAM_STRING_SESSION);
const client = new TelegramClient(stringSession, apiId, apiHash, {
  connectionRetries: 5,
});
async function initBot() {
  await client.start();

  console.log("Client is ready!");
  client.addEventHandler(handleMessage, new NewMessage({}));
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function handleMessage(event) {
  // if (event.isGroup) return;

  if (event.isPrivate) {
    handleHumo(event.message, supabase);
    return;
  }
  if (event.isChannel && event.message.post) {
    const { message } = event;
    if (
      message.peerId.channelId.value !== 2139523610n ||
      !message.replies?.channelId
    )
      return;
    commentOnChannelPost(client, message);
  }
}

// Start the client
initBot().catch(console.error);
initExpress();
initAuth(supabase);

process.on("SIGINT", () => {
  process.exit();
});
