/**
 * ARRAY METHODS PRACTICE
 * Work with student dataset to master filter, map, reduce, sort, some, every
 */

console.log("=== ARRAY METHODS PRACTICE ===\n");

// Student Dataset

const students = [
    { id: 1, name: "Alice Johnson", age: 20, grade: 85, major: "Computer Science", gpa: 3.5, active: true },
    { id: 2, name: "Bob Smith", age: 22, grade: 92, major: "Mathematics", gpa: 3.8, active: true },
    { id: 3, name: "Charlie Brown", age: 19, grade: 78, major: "Computer Science", gpa: 3.2, active: false },
    { id: 4, name: "Diana Prince", age: 21, grade: 95, major: "Physics", gpa: 3.9, active: true },
    { id: 5, name: "Eve Wilson", age: 20, grade: 88, major: "Mathematics", gpa: 3.6, active: true },
    { id: 6, name: "Frank Castle", age: 23, grade: 72, major: "Biology", gpa: 2.9, active: false },
    { id: 7, name: "Grace Hopper", age: 22, grade: 98, major: "Computer Science", gpa: 4.0, active: true },
    { id: 8, name: "Henry Ford", age: 21, grade: 81, major: "Engineering", gpa: 3.3, active: true },
    { id: 9, name: "Iris West", age: 19, grade: 90, major: "Physics", gpa: 3.7, active: true },
    { id: 10, name: "Jack Ryan", age: 24, grade: 68, major: "Biology", gpa: 2.7, active: false }
];

console.log("Student Dataset:");
console.table(students);

// Exercise 1: FILTER METHOD
console.log("\n\n=== Exercise 1: FILTER METHOD ===\n");

// 1.1: Filter active students
console.log("--- Active Students ---");
const activeStudents = students.filter(student => student.active);
console.table(activeStudents);
console.log(`Count: ${activeStudents.length}`);

// 1.2: Filter students with grade >= 90
console.log("\n--- Students with Grade >= 90 ---");
const highAchievers = students.filter(student => student.grade >= 90);
console.table(highAchievers);

// 1.3: Filter Computer Science majors
console.log("\n--- Computer Science Majors ---");
const csStudents = students.filter(student => student.major === "Computer Science");
console.table(csStudents);

// 1.4: Filter students with GPA > 3.5 and active
console.log("\n--- Active Students with GPA > 3.5 ---");
const topActiveStudents = students.filter(student => student.gpa > 3.5 && student.active);
console.table(topActiveStudents);

// 1.5: Filter students younger than 21
console.log("\n--- Students Younger than 21 ---");
const youngStudents = students.filter(student => student.age < 21);
console.table(youngStudents);

// Exercise 2: MAP METHOD
console.log("\n\n=== Exercise 2: MAP METHOD ===\n");

// 2.1: Get array of student names
console.log("--- Student Names ---");
const studentNames = students.map(student => student.name);
console.log(studentNames);

// 2.2: Create array of formatted strings
console.log("\n--- Formatted Student Info ---");
const formattedInfo = students.map(student => 
    `${student.name} (${student.major}) - Grade: ${student.grade}`
);
formattedInfo.forEach(info => console.log(info));

// 2.3: Convert grades to letter grades
console.log("\n--- Letter Grades ---");
const letterGrades = students.map(student => {
    let letter;
    if (student.grade >= 90) letter = 'A';
    else if (student.grade >= 80) letter = 'B';
    else if (student.grade >= 70) letter = 'C';
    else if (student.grade >= 60) letter = 'D';
    else letter = 'F';
    
    return {
        name: student.name,
        numericGrade: student.grade,
        letterGrade: letter
    };
});
console.table(letterGrades);

// 2.4: Increase all grades by 5 points (bonus)
console.log("\n--- Grades After Bonus (+5 points) ---");
const bonusGrades = students.map(student => ({
    name: student.name,
    originalGrade: student.grade,
    newGrade: Math.min(student.grade + 5, 100) // Cap at 100
}));
console.table(bonusGrades);

// 2.5: Extract specific properties
console.log("\n--- Student Summary ---");
const studentSummary = students.map(({ name, grade, major }) => ({
    name,
    grade,
    major
}));
console.table(studentSummary);

// Exercise 3: REDUCE METHOD
console.log("\n\n=== Exercise 3: REDUCE METHOD ===\n");

// 3.1: Calculate average grade
console.log("--- Average Grade ---");
const totalGrade = students.reduce((sum, student) => sum + student.grade, 0);
const averageGrade = totalGrade / students.length;
console.log(`Average Grade: ${averageGrade.toFixed(2)}`);

