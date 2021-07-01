import User from "../models/User";
import bcrypt from "bcrypt"

export const getJoin = (req, res) => res.render("join");

export const postJoin = async (req, res) => {
    const {email, username, password, passwordConfirm} = req.body;

    if(password!==passwordConfirm) {
        return res.status(400).render("join", {message: "비밀번호가 틀립니다"})
    }

    const existUser = await User.exists({username});
    const existEmail = await User.exists({email})

    if (existUser) {
      return res.status(400).render("join", {message: "중복된 유저 이름입니다"});
    }

    if (existEmail) {
        return res.status(400).render("join", {message: "중복된 이메일입니다"});
    }

    try {   
        await User.create({username, email, password});
        return res.status(200).redirect("/login");
      } catch (error) {
        return res.status(400).render("join", {errorMessage: error._message});
      }
};

export const getLogin = (req, res) => res.render("login");

export const postLogin = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({email});

    if (!user) {
      return res.status(400).render("login", {message: "등록되지 않은 이메일입니다"});
    }

    const passwordConfirm = await bcrypt.compare(password, user.password);

    if (!passwordConfirm) {
      return res.status(400).render("login", {message: "비밀번호가 틀렸습니다"});
    }

    req.session.loggedIn = true;
    req.session.user = user;

    return res.redirect("/");
};

export const logout = (req, res) => {
    req.flash("info", "bye");
    req.session.destroy();
    return res.redirect("/");
}

export const profile = (req, res) => {
    return res.render("profile")
}