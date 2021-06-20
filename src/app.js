const express = require("express");
const app = express();
const session = require("express-session");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
require("../db/connection");
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 1000000000000000000 },
  })
);

const AllUser = require("../db/schema");
app.use(
  express.urlencoded({
    extended: true,
  })
);

//middleware
const auth = (req, resp, next) => {
  if (req.session.userid) {
    return next();
  } else {
    return resp.json({
      err: { msg: "please login" },
    });
  }
};

//signUp and singIN routes
app.post("/register", async (req, resp) => {
  try {
    let findUser = await AllUser.findOne({
      email: req.body.email,
    });
    if (findUser) {
      return resp.status(404).json({
        data: { email: req.body.email },
        err: { msg: " email is alredy registor" },
      });
    }
    let newUser = new AllUser({
      ...req.body,
    });
    await newUser.save();
    req.session.userid = newUser._id;
    return resp.status(200).json({
      data: [newUser],
      err: {},
    });
  } catch (e) {
    if (e) {
      if (e instanceof mongoose.Error.ValidationError) {
        let fields = {};
        for (let field in e.errors) {
          fields[field] = e.errors[field].message;
        }
        return resp.json({
          data: [],
          err: fields,
        });
      } else {
        return resp.json({
          data: [],
          err: e.message,
        });
      }
    }
  }
});

app.get("/register", async (req, resp) => {
  try {
    let findUser = await AllUser.findOne({
      email: req.body.email,
    });
    if (!findUser) {
      return resp.status(404).json({
        data: { email: req.body.email },
        err: { msg: " email not found " },
      });
    }
    if (req.body.password != findUser.password) {
      return resp.status(404).json({
        err: { msg: " invalid credidential " },
      });
    }

    req.session.userid = findUser._id;

    return resp.status(200).json({
      data: [findUser],
      err: {},
    });
  } catch (e) {
    if (e) {
      if (e instanceof mongoose.Error.ValidationError) {
        let fields = {};
        for (let field in e.errors) {
          fields[field] = e.errors[field].message;
        }
        return resp.json({
          data: [],
          err: fields,
        });
      } else {
        return resp.json({
          data: [],
          err: e.message,
        });
      }
    }
  }
});

// //getProfile (extra)
// app.get("/profile", auth, async (req, resp) => {
//   let user = await AllUser.findOne({ _id: req.session.userid });
//   resp.send(user);
// });

//getState and post State
app.post("/state", auth, async (req, resp) => {
  let user = await AllUser.findOne({ _id: req.session.userid });
  user.state.push(req.body);
  console.log(req.body);
  await user.save();
  resp.send(user);
});

app.get("/state", auth, async (req, resp) => {
  let user = await AllUser.findOne({ _id: req.session.userid });
  resp.send(user.state);
});

//getDistrict and post District
app.post("/district", auth, async (req, resp) => {
  let user = await AllUser.findOne({ _id: req.session.userid });
  user.dis.push(req.body);
  await user.save();
  resp.send(user);
});

app.get("/district", auth, async (req, resp) => {
  let user = await AllUser.findOne({ _id: req.session.userid });
  resp.send(user.dis);
});

//getChild and postChild
app.post("/child", auth, async (req, resp) => {
  let user = await AllUser.findOne({ _id: req.session.userid });
  user.child.push(req.body);
  await user
    .save()
    .then(() => {
      resp.send(user);
    })
    .catch((e) => {
      resp.status(400).send({ msg: "error" });
    });
});

app.get("/child", auth, async (req, resp) => {
  let user = await AllUser.findOne({ _id: req.session.userid });
  //   console.log(user);
  resp.send(user.child);
});

//getLogout
app.get("/logout", auth, async (req, resp) => {
  req.session.destroy();
  return resp.send("logout");
});

app.listen(2000, () => {
  console.log(
    "--------------------------------------------------------------------------------------"
  );
  console.log(
    "............................Running on port 2000......................................"
  );
  console.log(
    "--------------------------------------------------------------------------------------"
  );
});
