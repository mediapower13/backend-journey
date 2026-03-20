/**
 * DESTRUCTURING & SPREAD OPERATOR PRACTICE
 * Covers: renaming, defaults, nested, function params,
 *         spread for merging/cloning, rest parameters
 */

console.log("=".repeat(60));
console.log("   DESTRUCTURING & SPREAD OPERATOR PRACTICE");
console.log("=".repeat(60));

// SECTION 1: BASIC OBJECT DESTRUCTURING
console.log("\n📦 SECTION 1: Basic Object Destructuring\n");

const userProfile = {
  firstName: "John",
  lastName:  "Doe",
  age:       28,
  email:     "john.doe@gmail.com",
  city:      "Lagos",
  country:   "Nigeria",
  role:      "developer",
};

// ✅ Basic
const { firstName, lastName, age, email } = userProfile;
console.log("Basic:");
console.log(`  Name: ${firstName} ${lastName}, Age: ${age}, Email: ${email}`);

// ✅ Renaming
const { firstName: fName, lastName: lName, city: location } = userProfile;
console.log("\nWith renaming:");
console.log(`  fName=${fName}  lName=${lName}  location=${location}`);

// ✅ Default values
const {
  phone      = "Not provided",   // key missing  → uses default
  country    = "Unknown",        // key present  → uses actual value
  isVerified = false,            // key missing  → uses default
  role       = "guest",          // key present  → uses actual value
} = userProfile;

console.log("\nWith defaults:");
console.log(`  phone=${phone}  country=${country}  isVerified=${isVerified}  role=${role}`);

// ✅ Renaming + Default values combined
const {
  firstName: myName    = "Anonymous",
  salary:    mySalary  = 0,
  department:myDept    = "Not Assigned",
} = userProfile;

console.log("\nRenaming + Defaults combined:");
console.log(`  myName=${myName}  mySalary=${mySalary}  myDept=${myDept}`);

// SECTION 2: NESTED OBJECT DESTRUCTURING
console.log("\n🏗️  SECTION 2: Nested Object Destructuring\n");

const employee = {
  id:         101,
  name:       "Alice Johnson",
  department: "Engineering",
  address: {
    street: "456 Tech Avenue",
    city:   "Abuja",
    state:  "FCT",
    country:"Nigeria",
    coordinates: { lat: 9.0579, lng: 7.4951 },
  },
  skills: {
    primary:   "JavaScript",
    secondary: ["Python", "TypeScript", "Node.js"],
    experience:{ years: 5, level: "Senior" },
  },
  contact: { phone: "+234-800-0000-001", email: "alice@company.com" },
};

// ✅ One level nested
const { name: empName, address: { city: empCity, state: empState } } = employee;
console.log("One-level nested:");
console.log(`  Name: ${empName}  City: ${empCity}  State: ${empState}`);

// ✅ Deep nested
const {
  address: { coordinates: { lat, lng } },
  skills:  { primary: primarySkill, experience: { years, level } },
} = employee;
console.log("\nDeep nested:");
console.log(`  Coordinates: (${lat}, ${lng})`);
console.log(`  Skill: ${primarySkill} | ${years} yrs | ${level}`);

// ✅ Nested with defaults
const {
  address: { zipCode: zip = "000000" },            // missing → default
  skills:  { tertiary: tertiarySkill = "None" },   // missing → default
} = employee;
console.log("\nNested with defaults:");
console.log(`  zip=${zip}  tertiarySkill=${tertiarySkill}`);

// SECTION 3: ARRAY DESTRUCTURING
console.log("\n📋 SECTION 3: Array Destructuring\n");

const colors  = ["red", "green", "blue", "yellow", "purple"];
const numbers = [10, 20, 30, 40, 50];

// ✅ Basic
const [first, second, third] = colors;
console.log("Basic:", first, second, third);

// ✅ Skipping elements
const [,, skipThird,, skipFifth] = colors;
console.log("Skipping: third =", skipThird, " fifth =", skipFifth);

