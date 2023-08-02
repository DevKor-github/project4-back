import dataSource from "../config/dataSource";
import { User } from "../entity/user";
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const userRepository = dataSource.getRepository(User);

//로그인
export const login = async (id: string, password: string) => {
  const user = await userRepository.findOne({
    where: { userid: id },
  });
  if (user) {
    if (user.userpassword == password) {
      console.log("로그인 성공");
      const accessToken = jwt.sign(
        { userid: user.userid, username: user.username },
        process.env.SECRET_KEY,
        { expiresIn: "1h" }
      );
      const refreshToken = jwt.sign(
        { userid: user.userid, username: user.username },
        process.env.SECRET_KEY,
        { expiresIn: "7d" }
      );
      const refreshTokenUpdate = async () => {
        await userRepository.update(
          { userid: id },
          { refreshtoken: refreshToken }
        );
      };
      return [accessToken, refreshToken];
    }
    //토큰 발급
    else {
      console.log("비밀번호가 일치하지 않습니다."); // 에러처리, 리다이렉팅 나중에 하기
    }
  } else console.log("존재하지 않는 아이디입니다");
};
//회원가입
export const register = async (id: string, name: string, password: string) => {
  const isExist = await userRepository.findOne({
    where: { userid: id },
  });
  if (isExist) console.log(`${id}는 이미 존재하는 아이디입니다.`);
  else {
    await userRepository.insert({
      userid: id,
      username: name,
      userpassword: password,
    });
    console.log(`${id}로 가입되었습니다`);
  }
};

export const logout = async (id: string) => {
  //쿠키 삭제는 컨트롤러에서.
  await userRepository.update({ userid: id }, { refreshtoken: null });
};
