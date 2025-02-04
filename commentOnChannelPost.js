import { Api } from "telegram";

export async function commentOnChannelPost(client, message) {
  let joke = await getJoke();
  try {
    const discussionMessage = await getDiscussionMessage(
      message.peerId,
      message.id
    );
    const commentTo = discussionMessage.messages[0]?.id;
    if (!commentTo) return;
    await client.sendMessage(message.replies.channelId, {
      commentTo,
      message: joke.value,
    });
  } catch (error) {
    console.error("Error posting comment:", error);
  }
  async function getDiscussionMessage(chatId, messageId) {
    return client.invoke(
      new Api.messages.GetDiscussionMessage({
        peer: chatId,
        msgId: messageId,
      })
    );
  }
}

async function getJoke() {
  return await fetch("https://api.chucknorris.io/jokes/random").then(res =>
    res.json().then(data => data)
  );
}
