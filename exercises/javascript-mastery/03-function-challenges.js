/**
 * FUNCTION CHALLENGES
 * Practice function creation, string manipulation, and problem-solving
 */

console.log("=== FUNCTION CHALLENGES ===\n");

// ============================================
// Challenge 1: isPalindrome Function
// ============================================
console.log("--- Challenge 1: Palindrome Checker ---\n");

/**
 * Check if a string is a palindrome
 * A palindrome reads the same forwards and backwards
 * @param {string} str - The string to check
 * @returns {boolean} - True if palindrome, false otherwise
 */
function isPalindrome(str) {
    // Remove non-alphanumeric characters and convert to lowercase
    const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    // Compare with reversed string
    const reversed = cleaned.split('').reverse().join('');
    
    return cleaned === reversed;
}

// Test cases
const testStrings = [
    "racecar",
    "hello",
    "A man, a plan, a canal: Panama",
    "race a car",
    "Was it a car or a cat I saw?",
    "Madam",
    "12321",
    "12345"
];

console.log("Testing isPalindrome function:");
testStrings.forEach(str => {
    console.log(`"${str}" => ${isPalindrome(str)}`);
});

// ============================================
// Challenge 2: Alternative Palindrome Implementations
// ============================================
console.log("\n\n--- Challenge 2: Alternative Implementations ---\n");

/**
 * Check palindrome using two-pointer approach
 */
function isPalindromePointers(str) {
    const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    let left = 0;
    let right = cleaned.length - 1;
    
    while (left < right) {
        if (cleaned[left] !== cleaned[right]) {
            return false;
        }
        left++;
        right--;
    }
    
    return true;
}

/**
 * Check palindrome using recursion
 */
function isPalindromeRecursive(str) {
    const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    function checkPalindrome(s) {
        if (s.length <= 1) return true;
        if (s[0] !== s[s.length - 1]) return false;
        return checkPalindrome(s.slice(1, -1));
    }
    
    return checkPalindrome(cleaned);
}

/**
 * Check palindrome using for loop
 */
function isPalindromeLoop(str) {
    const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    const len = cleaned.length;
    
    for (let i = 0; i < len / 2; i++) {
        if (cleaned[i] !== cleaned[len - 1 - i]) {
            return false;
        }
    }
    
    return true;
}

console.log("Comparing different implementations:");
const testWord = "A man, a plan, a canal: Panama";
console.log(`String: "${testWord}"`);
console.log(`Regular: ${isPalindrome(testWord)}`);
console.log(`Two Pointers: ${isPalindromePointers(testWord)}`);
console.log(`Recursive: ${isPalindromeRecursive(testWord)}`);
console.log(`Loop: ${isPalindromeLoop(testWord)}`);

// ============================================
// Challenge 3: String Manipulation Functions
// ============================================
console.log("\n\n--- Challenge 3: String Manipulation ---\n");

/**
 * Reverse a string
 */
function reverseString(str) {
    return str.split('').reverse().join('');
}

/**
 * Count vowels in a string
 */
function countVowels(str) {
    const vowels = 'aeiouAEIOU';
    return str.split('').filter(char => vowels.includes(char)).length;
}

/**
 * Count consonants in a string
 */
function countConsonants(str) {
    const letters = str.toLowerCase().replace(/[^a-z]/g, '');
    const vowels = 'aeiou';
    return letters.split('').filter(char => !vowels.includes(char)).length;
}

/**
 * Capitalize first letter of each word
 */
function capitalizeWords(str) {
    return str
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
}

/**
 * Remove duplicates from string
 */
function removeDuplicates(str) {
    return [...new Set(str)].join('');
}

/**
 * Count character frequency
 */
function charFrequency(str) {
    return str.split('').reduce((freq, char) => {
        freq[char] = (freq[char] || 0) + 1;
        return freq;
    }, {});
}

// Test string manipulation functions
const sampleText = "Hello World";
console.log(`Original: "${sampleText}"`);
console.log(`Reversed: "${reverseString(sampleText)}"`);
console.log(`Vowels: ${countVowels(sampleText)}`);
console.log(`Consonants: ${countConsonants(sampleText)}`);
console.log(`Capitalized: "${capitalizeWords(sampleText.toLowerCase())}"`);
console.log(`No duplicates: "${removeDuplicates(sampleText)}"`);
console.log(`Frequency:`, charFrequency(sampleText));

// ============================================
// Challenge 4: Number Functions
// ============================================
console.log("\n\n--- Challenge 4: Number Functions ---\n");

/**
 * Check if number is prime
 */
function isPrime(num) {
    if (num <= 1) return false;
    if (num <= 3) return true;
    if (num % 2 === 0 || num % 3 === 0) return false;
    
    for (let i = 5; i * i <= num; i += 6) {
        if (num % i === 0 || num % (i + 2) === 0) return false;
    }
    
    return true;
}

/**
 * Generate Fibonacci sequence
 */
function fibonacci(n) {
    if (n <= 0) return [];
    if (n === 1) return [0];
    
    const sequence = [0, 1];
    for (let i = 2; i < n; i++) {
        sequence.push(sequence[i - 1] + sequence[i - 2]);
    }
    
    return sequence;
}

/**
 * Calculate factorial
 */
function factorial(n) {
    if (n < 0) return undefined;
    if (n === 0 || n === 1) return 1;
    return n * factorial(n - 1);
}

/**
 * Check if number is perfect square
 */
function isPerfectSquare(num) {
    return Math.sqrt(num) % 1 === 0;
}

/**
 * Sum of digits
 */
function sumOfDigits(num) {
    return Math.abs(num)
        .toString()
        .split('')
        .reduce((sum, digit) => sum + parseInt(digit), 0);
}

