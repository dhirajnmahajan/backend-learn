import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";

// here res is not used, so instead of writing res we just used underscore '_'

const verifyJWT = asyncHandler(async (req, _, next) => {
  // From req object, we can get the cookies (- where we set our accessToken & refreshToken)
  // for mobile, header is use to extract the token, hence used { || }or operator
  //  in header we get the Token from  - Authorization : Bearer <token>
  //  There is space between Bearer and token , but we only want token value ,
  // so to replace that we used replace method of javascript which removes name 'Bearer' and 'space' after it.

  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log("decodedToken", decodedToken);

    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );
    if (!user) {
      // TODO:
      throw new ApiError(401, "Invalid Access Token");
    }
    // LOGIC:
    // here we are setting user to req.user , which can be accessible to the logoutUser function , because this middleware runs first
    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});

export { verifyJWT };
