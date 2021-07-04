import User from "../models/User";
import bcrypt from "bcrypt"

export const getJoin = (req, res) => res.render("join");

export const postJoin = async (req, res) => {
    const {email, username, password, passwordConfirm} = req.body;
    if(password!==passwordConfirm) {
        return res.status(400).render("join", {message: "비밀번호가 불일치합니다."})
    }
    const existUser = await User.exists({username});
    const existEmail = await User.exists({email})
    if (existUser) {
      return res.status(400).render("join", {message: "중복된 유저 이름입니다."});
    }
    if (existEmail) {
        return res.status(400).render("join", {message: "중복된 이메일입니다."});
    }
    try {   
        await User.create({username, email, password});
        req.flash("info", "성공적으로 회원가입 되었습니다.");
        return res.status(200).redirect("/login");
      } catch (error) {
        return res.status(400).render("join", {message: error._message});
      }
};

export const getLogin = (req, res) => res.render("login");

export const postLogin = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({email});
    if (!user) {
      return res.status(400).render("login", {message: "등록되지 않은 이메일입니다."});
    }
    const passwordConfirm = await bcrypt.compare(password, user.password);
    if (!passwordConfirm) {
      return res.status(400).render("login", {message: "비밀번호가 틀렸습니다."});
    }
    req.flash("info", "성공적으로 로그인 하였습니다.");
    req.session.loggedIn = true;
    req.session.user = user;
    return res.redirect("/");
};

export const logout = (req, res) => {
    req.flash("info", "로그아웃 되었습니다.");
    req.session.loggedIn = false;
    req.session.user = [];
    return res.redirect("/");
}

export const getProfile = (req, res) => {
    return res.render("profile")
}

export const postProfile = async (req, res) => {
  const { session: { user: { _id, avatarUrl}}, body: {email, username}, file} = req;
  const updatedUser = await User.findByIdAndUpdate(_id, {
    avatarUrl: file ? file.path : avatarUrl,
    email,
    username
  },
  {new: true});

  req.session.user = updatedUser;
  req.flash("info", "성공적으로 프로필이 편집되었습니다.")
  return res.redirect(`/users/${_id}`);
}

export const getChangePassword = (req, res) => {
  return res.render("change");
};

export const postChangePassword = async (req, res) => {
  const { session: { user: { _id }}, body: { oldPassword, newPassword, newPasswordConfirm}} = req;
  const user = await User.findById(_id);
  const passwordCheck = await bcrypt.compare(oldPassword, user.password);
  if(!passwordCheck) {
    return res.status(400).render("change", {message: "기존 비밀번호가 틀렸습니다."})
  }
  if(newPassword !== newPasswordConfirm) {
    return res.status(400).render("change", {message: "새로운 비밀번호가 불일치합니다."})
  }
  user.password = newPassword;
  await user.save();
  req.flash("info", "성공적으로 새로운 패스워드가 설정되었습니다. 다시 접속 바랍니다.")
  req.session.loggedIn = false;
  req.session.user = [];
  return res.redirect("/");
};
