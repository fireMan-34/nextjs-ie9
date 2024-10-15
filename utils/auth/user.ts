import { HmacSHA256, enc, lib, AES, } from "crypto-js";

import { PUBLIC_AUTH_KEY } from "constants/index";

export const base64andJsonEncode = (obj: Object) => {
  return enc.Base64url.stringify(enc.Utf8.parse(JSON.stringify(obj)));
};

export const base64AndJsonDecode = (msg: string) => {
  return JSON.parse(enc.Base64url.parse(msg).toString(enc.Utf8));
};

export const createAccessToken = (uid: number) => {
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

export const parsesAccessToken = (token: string) => {
  const [headerEncode, payloadEncode, signatuire] = token.split(".");

  if ([headerEncode, payloadEncode, signatuire].filter(Boolean).length < 3) {
    throw new Error('无效签名');
  }

  const header = base64AndJsonDecode(headerEncode);
  const payload = base64AndJsonDecode(payloadEncode);
  const clientSignature = HmacSHA256(
    `${headerEncode}.${payloadEncode}`,
    PUBLIC_AUTH_KEY
  ).toString();
  const { exp } = payload;

  if (clientSignature !== signatuire) {
    throw new Error('无效签名');
  } else if (Date.now() >= exp) {
    throw new Error('令牌过时');
  } else {
    return {
      header,
      payload,
      signatuire,
    }
  }
};

export const createJWTAccessToken = <P extends Record<string, any> = Record<string, any>>(payload: P,) => {
  const mergePayload = { timestamp: Date.now(), salt: lib.WordArray.random(16) , ...payload,  };
  const header = {
    typ: 'jwt',
    alg: 'ase',
  };

  const headerEncode = base64andJsonEncode(header);
  const payloadEncode = base64andJsonEncode(mergePayload);
  const signatuire = AES.encrypt(`${headerEncode}.${payloadEncode}`, mergePayload.salt, { });
}