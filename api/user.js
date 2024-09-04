const ENDPOINT = {
  UPDATE: process.env.EXPO_PUBLIC_API_URL + "/user/me",
  SURVEY: process.env.EXPO_PUBLIC_API_URL + "/user/survey",
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
    const response = await fetch(ENDPOINT.UPDATE, options);

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.failureMsg);
    }

    return result;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function userSurvey(survey) {
  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      section: survey,
    }),
  };

  try {
    const response = await fetch(ENDPOINT.SURVEY, options);

    const data = await response.json();

    if (!response.ok) {
      if (data.failureMsg) throw new Error(data.failureMsg);
      throw new Error("Error not identified.");
    }
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}
