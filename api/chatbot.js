import { Buffer } from "buffer";

import { polyfill as polyfillReadableStream } from "react-native-polyfill-globals/src/readable-stream";
import { polyfill as polyfillFetch } from "react-native-polyfill-globals/src/fetch";
polyfillReadableStream();
polyfillFetch();
const ENDPOINT = {
  POST: process.env.EXPO_PUBLIC_API_URL + "/chat",
  GET: process.env.EXPO_PUBLIC_API_URL + "/chat",
};

export async function mockChat(message, cbStream, cbIsDone, thread = "") {
  let idx = 0;
  let answer =
    "Eu estou maravilhosamente bem. E vc como esta? Eu ouvi dizer que esta muito quente em Berlin. Gostaria de alguma dica de como sobreviver a isso? Ou dicas de como nao aceitar projetos com curta deadline? Talvez em como falar nao ou ser mais realista? Dicas sobre cursos de dev? Como dizer para sua psi que ela estava enganada e vc nao e tao inteligente assim.";
  let chuck = answer.split(" ");
  const lastIdx = chuck.length - 1;
  while (idx <= lastIdx) {
    await cbStream(chuck[idx]);

    if (idx === lastIdx) return await cbIsDone("thread_");
    idx++;
  }
}

export async function chatbot(message, cbStream, cbIsDone, chatId = "") {
  const body = {
    query: message,
  };
  if (chatId) body.id = chatId;
  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    responseType: "stream",
    body: JSON.stringify(body),

    reactNative: { textStreaming: true },
  };

  try {
    const url = ENDPOINT[options.method];
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("Fetch error");
    }
    const reader = response.body.getReader();

    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        return;
      }
      const decode = Buffer.from(value).toString();
      if (!decode.includes("<<chat_id=")) {
        await cbStream(decode);
      } else {
        cbIsDone(decode.substring(10));
      }
    }
  } catch (err) {
    console.log(err);
  }
}

export async function getChats() {
  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(ENDPOINT[options.method], options);

    const result = await response.json();
    console.log(result);

    if (!response.ok) {
      throw new Error(result.failureMsg);
    }

    return result;
  } catch (err) {
    throw new Error(err.message);
  }
}
