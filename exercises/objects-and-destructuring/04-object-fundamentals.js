/**
 * OBJECT FUNDAMENTALS
 * User object with nested properties and methods:
 * getFullName, incrementAge, addHobby, getAddress
 */

console.log("=".repeat(60));
console.log("       OBJECT FUNDAMENTALS - USER OBJECT");
console.log("=".repeat(60));

// SECTION 1: USER OBJECT WITH NESTED PROPERTIES & METHODS
console.log("\n📦 SECTION 1: Full User Object\n");

const user = {
  // Basic properties
  firstName: "John",
  lastName: "Doe",
  age: 25,
  email: "john.doe@example.com",
  isActive: true,

  // Nested object - Address
  address: {
    street: "123 Main Street",
    city: "Lagos",
    state: "Lagos State",
    country: "Nigeria",
    zipCode: "100001",
  },

  // Nested object - Social Media
  socialMedia: {
    twitter: "@johndoe",
    linkedin: "linkedin.com/in/johndoe",
    github: "github.com/johndoe",
  },

  // Array property - Hobbies
  hobbies: ["reading", "coding", "traveling"],

  // Nested object - Preferences
  preferences: {
    theme: "dark",
    language: "English",
    notifications: {
      email: true,
      sms: false,
      push: true,
    },
  },

  // METHOD 1: getFullName()
  // Returns the user's full name as a single string
  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  },

  // METHOD 2: incrementAge()
  // Increases the user's age by 1 or by a given amount
  incrementAge(amount = 1) {
    if (typeof amount !== "number" || amount < 0) {
      return "❌ Invalid amount. Please provide a positive number.";
    }
    this.age += amount;
    return `✅ Age updated to: ${this.age}`;
  },

  // METHOD 3: addHobby()
  // Adds a new hobby if it doesn't already exist in the list
  addHobby(hobby) {
    if (!hobby || typeof hobby !== "string") {
      return "❌ Invalid hobby. Please provide a valid string.";
    }
    const normalized = hobby.toLowerCase().trim();
    if (this.hobbies.includes(normalized)) {
      return `⚠️  "${normalized}" is already in your hobbies list.`;
    }
    this.hobbies.push(normalized);
    return `✅ "${normalized}" added! Hobbies: [${this.hobbies.join(", ")}]`;
  },

  // METHOD 4: getAddress()
  // Returns the address in different formats
  // Options: "full" | "short" | "city"
  getAddress(format = "full") {
    const { street, city, state, country, zipCode } = this.address;
    const formats = {
      full:   `${street}, ${city}, ${state}, ${country} ${zipCode}`,
      short:  `${city}, ${state}, ${country}`,
      city:   `${city}, ${country}`,
      object: this.address,
    };
    return formats[format] ?? formats.full;
  },

  // BONUS: getSummary() - Returns key info as an object
  getSummary() {
    return {
      name:      this.getFullName(),
      age:       this.age,
      email:     this.email,
      location:  this.getAddress("short"),
      hobbies:   this.hobbies,
      isActive:  this.isActive,
    };
  },

  // BONUS: displayProfile() - Pretty prints the user profile
  displayProfile() {
    console.log("\n👤 USER PROFILE");
    console.log("-".repeat(42));
    console.log(`Name    : ${this.getFullName()}`);
    console.log(`Age     : ${this.age}`);
    console.log(`Email   : ${this.email}`);
    console.log(`Status  : ${this.isActive ? "🟢 Active" : "🔴 Inactive"}`);
    console.log(`Address : ${this.getAddress("full")}`);
    console.log(`Hobbies : ${this.hobbies.join(", ")}`);
    console.log(`Twitter : ${this.socialMedia.twitter}`);
    console.log(`GitHub  : ${this.socialMedia.github}`);
    console.log("-".repeat(42));
  },
};

// ✅ TESTS
console.log("1️⃣  getFullName()       :", user.getFullName());
console.log("2️⃣  Age before          :", user.age);
console.log("3️⃣  incrementAge()      :", user.incrementAge());
console.log("4️⃣  incrementAge(5)     :", user.incrementAge(5));
console.log("5️⃣  incrementAge(-1)    :", user.incrementAge(-1)); // error
console.log("6️⃣  addHobby('gaming')  :", user.addHobby("gaming"));
console.log("7️⃣  addHobby('coding')  :", user.addHobby("coding")); // duplicate
console.log("8️⃣  addHobby(123)       :", user.addHobby(123));      // invalid
console.log("9️⃣  getAddress('full')  :", user.getAddress("full"));
console.log("🔟  getAddress('short') :", user.getAddress("short"));
console.log("1️⃣1️⃣ getAddress('city')  :", user.getAddress("city"));
user.displayProfile();

// SECTION 2: FACTORY FUNCTION
console.log("\n🏭 SECTION 2: Factory Function — createUser()\n");

function createUser(firstName, lastName, age, email, city, country) {
  return {
    firstName,
    lastName,
    age,
    email,
    hobbies: [],
    address: { city, country, street: "N/A", state: "N/A", zipCode: "000000" },
    createdAt: new Date().toISOString(),

    getFullName() {
      return `${this.firstName} ${this.lastName}`;
    },

    incrementAge(amount = 1) {
      this.age += amount;
      return `${this.getFullName()} is now ${this.age} years old`;
    },

    addHobby(hobby) {
      const h = hobby.toLowerCase().trim();
      if (this.hobbies.includes(h)) return `⚠️  "${h}" already exists`;
      this.hobbies.push(h);
      return `✅ "${h}" added to ${this.firstName}'s hobbies`;
    },

    getAddress(format = "full") {
      const { street, city, state, country, zipCode } = this.address;
      return format === "short"
        ? `${city}, ${country}`
        : `${street}, ${city}, ${state}, ${country} ${zipCode}`;
    },
  };
}

