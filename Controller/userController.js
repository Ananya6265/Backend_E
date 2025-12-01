const user =require("../Models/userModels")

const jwt=require('jsonwebtoken')

exports.registerController = async (req, res) => {

    const { name, email, password, userType} = req.body

    try {
        const existingUser = await user.findOne({ email })
        if (existingUser) {
          return  res.status(406).json("user already exist")
        }

       else{
        const newUser = new user({
  name,
  email,
  password,
  userType: userType || 'User'
});

        await newUser.save()
        res.status(200).json(newUser)
       }
    }
    catch (err) {
        res.status(401).json(err)
    }
}


exports.loginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await user.findOne({ email });

    if (!existingUser) {
      return res.status(404).json("Invalid Email/Password");
    }

    if (existingUser.password !== password) {
      return res.status(401).json("Invalid Email/Password");
    }

    const token = jwt.sign(
      { userId: existingUser._id },
      process.env.JWT_PASSWORD,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      user: {
        _id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
        userType: existingUser.userType,
      },
      token,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json("Server error");
  }
};



exports.logoutController = (req, res) => {
  try {

    return res.status(200).json({
      message: "Logged out successfully"
    });
  } catch (err) {
    res.status(500).json({ message: "Logout failed" });
  }
};
