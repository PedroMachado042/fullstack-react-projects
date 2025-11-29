import { Router } from "express";
import { checkAdmin, createAlbum, createSong, deleteAlbum, deleteSong } from "../controllers/admin.controller.js";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";

const router = Router();

// call this two functions for all admin routes - clean code
router.use(protectRoute,requireAdmin)

//return true if the user is admin
router.get("/check", checkAdmin)

router.post("/songs", createSong)
router.delete("/songs/:id", deleteSong)

router.post("/albums", createAlbum)
router.delete("/albums/:id", deleteAlbum)

export default router;