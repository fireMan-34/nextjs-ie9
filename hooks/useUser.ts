import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { AES, enc } from "crypto-js";

import { PUBLIC_AUTH_KEY } from "constants/index";

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

  function registerCustomUser(arg: RegisterCustomUser) {
    const { userName, password, email } = arg;
    const timestamp = Date.now().toString();
    const encrytedUserInfo = AES.encrypt(
      JSON.stringify({ userName, email, timestamp }),
      timestamp
    );
    const encrytedPassword = AES.encrypt(password, PUBLIC_AUTH_KEY);

    const headers = {
      timestamp,
      ['encryted-user-info']: encrytedUserInfo.toString(),
      ['encryted-password']: encrytedPassword.toString(),
    };
    return fetch("/api/customer/user/register", {
      method: "POST",
      headers: headers,
    }).finally(() => {
      console.log('注册信息 ===>', headers);
    });
  }

  function resetCustomUser() {}

  return {
    user,
    isLoggedIn: user.isLoggedIn,
    verifyCustomUserPassword,
    registerCustomUser,
  };
}
