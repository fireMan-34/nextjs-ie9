import { NextApiHandler } from "next";
import { AES, HmacSHA256, enc } from "crypto-js";

import { PUBLIC_AUTH_KEY } from "constants/index";
import { prisma } from "utils/prisma/client";

const base64andJsonEncode = (obj: Object) => {
  return enc.Base64url.stringify(enc.Utf8.parse(JSON.stringify(obj)));
};

const createAccessToken = (uid: number) => {
  const exp = new Date();
  exp.setMonth(exp.getMonth() + 1);

  const header = {
    typ: "ase",
    alg: "sha256",
  };
  const payload = {
    uid,
    iss: "签发者",
    /** 过期时间 */ exp: exp.getTime(),
    sub: "主题",
    aud: "受众",
  };

  const headerEncode = base64andJsonEncode(header);
  const payloadEncode = base64andJsonEncode(payload);
  const signatuire = HmacSHA256(
    `${headerEncode}.${payloadEncode}`,
    PUBLIC_AUTH_KEY
  ).toString();
  return `${headerEncode}.${payloadEncode}.${signatuire}`;
};

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "POST") {
    const {
      timestamp,
      ["encryted-user-info"]: encrytedUserInfo,
      ["encryted-password"]: encrytedPassword,
    } = req.headers;

    const userInfo = JSON.parse(
      AES.decrypt(encrytedUserInfo as string, timestamp as string).toString(
        enc.Utf8
      )
    );
    const { userName, email } = userInfo;
    const userPassword = AES.decrypt(
      encrytedPassword as string,
      PUBLIC_AUTH_KEY
    ).toString(enc.Utf8);

    const hasUserCheck = await prisma.user.findFirst({
      where: {
        name: userName,
      },
    });

    if (hasUserCheck) {
      console.log("检测到相同账号");
      return res.status(200).json({
        msg: "has same account",
        hasUserCheck,
        accessToken: createAccessToken(hasUserCheck.id),
      });
    }

    const user = await prisma.user.create({
      data: {
        name: userName,
        email,
        password: userPassword,
      },
    });
    return res.status(200).json({
      timestamp,
      encrytedUserInfo,
      encrytedPassword,
      userInfo,
      userPassword,
      user,
      accessToken: (user.id)
    });
  }
};

export default handler;
