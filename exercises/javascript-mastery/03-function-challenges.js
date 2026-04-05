/**
 * ASYNCHRONOUS JAVASCRIPT - CALLBACKS & PROMISES
 * Backend Development using JavaScript
 */

console.log("=== ASYNCHRONOUS JAVASCRIPT - CALLBACKS & PROMISES ===\n");

// ------------------------------------------------------------
// SECTION 1: Understanding Callbacks
// ------------------------------------------------------------
console.log("--- Section 1: Understanding Callbacks ---\n");

/**
 * Simulate an async operation with callback.
 * @param {string} taskName
 * @param {number} delay
 * @param {(result: string) => void} callback
 */
function asyncTaskWithCallback(taskName, delay, callback) {
    setTimeout(() => {
        callback(`Completed: ${taskName}`);
    }, delay);
}

console.log("1) Simulating async operation with callback:");
asyncTaskWithCallback("Fetch users", 500, (result) => {
    console.log(result);
});

/**
 * Callback hell demo: intentionally nested callbacks.
 */
function callbackHellDemo(done) {
    asyncTaskWithCallback("Step 1: Read config", 300, (step1) => {
        console.log(step1);

        asyncTaskWithCallback("Step 2: Connect DB", 300, (step2) => {
            console.log(step2);

            asyncTaskWithCallback("Step 3: Query data", 300, (step3) => {
                console.log(step3);

                asyncTaskWithCallback("Step 4: Send response", 300, (step4) => {
                    console.log(step4);
                    console.log("Callback hell demo finished.\n");
                    done();
                });
            });
        });
    });
}

/**
 * Error-first callback pattern.
 * @param {number} a
 * @param {number} b
 * @param {(error: Error | null, result: number | null) => void} callback
 */
function divideAsync(a, b, callback) {
    setTimeout(() => {
        if (b === 0) {
            callback(new Error("Cannot divide by zero"), null);
            return;
        }

        callback(null, a / b);
    }, 250);
}

/**
 * Minimal event emitter with on/off/emit.
 */
class SimpleEventEmitter {
    constructor() {
        this.events = {};
    }

    on(eventName, listener) {
        if (!this.events[eventName]) {
            this.events[eventName] = [];
        }
        this.events[eventName].push(listener);
    }

    off(eventName, listener) {
        if (!this.events[eventName]) {
            return;
        }
        this.events[eventName] = this.events[eventName].filter(fn => fn !== listener);
    }

    emit(eventName, payload) {
        if (!this.events[eventName]) {
            return;
        }
        this.events[eventName].forEach(listener => listener(payload));
    }
}

function runCallbackExamples(next) {
    console.log("2) Callback hell with nested callbacks:");

    callbackHellDemo(() => {
        console.log("3) Error-first callback pattern:");

        divideAsync(10, 2, (error, result) => {
            if (error) {
                console.error("Unexpected error:", error.message);
            } else {
                console.log("10 / 2 =", result);
            }

            divideAsync(10, 0, (secondError, secondResult) => {
                if (secondError) {
                    console.error("Handled error:", secondError.message);
                } else {
                    console.log("10 / 0 =", secondResult);
                }

                console.log("\n4) Simple event emitter:");
                const emitter = new SimpleEventEmitter();

                const onUserCreated = (payload) => {
                    console.log(`Listener A -> User created: ${payload.username}`);
                };

                const auditListener = (payload) => {
                    console.log(`Listener B -> Audit log for user id: ${payload.id}`);
                };

                emitter.on("userCreated", onUserCreated);
                emitter.on("userCreated", auditListener);

                emitter.emit("userCreated", { id: 101, username: "backend_dev" });

                emitter.off("userCreated", auditListener);
                emitter.emit("userCreated", { id: 102, username: "removed_listener_demo" });

                console.log("\nCallbacks section complete.\n");
                next();
            });
        });
    });
}

//
// SECTION 2: Promise Fundamentals
//

/**
 * Create a promise from scratch.
 * @param {boolean} shouldResolve
 * @returns {Promise<string>}
 */
function createCustomPromise(shouldResolve) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldResolve) {
                resolve("Promise resolved successfully.");
            } else {
                reject(new Error("Promise rejected intentionally."));
            }
        }, 400);
    });
}

/**
 * Callback-style function to convert.
 * @param {number} userId
 * @param {(error: Error | null, result: object | null) => void} callback
 */
function fetchUserCallback(userId, callback) {
    setTimeout(() => {
        if (userId <= 0) {
            callback(new Error("Invalid user id"), null);
            return;
        }

        callback(null, {
            id: userId,
            name: "Alex",
            role: "Backend Engineer"
        });
    }, 350);
}

/**
 * Promise-based version converted from callback style.
 * @param {number} userId
 * @returns {Promise<object>}
 */
function fetchUserPromise(userId) {
    return new Promise((resolve, reject) => {
        fetchUserCallback(userId, (error, result) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(result);
        });
    });
}

/**
 * Additional promise helpers for chaining.
 */
function fetchOrdersByUserId(userId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { orderId: 1, userId, total: 29.99 },
                { orderId: 2, userId, total: 45.50 }
            ]);
        }, 300);
    });
}

function calculateTotal(orders) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (!Array.isArray(orders)) {
                reject(new Error("Orders must be an array"));
                return;
            }

            const total = orders.reduce((sum, order) => sum + order.total, 0);
            resolve(total);
        }, 250);
    });
}

function runPromiseExamples() {
    console.log("--- Section 2: Promise Fundamentals ---\n");

    console.log("1) Promise from scratch:");
    return createCustomPromise(true)
        .then((message) => {
            console.log(message);
            return createCustomPromise(false);
        })
        .catch((error) => {
            console.error("Caught promise error:", error.message);
        })
        .then(() => {
            console.log("\n2) Convert callback to promise:");
            return fetchUserPromise(7)
                .then((user) => {
                    console.log("Fetched user:", user);
                    return fetchUserPromise(-1);
                })
                .catch((error) => {
                    console.error("Handled converted promise error:", error.message);
                });
        })
        .then(() => {
            console.log("\n3) Promise chaining with error handling:");

            return fetchUserPromise(3)
                .then((user) => {
                    console.log("User loaded:", user.name);
                    return fetchOrdersByUserId(user.id);
                })
                .then((orders) => {
                    console.log("Orders loaded:", orders.length);
                    return calculateTotal(orders);
                })
                .then((grandTotal) => {
                    console.log("Grand total:", grandTotal.toFixed(2));
                })
                .then(() => calculateTotal(null))
                .catch((error) => {
                    console.error("Chaining error handled:", error.message);
                });
        })
        .finally(() => {
            console.log("\n=== ASYNC ASSIGNMENT COMPLETE ===");
        });
}

runCallbackExamples(() => {
    runPromiseExamples().catch((error) => {
        console.error("Unexpected promise flow error:", error.message);
    });
});