const user1 = createUser("Alice", "Smith",   22, "alice@email.com", "Abuja",    "Nigeria");
const user2 = createUser("Bob",   "Johnson", 30, "bob@email.com",   "London",   "UK");
const user3 = createUser("Carol", "Williams",28, "carol@email.com", "New York",  "USA");

console.log(user1.addHobby("photography"));
console.log(user1.addHobby("hiking"));
console.log(user2.addHobby("music"));
console.log(user1.incrementAge(2));
console.log("User1 hobbies:", user1.hobbies);
console.log("User2 address:", user2.getAddress("short"));
console.log("User3 name:", user3.getFullName());

// SECTION 3: ES6 CLASS SYNTAX
console.log("\n🎓 SECTION 3: ES6 Class — new UserClass()\n");

class UserClass {
  #loginCount = 0; // private field

  constructor(firstName, lastName, age, email) {
    this.firstName = firstName;
    this.lastName  = lastName;
    this.age       = age;
    this.email     = email;
    this.hobbies   = [];
    this.address   = { street: "", city: "", state: "", country: "", zipCode: "" };
    this.isActive  = true;
    this.createdAt = new Date().toISOString();
  }

  // ✅ getFullName
  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  // ✅ incrementAge
  incrementAge(amount = 1) {
    if (amount < 0) throw new Error("Amount cannot be negative");
    this.age += amount;
    return `${this.getFullName()} is now ${this.age} years old`;
  }

  // ✅ addHobby
  addHobby(hobby) {
    const normalized = hobby.toLowerCase().trim();
    if (this.hobbies.includes(normalized)) {
      return `⚠️  "${normalized}" already exists`;
    }
    this.hobbies.push(normalized);
    return `✅ "${normalized}" added! Total hobbies: ${this.hobbies.length}`;
  }

  // ✅ getAddress
  getAddress(format = "full") {
    const { street, city, state, country, zipCode } = this.address;
    if (!city) return "❌ No address set";
    switch (format) {
      case "full":  return `${street}, ${city}, ${state}, ${country} ${zipCode}`;
      case "short": return `${city}, ${state}, ${country}`;
      case "city":  return `${city}, ${country}`;
      default:      return `${street}, ${city}, ${country}`;
    }
  }

  // Set address (supports method chaining)
  setAddress(street, city, state, country, zipCode) {
    this.address = { street, city, state, country, zipCode };
    return this;
  }

  // Getter / Setter for fullName
  get fullName() {
    return this.getFullName();
  }

  set fullName(name) {
    const parts = name.split(" ");
    this.firstName = parts[0];
    this.lastName  = parts.slice(1).join(" ");
  }

  // Static: compare two users' ages
  static compareAge(a, b) {
    if (a.age > b.age) return `${a.getFullName()} is older`;
    if (a.age < b.age) return `${b.getFullName()} is older`;
    return "Both users are the same age";
  }

  toString() {
    return `UserClass { name: "${this.getFullName()}", age: ${this.age} }`;
  }
}

const cu1 = new UserClass("Frank", "Miller", 29, "frank@email.com");
const cu2 = new UserClass("Grace", "Wilson", 34, "grace@email.com");

// Method chaining
cu1.setAddress("789 Pine Road", "Ibadan", "Oyo State", "Nigeria", "200001");

console.log("Name      :", cu1.getFullName());
console.log(cu1.incrementAge());
console.log(cu1.addHobby("Yoga"));
console.log(cu1.addHobby("Swimming"));
console.log(cu1.addHobby("yoga")); // duplicate
console.log("Address   :", cu1.getAddress("full"));
console.log("Short addr:", cu1.getAddress("short"));
console.log("Getter    :", cu1.fullName);

cu1.fullName = "Franklin Miller Jr";
console.log("After set :", cu1.getFullName());
console.log(UserClass.compareAge(cu1, cu2));

// SECTION 4: OBJECT UTILITY METHODS
console.log("\n🛠️  SECTION 4: Object Utility Methods\n");

const sample = {
  name:    "Test User",
  age:     25,
  email:   "test@example.com",
  address: { city: "Lagos", country: "Nigeria" },
  hobbies: ["coding", "reading"],
};

console.log("Object.keys()    :", Object.keys(sample));
console.log("Object.values()  :", Object.values(sample));
console.log("Object.entries() :");
Object.entries(sample).forEach(([k, v]) => console.log(`  ${k}:`, v));

// Freeze - immutable
const frozen = Object.freeze({ name: "Frozen", age: 30 });
frozen.age = 99; // silently fails
console.log("\nObject.freeze() - age unchanged:", frozen.age);

// Assign - merge
const merged = Object.assign({}, { role: "user" }, { dept: "Engineering" });
console.log("Object.assign()  :", merged);

// Computed property names
const field = "dynamicKey";
const dynObj = { [field]: "dynamic value", [`${field}_v2`]: "v2 value" };
console.log("Computed props   :", dynObj);

// hasOwnProperty
console.log("has 'name'       :", sample.hasOwnProperty("name"));
console.log("has 'phone'      :", sample.hasOwnProperty("phone"));

// Property shorthand
const x = "hello", y = 42;
const shorthand = { x, y };
console.log("Shorthand        :", shorthand);

console.log("\n" + "=".repeat(60));
console.log("✅  OBJECT FUNDAMENTALS COMPLETE");
console.log("=".repeat(60));
