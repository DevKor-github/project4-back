import dataSource from "../config/dataSource";
import { User } from "../entity/user";
import { Request, Response, NextFunction } from "express";

const jwt = require("jsonwebtoken");
const userRepository = dataSource.getRepository(User);

const auth = async (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.cookies.accesstoken;
  const refreshToken = req.cookies.refreshtoken;

  if (accessToken) {
    try {
      const verified = await jwt.verify(accessToken, process.env.SECRET_KEY);
      const user = await userRepository.findOne({
        where: { userid: verified.userid },
      });
      next();
    } catch {
      try {
        const decodedRefreshToken = await jwt.verify(
          refreshToken,
          process.env.SECRET_KEY
        );
        const user = await userRepository.findOne({
          where: { userid: decodedRefreshToken.userid },
        });
        const dbRefreshToken = await jwt.verify(
          user.refreshtoken,
          process.env.SECRET_KEY
        );
        console.log("Access Token이 만료되어, Refresh Token을 검증합니다.");
        //db 저장된 refreshToken과 쿠키의 refreshToken 변조 체크
        if (decodedRefreshToken.userid == dbRefreshToken.userid) {
          //accessToken 재발급
          console.log(
            "Refresh Token이 유효하므로 Access Token을 재발급합니다."
          );
          const accessToken = jwt.sign(
            { userid: user.userid, username: user.username },
            process.env.SECRET_KEY,
            { expiresIn: "10s" }
          );
          res.cookie("accesstoken", accessToken, {
            httpOnly: true,
            secure: true,
          });
          next();
        } else {
          const invalidToken = new Error("Invalid Token");
          console.log("토큰이 유효하지 않습니다. 다시 로그인해 주세요.");
          next(invalidToken);
        }
        return false; // 일치하지 않는다면 돌려보냄.
      } catch {
        const commonError = new Error("Something broke");
        next(commonError);
      }
    }
  } else {
    const noToken = new Error("No Token"); //토큰이 존재하지 않음
    console.log("로그인이 필요합니다.");
    next(noToken);
  }
};

/*
1. 두 토큰을 쿠키에서 가져온다
2. access가 null일 경우 return false한다
3. access가 null이 아닐 경우 체크한다.
    1. 유효하면 패스한다.
    2. 유효하지 않으면 refresh를 체크한다.
        1. 유효하면 access를 재발급하고 패스한다.
        2. 유효하지 않으면 return false한다.
*/

export default auth;
