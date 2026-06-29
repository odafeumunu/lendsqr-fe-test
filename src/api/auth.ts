const VALID_EMAIL = "lendsqr@gmail.com";
const VALID_PASSWORD = "Admin123";

export interface LoginPayload {
  email: string;
  password: string;
}

export const loginRequest = (
  payload: LoginPayload
): Promise<{ success: true }> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (payload.email !== VALID_EMAIL) {
        reject(new Error("This email is not registered."));
      } else if (payload.password !== VALID_PASSWORD) {
        reject(new Error("Incorrect password. Please try again."));
      } else {
        resolve({ success: true });
      }
    }, 800);
  });
};
