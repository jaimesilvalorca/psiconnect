import { isAxiosError } from "axios";
import apiDL from "@/lib/apiDL";
import apiORC from "@/lib/apiORC";

import { UserLogin, UserRegisterSend } from "types";

export async function createAccount(formData: UserRegisterSend) {
  try {
    const url = "/v1/users";

    const { data } = await apiDL.post(url, formData);

    console.log(data)

    return data;
  } catch (error) {
    console.log(error)
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function authenticatedUser(formData: UserLogin) {
  try {
    const url = "/v1/sessions/login";

    const {data} = await apiORC.post(url, formData);

    console.log(data)
    const token = data.data.token

    localStorage.setItem('AUTH_TOKEN',token)

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function getUser(email:string){
    try {
        
        const url = `/v1/users/email/${email}`

        const {data} = await apiORC.get(url)

        localStorage.setItem('USER',JSON.stringify(data))

        return data
        
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
          }
    }
}
