import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { AES, HmacSHA256, enc } from "crypto-js";

import { PUBLIC_AUTH_KEY } from "constants/index";
import { CookieStorage } from "utils/client.cookie";

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

  const decryptBase64AndJson = (msg: string) => {
    return JSON.parse(enc.Base64url.parse(msg).toString(enc.Utf8));
  };

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

    const data: { accessToken: string; msg?: string } = await fetch(
      "/api/customer/user/register",
      {
        method: "POST",
        headers: headers,
      }
    ).then((res) => res.json());

    if (data.accessToken) {
      const [headerEncode, payloadEncode, signatuire] =
        data.accessToken.split(".");
      const header = decryptBase64AndJson(headerEncode);
      const payload = decryptBase64AndJson(payloadEncode);
      const clientSignature = HmacSHA256(
        `${headerEncode}.${payloadEncode}`,
        PUBLIC_AUTH_KEY
      ).toString();
      if (clientSignature === signatuire) {
        console.log(header, payload, { clientSignature, signatuire });
        const { exp } = payload;

        const cookie = new CookieStorage();
        cookie.setCookie("accessToken", data.accessToken, { expires: exp });
        router.replace('/Login', null, {});
      } else {
        alert("无效签名");
      }
    } else {
      alert("注册失败: " + data.msg ?? "");
    }
  }

  function resetCustomUser() {}

  return {
    user,
    isLoggedIn: user.isLoggedIn,
    verifyCustomUserPassword,
    registerCustomUser,
  };
}