// ✅ Default values
const [a = 0, b = 0, c = 0, d = 0, e = 0, f = 999] = numbers;
console.log("Defaults: a=%d b=%d c=%d d=%d e=%d f=%d", a, b, c, d, e, f);

// ✅ Rest element
const [head, ...tail] = colors;
const [n1, n2, ...restNums] = numbers;
console.log("\nRest:");
console.log(`  head=${head}  tail=[${tail}]`);
console.log(`  n1=${n1}  n2=${n2}  rest=[${restNums}]`);

// ✅ Swap variables
let x = "Hello", y = "World";
console.log(`\nBefore swap: x="${x}"  y="${y}"`);
[x, y] = [y, x];
console.log(`After  swap: x="${x}"  y="${y}"`);

// ✅ Nested array (matrix)
const matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
const [[r1c1, r1c2], [r2c1, r2c2], [r3c1,, r3c3]] = matrix;
console.log("\nNested matrix:");
console.log(`  Row1:[${r1c1},${r1c2}]  Row2:[${r2c1},${r2c2}]  Row3:[${r3c1},_,${r3c3}]`);

// SECTION 4: FUNCTION PARAMETER DESTRUCTURING
console.log("\n⚙️  SECTION 4: Function Parameter Destructuring\n");

// ✅ Object parameter
function displayUser({ firstName, lastName, age, role = "user", isActive = true }) {
  console.log(`  ${firstName} ${lastName} | Age: ${age} | Role: ${role} | Active: ${isActive}`);
}

console.log("Object parameter:");
displayUser({ firstName: "Bob", lastName: "Smith", age: 30, role: "admin" });
displayUser({ firstName: "Eve", lastName: "Ray", age: 24 }); // uses defaults

// ✅ Array parameter
function getFirstAndLast([first, ...middle]) {
  return { first, last: middle.at(-1), middle: middle.slice(0, -1) };
}
const fal = getFirstAndLast([1, 2, 3, 4, 5]);
console.log("\nArray parameter:", fal);

// ✅ Nested parameter destructuring
function getEmployeeInfo({
  name,
  department,
  address: { city, country },
  skills:  { primary, experience: { years, level } },
}) {
  return `${name} | ${department} | ${city}, ${country} | ${primary} (${level}, ${years}yrs)`;
}
console.log("\nNested params:", getEmployeeInfo(employee));

// ✅ Default parameter object (safe to call with no args)
function createProfile({
  username  = "anonymous",
  avatar    = "default.png",
  bio       = "No bio provided",
  isPublic  = true,
} = {}) {
  return { username, avatar, bio, isPublic };
}
console.log("\nDefault param object:");
console.log("  With args:", createProfile({ username: "devMaster" }));
console.log("  No args  :", createProfile());

// ✅ Mixed order + array
function processOrder({
  orderId,
  customer: { name: customerName },
  items:    [firstItem, ...otherItems],
  totals:   { subtotal, tax = 0, total },
}) {
  console.log(`  Order #${orderId} | Customer: ${customerName}`);
  console.log(`  First: ${firstItem} | Others: ${otherItems.join(", ")}`);
  console.log(`  $${subtotal} + tax $${tax} = $${total}`);
}
console.log("\nMixed destructuring in function:");
processOrder({
  orderId:  "ORD-001",
  customer: { name: "Carol White" },
  items:    ["Laptop", "Mouse", "Keyboard"],
  totals:   { subtotal: 1500, tax: 75, total: 1575 },
});

// SECTION 5: SPREAD OPERATOR — OBJECTS
console.log("\n🌊 SECTION 5: Spread — Objects\n");

const baseUser    = { id: 1, role: "user",  isActive: true, createdAt: "2026-01-01" };
const personalInfo= { firstName: "Diana", lastName: "Prince", age: 31, email: "diana@hero.com" };
const workInfo    = { department: "Security", position: "Lead Dev", salary: 95000 };

