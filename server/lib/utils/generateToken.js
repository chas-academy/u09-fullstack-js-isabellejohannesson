import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: '15d'})

    res.cookie("jwt", "", {
        maxAge: 0,
        httpOnly: true,
        sameSite: "none",
        secure: process.env.NODE_ENV !== "development",
      });
}