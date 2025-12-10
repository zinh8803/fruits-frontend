import api from "./api";

export const login = (email: string, password: string) =>
  api.post(
    "auth/login",
    { email, password },
    { withCredentials: true }
  );

export const register = (email: string, password: string) =>
  api.post(
    "auth/register",
    { email, password },
  
  );

export const logout = () =>
  api.post(
    "auth/logout",  {},    
    {
      withCredentials: true,
    }
  );

  export const me = () =>
    api.get(
      "auth/me",
      {
        withCredentials: true,
      }
    );