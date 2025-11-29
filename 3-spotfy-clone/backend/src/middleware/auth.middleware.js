import { clerkClient } from "@clerk/express";

export const protectRoute = async (req, res, next) => {
  if (!request.auth.userId) {
    return res
      .status(401)
      .json({ message: "Unauthorized - You must be logged" });
  }
  next();
};

export const requireAdmin = async (req, res, next) => {
  try {
    const currentUser = await clerkClient.users.getUser(req.auth.userId);
    const isAdmin =
      process.env.ADMIN_EMAIL === currentUser.primaryEmailAddress?.emailAddress;

    if (!isAdmin) {
      return res.status(403).json({ message: "Forbidden - Admins only" });
    }

    next()
  } catch (error) {
    next(error);
  }
};
