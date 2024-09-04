const ENDPOINT = {
  update: process.env.EXPO_PUBLIC_API_URL + "/user/me",
};

export async function updateApi(user) {
  console.log("updateApi" + user);

  if (!user.birthDate || !user.name) throw new Error("Invalid input.");

  const options = {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      birthDate: user.birthDate,
      name: {
        first: user.name,
      },
    }),
  };

  try {
    const response = await fetch(ENDPOINT.update, options);

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.failureMsg);
    }

    return result;
  } catch (err) {
    throw new Error(err.message);
  }
}