// Test number functions
console.log("Prime numbers from 1-20:");
console.log(Array.from({ length: 20 }, (_, i) => i + 1).filter(isPrime));

console.log("\nFirst 10 Fibonacci numbers:");
console.log(fibonacci(10));

console.log("\nFactorials:");
[5, 6, 7].forEach(n => console.log(`${n}! = ${factorial(n)}`));

console.log("\nPerfect squares check:");
[16, 20, 25, 30].forEach(n => console.log(`${n} is perfect square: ${isPerfectSquare(n)}`));

console.log("\nSum of digits:");
[123, 456, 789].forEach(n => console.log(`${n} => ${sumOfDigits(n)}`));

// ============================================
// Challenge 5: Array Functions
// ============================================
console.log("\n\n--- Challenge 5: Array Functions ---\n");

/**
 * Find maximum value in array
 */
function findMax(arr) {
    return Math.max(...arr);
}

/**
 * Find minimum value in array
 */
function findMin(arr) {
    return Math.min(...arr);
}

/**
 * Calculate average
 */
function average(arr) {
    return arr.reduce((sum, num) => sum + num, 0) / arr.length;
}

/**
 * Remove duplicates from array
 */
function removeDuplicatesArray(arr) {
    return [...new Set(arr)];
}

/**
 * Flatten nested array
 */
function flattenArray(arr) {
    return arr.flat(Infinity);
}

/**
 * Chunk array into smaller arrays
 */
function chunkArray(arr, size) {
    const chunks = [];
    for (let i = 0; i < arr.length; i += size) {
        chunks.push(arr.slice(i, i + size));
    }
    return chunks;
}

// Test array functions
const numbers = [5, 2, 8, 1, 9, 3, 7, 4, 6];
console.log("Array:", numbers);
console.log("Max:", findMax(numbers));
console.log("Min:", findMin(numbers));
console.log("Average:", average(numbers).toFixed(2));

const duplicates = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4];
console.log("\nWith duplicates:", duplicates);
console.log("Unique:", removeDuplicatesArray(duplicates));

const nested = [1, [2, 3], [4, [5, 6]]];
console.log("\nNested array:", nested);
console.log("Flattened:", flattenArray(nested));

console.log("\nChunked array:");
console.log(chunkArray([1, 2, 3, 4, 5, 6, 7, 8], 3));

// ============================================
// Challenge 6: Advanced String Functions
// ============================================
console.log("\n\n--- Challenge 6: Advanced Challenges ---\n");

/**
 * Check if two strings are anagrams
 */
function isAnagram(str1, str2) {
    const clean1 = str1.toLowerCase().replace(/[^a-z]/g, '').split('').sort().join('');
    const clean2 = str2.toLowerCase().replace(/[^a-z]/g, '').split('').sort().join('');
    return clean1 === clean2;
}

/**
 * Find longest word in sentence
 */
function longestWord(sentence) {
    return sentence
        .split(' ')
        .reduce((longest, word) => word.length > longest.length ? word : longest, '');
}

/**
 * Title case a string
 */
function toTitleCase(str) {
    return str
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

/**
 * Truncate string
 */
function truncate(str, maxLength) {
    return str.length > maxLength ? str.slice(0, maxLength) + '...' : str;
}

/**
 * Count words in string
 */
function wordCount(str) {
    return str.trim().split(/\s+/).length;
}

// Test advanced functions
console.log("Anagram check:");
console.log(`"listen" & "silent": ${isAnagram("listen", "silent")}`);
console.log(`"hello" & "world": ${isAnagram("hello", "world")}`);

const sentence = "The quick brown fox jumps over the lazy dog";
console.log(`\nSentence: "${sentence}"`);
console.log(`Longest word: "${longestWord(sentence)}"`);
console.log(`Word count: ${wordCount(sentence)}`);

console.log(`\nTitle case: "${toTitleCase(sentence.toLowerCase())}"`);
console.log(`Truncated (20): "${truncate(sentence, 20)}"`);

// ============================================
// Challenge 7: Object Functions
// ============================================
console.log("\n\n--- Challenge 7: Object Functions ---\n");

/**
 * Deep clone an object
 */
function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

/**
 * Merge two objects
 */
function mergeObjects(obj1, obj2) {
    return { ...obj1, ...obj2 };
}

/**
 * Get object keys count
 */
function objectSize(obj) {
    return Object.keys(obj).length;
}

/**
 * Check if object is empty
 */
function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

// Test object functions
const person = { name: "John", age: 30, city: "New York" };
const cloned = deepClone(person);
console.log("Original:", person);
console.log("Cloned:", cloned);

const merged = mergeObjects(person, { job: "Developer", age: 31 });
console.log("Merged:", merged);

console.log(`Object size: ${objectSize(person)}`);
console.log(`Is empty: ${isEmpty({})}`);

// ============================================
// FINAL CHALLENGE: Complex Function
// ============================================
console.log("\n\n--- FINAL CHALLENGE ---\n");

/**
 * Validate password strength
 * Must contain: uppercase, lowercase, number, special char, min 8 chars
 */
function validatePassword(password) {
    const minLength = password.length >= 8;
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*]/.test(password);
    
    const isValid = minLength && hasUpper && hasLower && hasNumber && hasSpecial;
    
    return {
        valid: isValid,
        checks: {
            minLength,
            hasUpper,
            hasLower,
            hasNumber,
            hasSpecial
        }
    };
}

// Test password validation
const passwords = ["weak", "Better123", "Strong@123"];
console.log("Password validation:");
passwords.forEach(pwd => {
    const result = validatePassword(pwd);
    console.log(`\n"${pwd}":`);
    console.log(`Valid: ${result.valid}`);
    console.log("Checks:", result.checks);
});

console.log("\n\n=== FUNCTION CHALLENGES COMPLETE ===");
