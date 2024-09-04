const ENDPOINT = {
  GET: process.env.EXPO_PUBLIC_API_URL + "/survey",
};

export async function getApi() {
  console.log("survey");

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

    if (!response.ok) {
      throw new Error(result.failureMsg);
    }

    return result;
  } catch (err) {
    throw new Error(err.message);
  }
}
