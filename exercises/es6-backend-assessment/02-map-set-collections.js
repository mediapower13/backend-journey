const userCache = new Map();

const cacheUser = user => userCache.set(user.id, user);
const getUser = id => userCache.get(id);
const hasUser = id => userCache.has(id);
const deleteUser = id => userCache.delete(id);

cacheUser({ id: "u1", name: "Ada", role: "admin" });
cacheUser({ id: "u2", name: "Tobi", role: "editor" });
cacheUser({ id: "u3", name: "Ruth", role: "viewer" });

console.log("cached users:", [...userCache.values()]);
console.log("get user u2:", getUser("u2"));
console.log("has user u9:", hasUser("u9"));
deleteUser("u3");
console.log("after delete u3:", [...userCache.keys()]);


const wordFrequency = text => {
  const freq = new Map();
  text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .split(/\s+/)
    .filter(Boolean)
    .forEach(word => freq.set(word, (freq.get(word) ?? 0) + 1));
  return freq;
};

const text = "Backend JavaScript backend API cache API set map cache backend";
const freqMap = wordFrequency(text);
console.log("word frequency:", Object.fromEntries(freqMap));

class PhoneBook {
  constructor() {
    this.contacts = new Map();
  }

  add(name, phone) {
    this.contacts.set(name.toLowerCase(), phone);
    return this;
  }

  get(name) {
    return this.contacts.get(name.toLowerCase()) ?? "Not found";
  }

  remove(name) {
    return this.contacts.delete(name.toLowerCase());
  }

  all() {
    return [...this.contacts.entries()].map(([name, phone]) => ({ name, phone }));
  }
}

const phoneBook = new PhoneBook();
phoneBook.add("David", "0801-111-1111").add("Sarah", "0802-222-2222").add("Ken", "0803-333-3333");
console.log("phone book all:", phoneBook.all());
console.log("phone book get sarah:", phoneBook.get("sarah"));
phoneBook.remove("ken");
console.log("phone book after remove ken:", phoneBook.all());

const removeDuplicates = arr => [...new Set(arr)];
console.log("remove duplicates:", removeDuplicates([1, 2, 2, 3, 4, 4, 5, 5, 5]));

const uniqueCharacters = str => [...new Set(str.toLowerCase().replace(/\s+/g, ""))];
console.log("unique characters:", uniqueCharacters("JavaScript Backend"));

const union = (setA, setB) => new Set([...setA, ...setB]);
const intersection = (setA, setB) => new Set([...setA].filter(value => setB.has(value)));
const difference = (setA, setB) => new Set([...setA].filter(value => !setB.has(value)));

const setA = new Set([1, 2, 3, 4]);
const setB = new Set([3, 4, 5, 6]);

console.log("union:", [...union(setA, setB)]);
console.log("intersection:", [...intersection(setA, setB)]);
console.log("difference A-B:", [...difference(setA, setB)]);
console.log("difference B-A:", [...difference(setB, setA)]);
