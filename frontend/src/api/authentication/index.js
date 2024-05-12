export const loginUser = async (username, role, password) => {
  try {
    const credentials = { username, password, role };
    const result = await loginMutation(credentials);
    console.log(result.data);
    return true;
  } catch (error) {
    console.error("Login error:", error);
    return false;
  }
};
