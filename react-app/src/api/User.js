/**
 * FRONT END API functions User
 * copy into front end project to be used
 * This file is generated
 */

const baseUrl = "http://localhost:5000/api";

export async function getUsers() {
  try {
    const response = await fetch(`${baseUrl}/users`);
    if (response.ok) {
      const textResponse = await response.text();
      const parsedResponse = JSON.parse(textResponse);
      return parsedResponse;
    } else {
      console.error(response);
      return [];
    }
  } catch (e) {
    console.log(e);
    return [];
  }
}

export async function getUser(id) {
  try {
    const response = await fetch(`${baseUrl}/users/${id}`);
    if (response.ok) {
      const textResponse = await response.text();
      const parsedResponse = JSON.parse(textResponse);
      return parsedResponse;
    } else {
      console.error(response);
      return null;
    }
  } catch (e) {
    console.log(e);
    return null;
  }
}

export async function createUser(data) {
  try {
    const response = await fetch(`${baseUrl}/users/`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      const textResponse = await response.text();
      const parsedResponse = JSON.parse(textResponse);
      return parsedResponse;
    } else {
      console.error(response);
      return null;
    }
  } catch (e) {
    console.log(e);
    return null;
  }
}

export async function updateUser(data) {
  let putData = { ...data };
  delete putData._id;
  delete putData.__v;
  try {
    const response = await fetch(`${baseUrl}/users/${data._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(putData),
    });
    if (response.ok) {
      const textResponse = await response.text();
      const parsedResponse = JSON.parse(textResponse);
      return parsedResponse;
    } else {
      console.error(response);
      return false;
    }
  } catch (e) {
    console.log(e);
    return false;
  }
}

export async function deleteUser(id) {
  try {
    const response = await fetch(`${baseUrl}/users/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      return true;
    } else {
      console.error(response);
      return false;
    }
  } catch (e) {
    console.log(e);
    return false;
  }
}

const UserApi = {
  getList: getUsers,
  get: getUser,
  create: createUser,
  update: updateUser,
  delete: deleteUser,
};

export default UserApi;
