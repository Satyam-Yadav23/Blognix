import { Router } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import Blog from "../models/blog.js";
import Comment from "../models/comment.js";

const router = Router();
const uploadDir = path.resolve("./public/uploads");

if (fs.existsSync(uploadDir) && !fs.statSync(uploadDir).isDirectory()) {
    fs.unlinkSync(uploadDir);
}
fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const fileName = `${Date.now()}-${file.originalname}`;
        cb(null, fileName);
    },
});

const upload = multer({storage: storage});

router.get("/add-new", (req, res) => {
    if (!req.user) {
        return res.redirect("/user/signin");
    }

    return res.render("addBlog", {
        user: req.user,
    });
});

router.get("/:id", async (req, res) => {
    const blog = await Blog.findById(req.params.id).populate("createdBy");
    if (!blog) {
        return res.redirect("/");
    }

    const comments = await Comment.find({ blogId: req.params.id }).populate("createdBy");
    return res.render("blog", {
        user: req.user,
        blog,
        comments,
    });
});

router.post("/comment/:blogId", async (req, res) => {
    if (!req.user) {
        return res.redirect("/user/signin");
    }

    await Comment.create({
        content: req.body.content,
        blogId: req.params.blogId,
        createdBy: req.user._id,
    });
    return res.redirect(`/blog/${req.params.blogId}`);
});

router.post("/", upload.single("coverImage"), async (req, res) => {
    if (!req.user) {
        return res.redirect("/user/signin");
    }

    const { title, body } = req.body;
    const blog = await Blog.create({
        body,
        title,
        createdBy: req.user._id,
        coverImageURL: req.file ? `/uploads/${req.file.filename}` : "/images/default.webp",
    });
    return res.redirect(`/blog/${blog._id}`);
});

export default router;