// 3.2: Calculate average GPA
console.log("\n--- Average GPA ---");
const totalGPA = students.reduce((sum, student) => sum + student.gpa, 0);
const averageGPA = totalGPA / students.length;
console.log(`Average GPA: ${averageGPA.toFixed(2)}`);

// 3.3: Count students by major
console.log("\n--- Students by Major ---");
const studentsByMajor = students.reduce((acc, student) => {
    acc[student.major] = (acc[student.major] || 0) + 1;
    return acc;
}, {});
console.table(studentsByMajor);

// 3.4: Find highest grade
console.log("\n--- Highest Grade ---");
const highestGrade = students.reduce((max, student) => 
    student.grade > max ? student.grade : max, 0
);
console.log(`Highest Grade: ${highestGrade}`);

// 3.5: Calculate total age of all students
console.log("\n--- Total Age ---");
const totalAge = students.reduce((sum, student) => sum + student.age, 0);
console.log(`Total Age: ${totalAge} years`);
console.log(`Average Age: ${(totalAge / students.length).toFixed(1)} years`);

// 3.6: Group students by active status
console.log("\n--- Students Grouped by Status ---");
const groupedByStatus = students.reduce((acc, student) => {
    const status = student.active ? 'active' : 'inactive';
    if (!acc[status]) acc[status] = [];
    acc[status].push(student.name);
    return acc;
}, {});
console.log(groupedByStatus);

// Exercise 4: SORT METHOD
console.log("\n\n=== Exercise 4: SORT METHOD ===\n");

// 4.1: Sort by grade (ascending)
console.log("--- Sorted by Grade (Ascending) ---");
const sortedByGradeAsc = [...students].sort((a, b) => a.grade - b.grade);
console.table(sortedByGradeAsc.map(s => ({ name: s.name, grade: s.grade })));

// 4.2: Sort by grade (descending)
console.log("\n--- Sorted by Grade (Descending) ---");
const sortedByGradeDesc = [...students].sort((a, b) => b.grade - a.grade);
console.table(sortedByGradeDesc.map(s => ({ name: s.name, grade: s.grade })));

// 4.3: Sort by name (alphabetically)
console.log("\n--- Sorted by Name (A-Z) ---");
const sortedByName = [...students].sort((a, b) => a.name.localeCompare(b.name));
console.table(sortedByName.map(s => ({ name: s.name, major: s.major })));

// 4.4: Sort by age, then by grade
console.log("\n--- Sorted by Age, then Grade ---");
const sortedByAgeAndGrade = [...students].sort((a, b) => {
    if (a.age !== b.age) return a.age - b.age;
    return b.grade - a.grade;
});
console.table(sortedByAgeAndGrade.map(s => ({ name: s.name, age: s.age, grade: s.grade })));

// 4.5: Sort by GPA (descending)
console.log("\n--- Sorted by GPA (Highest First) ---");
const sortedByGPA = [...students].sort((a, b) => b.gpa - a.gpa);
console.table(sortedByGPA.map(s => ({ name: s.name, gpa: s.gpa })));

// Exercise 5: SOME METHOD
console.log("\n\n=== Exercise 5: SOME METHOD ===\n");

// 5.1: Check if any student has perfect grade (100)
const hasPerfectScore = students.some(student => student.grade === 100);
console.log(`Any student with perfect score (100)? ${hasPerfectScore}`);

// 5.2: Check if any student has GPA 4.0
const hasGPA4 = students.some(student => student.gpa === 4.0);
console.log(`Any student with GPA 4.0? ${hasGPA4}`);

// 5.3: Check if any student is inactive
const hasInactiveStudent = students.some(student => !student.active);
console.log(`Any inactive student? ${hasInactiveStudent}`);

// 5.4: Check if any student is older than 23
const hasOlderStudent = students.some(student => student.age > 23);
console.log(`Any student older than 23? ${hasOlderStudent}`);

// 5.5: Check if any Physics major exists
const hasPhysicsMajor = students.some(student => student.major === "Physics");
console.log(`Any Physics major? ${hasPhysicsMajor}`);

// Exercise 6: EVERY METHOD
console.log("\n\n=== Exercise 6: EVERY METHOD ===\n");

// 6.1: Check if all students passed (grade >= 60)
const allPassed = students.every(student => student.grade >= 60);
console.log(`All students passed (grade >= 60)? ${allPassed}`);

// 6.2: Check if all students are active
const allActive = students.every(student => student.active);
console.log(`All students active? ${allActive}`);

// 6.3: Check if all students have GPA above 2.5
const allAbove25GPA = students.every(student => student.gpa > 2.5);
console.log(`All students have GPA > 2.5? ${allAbove25GPA}`);

// 6.4: Check if all students are adults (>= 18)
const allAdults = students.every(student => student.age >= 18);
console.log(`All students are adults (>= 18)? ${allAdults}`);

