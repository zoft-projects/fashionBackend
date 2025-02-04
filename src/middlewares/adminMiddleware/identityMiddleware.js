const users = require("../../database/models/users/users");

exports.identityMiddleware = (...roles) => {
  return async (req, res, next) => {
    
    try {
      const userId = req.payload.uid; 

      const user = await users.findById(userId);
      if (!user) {
        return res.json({status:401, message: "User not found." });
    }

      if (roles.length && !roles.includes(user.role)) {
        return res.json({status:403, message: "Access Denied" });
      }

      req.user = user; 
      next();

    } 
    catch (error) {
        res.json({status:500, message: "Server error", error: error.message });
    }
  };
};
