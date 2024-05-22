import { NextApiHandler } from "next";
import { AES, } from 'crypto-js';

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "POST") {
    const {
      timestamp,
      ['encryted-user-info']: encrytedUserInfo,
      ['encryted-password']: encrytedPassword,
    } = req.headers;

    console.log({
      timestamp,
      encrytedUserInfo,
      encrytedPassword,
      userInfo: AES.decrypt(encrytedUserInfo as string, timestamp as string).toString(),
    })

    return res.status(200).json(req.headers);
  }
};

export default handler;