// 6.5: Check if all students have names
const allHaveNames = students.every(student => student.name && student.name.length > 0);
console.log(`All students have names? ${allHaveNames}`);

// Exercise 7: CHAINING METHODS
console.log("\n\n=== Exercise 7: CHAINING METHODS ===\n");

// 7.1: Get names of active CS students with grade >= 85
console.log("--- Active CS Students with Grade >= 85 ---");
const topCSStudents = students
    .filter(s => s.active && s.major === "Computer Science" && s.grade >= 85)
    .map(s => s.name);
console.log(topCSStudents);

// 7.2: Calculate average grade of active students
console.log("\n--- Average Grade of Active Students ---");
const activeAverage = students
    .filter(s => s.active)
    .reduce((sum, s, _, arr) => sum + s.grade / arr.length, 0);
console.log(`Average: ${activeAverage.toFixed(2)}`);

// 7.3: Get top 3 students by grade
console.log("\n--- Top 3 Students by Grade ---");
const top3Students = students
    .sort((a, b) => b.grade - a.grade)
    .slice(0, 3)
    .map(s => ({ name: s.name, grade: s.grade }));
console.table(top3Students);

// 7.4: Count majors for active students
console.log("\n--- Major Distribution (Active Students) ---");
const activeMajorCount = students
    .filter(s => s.active)
    .reduce((acc, s) => {
        acc[s.major] = (acc[s.major] || 0) + 1;
        return acc;
    }, {});
console.table(activeMajorCount);

// Exercise 8: ADVANCED TRANSFORMATIONS
console.log("\n\n=== Exercise 8: ADVANCED TRANSFORMATIONS ===\n");

// 8.1: Create grade distribution
console.log("--- Grade Distribution ---");
const gradeDistribution = students.reduce((acc, student) => {
    if (student.grade >= 90) acc.A++;
    else if (student.grade >= 80) acc.B++;
    else if (student.grade >= 70) acc.C++;
    else if (student.grade >= 60) acc.D++;
    else acc.F++;
    return acc;
}, { A: 0, B: 0, C: 0, D: 0, F: 0 });
console.table(gradeDistribution);

// 8.2: Calculate statistics
console.log("\n--- Statistics ---");
const stats = {
    totalStudents: students.length,
    averageAge: (students.reduce((sum, s) => sum + s.age, 0) / students.length).toFixed(1),
    averageGrade: (students.reduce((sum, s) => sum + s.grade, 0) / students.length).toFixed(2),
    averageGPA: (students.reduce((sum, s) => sum + s.gpa, 0) / students.length).toFixed(2),
    highestGrade: Math.max(...students.map(s => s.grade)),
    lowestGrade: Math.min(...students.map(s => s.grade)),
    activeCount: students.filter(s => s.active).length,
    inactiveCount: students.filter(s => !s.active).length
};
console.table(stats);

// 8.3: Rank students
console.log("\n--- Student Rankings ---");
const rankedStudents = students
    .sort((a, b) => b.grade - a.grade)
    .map((student, index) => ({
        rank: index + 1,
        name: student.name,
        grade: student.grade,
        gpa: student.gpa
    }));
console.table(rankedStudents);

// CHALLENGE EXERCISES
console.log("\n\n=== CHALLENGE EXERCISES ===\n");

// Challenge 1: Find students with above-average grade
console.log("--- Students Above Average Grade ---");
const avg = students.reduce((sum, s) => sum + s.grade, 0) / students.length;
const aboveAverage = students
    .filter(s => s.grade > avg)
    .map(s => ({ name: s.name, grade: s.grade, diff: +(s.grade - avg).toFixed(2) }));
console.table(aboveAverage);

// Challenge 2: Create major leaderboard
console.log("\n--- Major Leaderboard (Average Grade) ---");
const majorLeaderboard = Object.entries(
    students.reduce((acc, s) => {
        if (!acc[s.major]) acc[s.major] = { total: 0, count: 0 };
        acc[s.major].total += s.grade;
        acc[s.major].count++;
        return acc;
    }, {})
)
.map(([major, data]) => ({
    major,
    averageGrade: (data.total / data.count).toFixed(2),
    studentCount: data.count
}))
.sort((a, b) => b.averageGrade - a.averageGrade);
console.table(majorLeaderboard);

// Challenge 3: Find honor roll (GPA >= 3.5 and Grade >= 85)
console.log("\n--- Honor Roll ---");
const honorRoll = students
    .filter(s => s.gpa >= 3.5 && s.grade >= 85)
    .map(s => ({ name: s.name, gpa: s.gpa, grade: s.grade }))
    .sort((a, b) => b.gpa - a.gpa);
console.table(honorRoll);

console.log("\n\n=== ARRAY METHODS PRACTICE COMPLETE ===");
