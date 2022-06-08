export async function readUser(username, password) {
    try {
        const status = await fetch(`/api/users`, {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify({ username, password })
        });
        return await status.json();
    } catch (error) {
        console.log(error);
    }
}