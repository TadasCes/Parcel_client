import router from "@/router";
import axios from "axios";
import passport from "passport";
import gauth from "passport-google-oauth";
const GoogleStrategy = gauth.OAuth2Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "334910610012-tcn27ghk05rhiv0dmvd9q5c79mnp6o09.apps.googleusercontent.com",
      clientSecret: "WckVJt0E4ps8zZAY_8-bF_Tf",
      callbackURL: "http://localhost:8080/auth/google/callback"
    },
    async function(token, tokenSecret, profile, done) {
      console.log(profile);
      // await User.findOne({ googleId: profile.id }, async function (err, user) {
      //   if (user == null) {
      //     const newUser = {
      //       email: profile.emails[0].value,
      //       password: "",
      //       firstName: profile.name.familyName,
      //       lastName: profile.name.givenName,
      //       phone: "",
      //       googleId: profile.id,
      //     };
      //     await createUser(newUser).then((user) => {
      //       console.log("sukurtas");
      //       return done(null, user);
      //     });
      //   } else {
      //     console.log(user);
      //     return done(null, user);
      //   }
      // });
    }
  )
);

export async function googleAuth() {
  console.log("opa");
  return (
    axios.get(
      "http://localhost:8080/auth/google",
      passport.authenticate("google", {
        scope: [
          "https://www.googleapis.com/auth/userinfo.profile",
          "https://www.googleapis.com/auth/userinfo.email"
        ]
        // scope: ["https://www.googleapis.com/auth/plus.login"],
      })
    ),
    function(req, res) {
      req.headers["Access-Control-Allow-Headers"] = "*";
      console.log(res);

      console.log("ja");
    }
  );
}

export async function googleAuthCalLBack() {
  passport.authenticate("google", { failureRedirect: "/login" }),
    function(req, res: any) {
      req.headers["Access-Control-Allow-Headers"] = "*";
      console.log("ye");
      // res.redirect("/");
    };
}
