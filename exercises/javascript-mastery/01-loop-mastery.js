/**
 * LOOP MASTERY EXERCISES
 * Practice nested loops, while loops, and iteration patterns
 */

console.log("=== LOOP MASTERY EXERCISES ===\n");

// Exercise 1: Multiplication Table (For Loop)
console.log("--- Exercise 1: Multiplication Table (For Loop) ---");

/**
 * Creates a multiplication table from 1 to n
 * @param {number} n - The size of the multiplication table
 */
function multiplicationTableFor(n) {
    console.log(`\nMultiplication Table (1 to ${n}):\n`);
    
    // Header row
    let header = "   |";
    for (let i = 1; i <= n; i++) {
        header += ` ${i.toString().padStart(3)} `;
    }
    console.log(header);
    console.log("-".repeat(header.length));
    
    // Table rows
    for (let i = 1; i <= n; i++) {
        let row = `${i.toString().padStart(2)} |`;
        for (let j = 1; j <= n; j++) {
            row += ` ${(i * j).toString().padStart(3)} `;
        }
        console.log(row);
    }
}

// Run the function
multiplicationTableFor(10);

// Exercise 2: Multiplication Table (While Loop)
console.log("\n\n--- Exercise 2: Multiplication Table (While Loop) ---");

/**
 * Creates a multiplication table using while loops
 * @param {number} n - The size of the multiplication table
 */
function multiplicationTableWhile(n) {
    console.log(`\nMultiplication Table using While Loop (1 to ${n}):\n`);
    
    // Header
    let header = "   |";
    let col = 1;
    while (col <= n) {
        header += ` ${col.toString().padStart(3)} `;
        col++;
    }
    console.log(header);
    console.log("-".repeat(header.length));
    
    // Table rows
    let row = 1;
    while (row <= n) {
        let rowStr = `${row.toString().padStart(2)} |`;
        let col = 1;
        while (col <= n) {
            rowStr += ` ${(row * col).toString().padStart(3)} `;
            col++;
        }
        console.log(rowStr);
        row++;
    }
}

// Run the function
multiplicationTableWhile(5);

// Exercise 3: Pattern Printing (Nested Loops)
console.log("\n\n--- Exercise 3: Pattern Printing ---");

/**
 * Prints various patterns using nested loops
 */
function printPatterns() {
    // Pattern 1: Right Triangle
    console.log("\nPattern 1: Right Triangle");
    for (let i = 1; i <= 5; i++) {
        let stars = "";
        for (let j = 1; j <= i; j++) {
            stars += "* ";
        }
        console.log(stars);
    }
    
    // Pattern 2: Inverted Triangle
    console.log("\nPattern 2: Inverted Triangle");
    for (let i = 5; i >= 1; i--) {
        let stars = "";
        for (let j = 1; j <= i; j++) {
            stars += "* ";
        }
        console.log(stars);
    }
    
    // Pattern 3: Pyramid
    console.log("\nPattern 3: Pyramid");
    for (let i = 1; i <= 5; i++) {
        let spaces = " ".repeat((5 - i) * 2);
        let stars = "* ".repeat(i);
        console.log(spaces + stars);
    }
    
    // Pattern 4: Number Triangle
    console.log("\nPattern 4: Number Triangle");
    for (let i = 1; i <= 5; i++) {
        let numbers = "";
        for (let j = 1; j <= i; j++) {
            numbers += j + " ";
        }
        console.log(numbers);
    }
}

printPatterns();

// Exercise 4: While Loop Counter Patterns
console.log("\n\n--- Exercise 4: While Loop Counter Patterns ---");

/**
 * Count up from start to end
 */
function countUp(start, end) {
    console.log(`\nCounting up from ${start} to ${end}:`);
    let current = start;
    let result = [];
    
    while (current <= end) {
        result.push(current);
        current++;
    }
    
    console.log(result.join(", "));
}

/**
 * Count down from start to end
 */
function countDown(start, end) {
    console.log(`\nCounting down from ${start} to ${end}:`);
    let current = start;
    let result = [];
    
    while (current >= end) {
        result.push(current);
        current--;
    }
    
    console.log(result.join(", "));
}

/**
 * Count by a specific step
 */
function countByStep(start, end, step) {
    console.log(`\nCounting from ${start} to ${end} by ${step}:`);
    let current = start;
    let result = [];
    
    while (current <= end) {
        result.push(current);
        current += step;
    }
    
    console.log(result.join(", "));
}

countUp(1, 10);
countDown(10, 1);
countByStep(0, 50, 5);

// Exercise 5: Nested While Loops
console.log("\n\n--- Exercise 5: Nested While Loops ---");

/**
 * Generate a grid of coordinates
 */
