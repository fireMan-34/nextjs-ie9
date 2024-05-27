import { useState } from "react";
import { useRouter } from "next/router";
import { AES } from "crypto-js";

import { PUBLIC_AUTH_KEY } from "constants/index";
import { CookieStorage } from "utils/client.cookie";
import { parsesAccessToken, createAccessToken } from "utils/auth/user";

interface UseUser {}

interface User {
  isLoggedIn?: boolean;
  userName?: string;
  email?: string;
}

interface RegisterCustomUser {
  userName: string;
  password: string;
  email?: string;
}

interface LoginCustomUser {
  username: string;
  password: string;
}

export default function useUser(props: UseUser) {
  const router = useRouter();
  const [user, setUser] = useState<User>({});

  function verifyCustomUserPassword(value) {
    const Level_1_REG = /^\d+$/;

    if (Level_1_REG.test(value)) {
      return {
        isPass: false,
        level: 0,
      };
    }

    return {
      isPass: true,
      level: 1,
    };
  }

  async function registerCustomUser(arg: RegisterCustomUser) {
    const { userName, password, email } = arg;
    const timestamp = Date.now().toString();
    const encrytedUserInfo = AES.encrypt(
      JSON.stringify({ userName, email, timestamp }),
      timestamp
    );
    const encrytedPassword = AES.encrypt(password, PUBLIC_AUTH_KEY);

    const headers = {
      timestamp,
      ["encryted-user-info"]: encrytedUserInfo.toString(),
      ["encryted-password"]: encrytedPassword.toString(),
    };

    try {
      const data: { accessToken: string; msg?: string } = await fetch(
        "/api/customer/user/register",
        {
          method: "POST",
          headers: headers,
        }
      ).then((res) => res.json());

      if (!data.accessToken) {
        throw new Error("注册失败: " + data.msg ?? "");
      }

      const { payload } = parsesAccessToken(data.accessToken);
      const { exp } = payload;
      setUser(payload);
      new CookieStorage().setCookie("accessToken", data.accessToken, {
        expires: exp,
      });
      router.push("/Login", null, {});
    } catch (err) {
      if (typeof err === "string") {
        alert(err);
      } else if (typeof err.msg === "string") {
        alert(err.msg);
      } else {
        console.error(err);
      }
    }
  }

  function resetCustomUser() {}

  async function loginCustomUser(params: LoginCustomUser) {
    const { username, password, } = params;
    
    const data = await fetch('/api/customer/user/login', {
      method: 'POST',
      body: JSON.stringify({
      }),
    })
    .then(data => data.json());

    if (data.err) {
      throw new Error(data.err);
    }

    if (!data.accessToken) {
      throw new Error('令牌无返回');
    }

    const { header, payload, signatuire } = parsesAccessToken(data.accessToken);


  }

  return {
    user,
    isLoggedIn: user.isLoggedIn,
    verifyCustomUserPassword,
    registerCustomUser,
  };
}
