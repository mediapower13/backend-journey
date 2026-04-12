
console.log("=== ASYNC/AWAIT & ERROR HANDLING ===\n");

function fetchProfileWithPromise(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (userId <= 0) {
                reject(new Error("Invalid user id"));
                return;
            }

            resolve({ id: userId, username: "backend_user", tier: "pro" });
        }, 500);
    });
}

async function fetchProfile(userId) {
    const profile = await fetchProfileWithPromise(userId);
    return profile;
}

function fetchPosts(userId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { id: 1, userId, title: "API Design" },
                { id: 2, userId, title: "Node Patterns" }
            ]);
        }, 700);
    });
}

function fetchNotifications(userId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { id: "n1", userId, message: "New login detected" },
                { id: "n2", userId, message: "Password updated" }
            ]);
        }, 600);
    });
}

async function runConversionDemo() {
    console.log("1) Promise to async/await conversion");

    const fromPromise = await fetchProfileWithPromise(7);
    console.log("Promise result:", fromPromise);

    const fromAsyncAwait = await fetchProfile(7);
    console.log("Async/await result:", fromAsyncAwait);

    console.log("");
}

async function runErrorHandlingDemo() {
    console.log("2) Error handling with try/catch");

    try {
        const validProfile = await fetchProfile(5);
        console.log("Valid profile:", validProfile);
    } catch (error) {
        console.error("Unexpected error:", error.message);
    }

    try {
        await fetchProfile(0);
    } catch (error) {
        console.error("Handled error:", error.message);
    }

    console.log("");
}

async function runSequentialDemo() {
    console.log("3) Sequential execution");

    const start = Date.now();
    const profile = await fetchProfile(9);
    const posts = await fetchPosts(profile.id);
    const notifications = await fetchNotifications(profile.id);
    const end = Date.now();

    console.log("Profile:", profile.username);
    console.log("Posts:", posts.length);
    console.log("Notifications:", notifications.length);
    console.log("Time(ms):", end - start);

    console.log("");
}

async function runParallelDemo() {
    console.log("4) Parallel execution");

    const start = Date.now();
    const profile = await fetchProfile(9);

    const [posts, notifications] = await Promise.all([
        fetchPosts(profile.id),
        fetchNotifications(profile.id)
    ]);

    const end = Date.now();

    console.log("Profile:", profile.username);
    console.log("Posts:", posts.length);
    console.log("Notifications:", notifications.length);
    console.log("Time(ms):", end - start);

    console.log("");
}

async function main() {
    await runConversionDemo();
    await runErrorHandlingDemo();
    await runSequentialDemo();
    await runParallelDemo();
    console.log("=== ASSIGNMENT COMPLETE ===");
}

main().catch((error) => {
    console.error("Unhandled error:", error.message);
});
