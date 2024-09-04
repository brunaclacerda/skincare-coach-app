const ENDPOINT = {
  POST: process.env.EXPO_PUBLIC_API_URL + "/chat",
};

export async function chatbot(message, thread = "") {
  console.log("chatbot");

  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: message,
      thread,
    }),
  };

  try {
    const response = await fetch(ENDPOINT[options.method], options);

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.failureMsg);
    }

    return result;
  } catch (err) {
    return { failureMsg: err.message };
  }
}