// ✅ Merge multiple objects
const fullProfile = { ...baseUser, ...personalInfo, ...workInfo };
console.log("Merge:", fullProfile);

// ✅ Override properties (later keys win)
const updated = { ...baseUser, isActive: false, updatedAt: "2026-03-16" };
console.log("\nOverride: isActive =", updated.isActive, " | updatedAt =", updated.updatedAt);

// ✅ Shallow clone
const original     = { name: "Original", nested: { count: 42 } };
const shallowClone = { ...original };
shallowClone.name        = "Clone";
shallowClone.nested.count = 999;   // ⚠️ affects original too (shallow!)
console.log("\nShallow clone:");
console.log("  original.name        :", original.name);          // "Original" — safe
console.log("  original.nested.count:", original.nested.count);  // 999 — shared ref!

// ✅ Deep clone workaround
const deepClone = JSON.parse(JSON.stringify(original));
deepClone.nested.count = 123;
console.log("\nDeep clone:");
console.log("  original.nested.count:", original.nested.count); // still 999
console.log("  deepClone.nested.count:", deepClone.nested.count); // 123

// ✅ Conditional spread
const isAdmin  = true;
const extras   = { adminSince: "2025-01-01", canDelete: true };
const condUser = { ...personalInfo, ...(isAdmin && extras) };
console.log("\nConditional spread: adminSince =", condUser.adminSince);

// SECTION 6: SPREAD OPERATOR — ARRAYS
console.log("\n📦 SECTION 6: Spread — Arrays\n");

const fruits = ["apple", "banana", "cherry"];
const veggies = ["carrot", "broccoli", "spinach"];

// ✅ Merge
const allFood = [...fruits, ...veggies];
console.log("Merge:", allFood);

// ✅ Insert at position
const withMango = ["mango", ...fruits, "watermelon"];
console.log("Insert:", withMango);

// ✅ Clone
const cloned = [...fruits];
cloned.push("grape");
console.log("Original:", fruits);   // unchanged
console.log("Cloned  :", cloned);

// ✅ Spread in function calls
const nums = [15, 3, 9, 27, 6, 42, 1];
console.log("\nMath.max spread:", Math.max(...nums));
console.log("Math.min spread:", Math.min(...nums));

function add3(a, b, c) { return a + b + c; }
console.log("add3 spread    :", add3(...[10, 20, 30]));

// ✅ String to array
console.log("\nString to array:", [..."Hello"]);

// ✅ Remove duplicates via Set + spread
const dupes  = [1, 2, 2, 3, 3, 3, 4, 5, 5];
const unique = [...new Set(dupes)];
console.log("Remove dupes:", unique);

// SECTION 7: REST PARAMETERS
console.log("\n🔁 SECTION 7: Rest Parameters\n");

// ✅ Rest in functions
function sum(...numbers) {
  return numbers.reduce((total, n) => total + n, 0);
}
console.log("sum(1,2,3)     :", sum(1, 2, 3));
console.log("sum(1,2,3,4,5) :", sum(1, 2, 3, 4, 5));

// ✅ Named + rest params
function buildTag(tagName, className, ...children) {
  return { tag: tagName, class: className, children, childCount: children.length };
}
console.log("\nbuildTag:", buildTag("div", "container", "child1", "child2", "child3"));

// ✅ Rest in object destructuring
const { id: restId, role: restRole, ...profileRest } = { id: 1, role: "admin", name: "Test", email: "t@t.com", age: 25 };
console.log("\nObject rest: id=%d  role=%s  profileRest=", restId, restRole, profileRest);

// ✅ Rest in array destructuring
const [p, q, ...remaining] = [10, 20, 30, 40, 50];
console.log("Array rest: p=%d  q=%d  remaining=[%s]", p, q, remaining);

// SECTION 8: REAL-WORLD EXAMPLES
console.log("\n🌍 SECTION 8: Real-World Examples\n");