function generateGrid(rows, cols) {
    console.log(`\nGenerating ${rows}x${cols} grid of coordinates:\n`);
    
    let row = 0;
    while (row < rows) {
        let col = 0;
        let rowStr = "";
        while (col < cols) {
            rowStr += `(${row},${col}) `;
            col++;
        }
        console.log(rowStr);
        row++;
    }
}

generateGrid(4, 4);

// Exercise 6: Do-While Loop Examples
console.log("\n\n--- Exercise 6: Do-While Loop ---");

/**
 * Example: Menu simulation (runs at least once)
 */
function menuSimulation() {
    console.log("\nDo-While Loop Example (Menu Simulation):");
    
    let choice = 0;
    let iteration = 1;
    
    do {
        console.log(`\nIteration ${iteration}:`);
        console.log("1. Option One");
        console.log("2. Option Two");
        console.log("3. Exit");
        
        // Simulate user choice
        choice = iteration;
        console.log(`Selected: ${choice}`);
        
        iteration++;
    } while (choice !== 3 && iteration <= 3);
    
    console.log("Exited menu");
}

menuSimulation();

// Exercise 7: Loop Control (break & continue)
console.log("\n\n--- Exercise 7: Loop Control (break & continue) ---");

/**
 * Find first number divisible by 7
 */
function findFirstDivisibleBy7(start, end) {
    console.log(`\nFinding first number divisible by 7 between ${start} and ${end}:`);
    
    for (let i = start; i <= end; i++) {
        if (i % 7 === 0) {
            console.log(`Found: ${i}`);
            break; // Exit loop when found
        }
    }
}

/**
 * Print only even numbers (skip odd)
 */
function printOnlyEven(start, end) {
    console.log(`\nPrinting only even numbers from ${start} to ${end}:`);
    let result = [];
    
    for (let i = start; i <= end; i++) {
        if (i % 2 !== 0) {
            continue; // Skip odd numbers
        }
        result.push(i);
    }
    
    console.log(result.join(", "));
}

findFirstDivisibleBy7(10, 50);
printOnlyEven(1, 20);

// Exercise 8: Performance Comparison
console.log("\n\n--- Exercise 8: Performance Comparison ---");

/**
 * Compare for loop vs while loop performance
 */
function compareLoopPerformance(iterations) {
    console.log(`\nComparing loop performance with ${iterations} iterations:\n`);
    
    // For loop
    console.time("For Loop");
    let sumFor = 0;
    for (let i = 0; i < iterations; i++) {
        sumFor += i;
    }
    console.timeEnd("For Loop");
    console.log(`Sum (for): ${sumFor}`);
    
    // While loop
    console.time("While Loop");
    let sumWhile = 0;
    let i = 0;
    while (i < iterations) {
        sumWhile += i;
        i++;
    }
    console.timeEnd("While Loop");
    console.log(`Sum (while): ${sumWhile}`);
}

compareLoopPerformance(1000000);

// CHALLENGE EXERCISES
console.log("\n\n=== CHALLENGE EXERCISES ===\n");

/**
 * Challenge 1: FizzBuzz using while loop
 */
function fizzBuzzWhile(n) {
    console.log(`FizzBuzz (1 to ${n}):`);
    let i = 1;
    let result = [];
    
    while (i <= n) {
        if (i % 15 === 0) {
            result.push("FizzBuzz");
        } else if (i % 3 === 0) {
            result.push("Fizz");
        } else if (i % 5 === 0) {
            result.push("Buzz");
        } else {
            result.push(i);
        }
        i++;
    }
    
    console.log(result.join(", "));
}

fizzBuzzWhile(20);

/**
 * Challenge 2: Prime numbers using nested loops
 */
function findPrimes(n) {
    console.log(`\nPrime numbers up to ${n}:`);
    let primes = [];
    
    for (let num = 2; num <= n; num++) {
        let isPrime = true;
        
        for (let divisor = 2; divisor <= Math.sqrt(num); divisor++) {
            if (num % divisor === 0) {
                isPrime = false;
                break;
            }
        }
        
        if (isPrime) {
            primes.push(num);
        }
    }
    
    console.log(primes.join(", "));
}

findPrimes(50);

/**
 * Challenge 3: Fibonacci sequence using while loop
 */
function fibonacciWhile(count) {
    console.log(`\nFirst ${count} Fibonacci numbers:`);
    
    let sequence = [];
    let a = 0, b = 1;
    let i = 0;
    
    while (i < count) {
        sequence.push(a);
        let temp = a + b;
        a = b;
        b = temp;
        i++;
    }
    
    console.log(sequence.join(", "));
}

fibonacciWhile(10);

console.log("\n\n=== LOOP MASTERY COMPLETE ===");
