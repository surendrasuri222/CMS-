
const User = require("../models/usermodel");

exports.addToBookmark = async (req, res) => {
    const { userId, prodId } = req.body;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const alreadyAdded = user.bookmarks.find(id => id.toString() === prodId);
        if (alreadyAdded) {
            user.bookmarks.pull(prodId);
        } else {
            user.bookmarks.push(prodId);
        }

        const updatedUser = await user.save();
        res.json(updatedUser);
    } catch (error) {
        console.error("Error adding to bookmark:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