// ✅ 8.1 API Response destructuring
const apiResponse = {
  status: 200,
  message: "Success",
  data: {
    user: {
      id: "usr_001",
      name: "Frank Ocean",
      profile: {
        bio: "Backend developer",
        social: { twitter: "@frankocean", github: "github.com/frank" },
      },
    },
    token: "eyJhbGciOiJIUzI1NiJ9...",
    expiresIn: 3600,
  },
};

const {
  status,
  data: {
    user: { id: userId, name: userName, profile: { bio, social: { twitter } } },
    token,
    expiresIn,
  },
} = apiResponse;

console.log("API Response:");
console.log(`  Status: ${status} | User: ${userName} (${userId})`);
console.log(`  Bio: ${bio} | Twitter: ${twitter}`);
console.log(`  Token: ${token.slice(0, 20)}... | Expires: ${expiresIn}s`);

// ✅ 8.2 Config merging
const defaultConfig = {
  host: "localhost",
  port: 3000,
  debug: true,
  db:   { host: "localhost", port: 5432, name: "devdb" },
  cors: { origin: "*", methods: ["GET", "POST"] },
};
const prodOverride = {
  host:  "api.myapp.com",
  port:  8080,
  debug: false,
  cors:  { origin: "https://myapp.com", methods: ["GET","POST","PUT","DELETE"] },
};
const finalConfig = {
  ...defaultConfig,
  ...prodOverride,
  db: { ...defaultConfig.db, name: "proddb" }, // deep merge db manually
};
console.log("\nConfig merge:");
console.log("  host:", finalConfig.host, "| port:", finalConfig.port);
console.log("  db  :", finalConfig.db);
console.log("  cors:", finalConfig.cors);

// ✅ 8.3 Scores pipeline — map + destructuring + spread
const studentScores = [
  { name: "Alice", scores: [85, 92, 78, 96, 88] },
  { name: "Bob",   scores: [70, 65, 80, 75, 82] },
  { name: "Carol", scores: [95, 98, 92, 97, 99] },
  { name: "David", scores: [60, 55, 70, 65, 58] },
];

const processed = studentScores.map(({ name, scores }) => {
  const avg     = scores.reduce((s, n) => s + n, 0) / scores.length;
  const highest = Math.max(...scores);
  const lowest  = Math.min(...scores);
  const grade   = avg >= 90 ? "A" : avg >= 80 ? "B" : avg >= 70 ? "C" : "D";
  return { name, avg: avg.toFixed(1), grade, highest, lowest };
});

console.log("\nStudent pipeline:");
processed.forEach(({ name, avg, grade, highest, lowest }) => {
  console.log(`  ${name.padEnd(6)}: avg=${avg} grade=${grade} hi=${highest} lo=${lowest}`);
});

// ✅ 8.4 Immutable state update (React-like)
const initialState = {
  user:       null,
  isLoading:  false,
  error:      null,
  posts:      [],
  pagination: { page: 1, limit: 10, total: 0 },
};

const withLoading = { ...initialState, isLoading: true };
const withUser    = {
  ...withLoading,
  isLoading:  false,
  user:       { name: "Grace", id: 5 },
  pagination: { ...initialState.pagination, total: 50 },
};

console.log("\nState updates:");
console.log("  isLoading (step 1):", withLoading.isLoading);
console.log("  user (step 2)     :", withUser.user);
console.log("  pagination        :", withUser.pagination);

console.log("\n" + "=".repeat(60));
console.log("✅  DESTRUCTURING & SPREAD COMPLETE");
console.log("=".repeat(60));
console.log("Covered:");
console.log("  ✅ Object destructuring — basic, rename, defaults");
console.log("  ✅ Nested object destructuring");
console.log("  ✅ Array destructuring — skip, swap, rest");
console.log("  ✅ Function parameter destructuring");
console.log("  ✅ Spread — merging & cloning objects");
console.log("  ✅ Spread — merging & cloning arrays");
console.log("  ✅ Rest parameters");
console.log("  ✅ Real-world: API, config, scores, state");
console.log("=".repeat(60));
