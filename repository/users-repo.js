import Users from "../models/users.js";

export async function readUser(user) {
    try {
        return await Users.findOne({
            username: user.username,
            password: user.password
        });
    } catch (error) {
        console.log(error);
    }
}
