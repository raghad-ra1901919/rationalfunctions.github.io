import * as usersRepo from "../repository/users-repo.js";

export async function readUser(req, res) {
    try {
        const user = req.body;
        const dbUser = await usersRepo.readUser(user);
        if (dbUser) {
            res.status(200).json({ exists: true });
        } else {
            res.status(404).json({ exists: false });
        }
    } catch (error) {
        res.status(500).json(error);
    }
}