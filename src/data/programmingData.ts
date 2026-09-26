import { ProgrammingLanguagePath } from '../types';

export const PROGRAMMING_LANGUAGES: ProgrammingLanguagePath[] = [
  {
    id: 'python',
    name: 'Python',
    slug: 'python',
    iconName: 'Terminal',
    description: 'The versatile language for Data Science, AI, Web Backend, Scripting & Automation.',
    levels: {
      beginner: {
        topics: ['Syntax & Variables', 'Control Flow (if/else, loops)', 'Functions & Modules', 'Lists, Tuples, Dicts, Sets'],
        sampleCode: `# Python Beginner Starter
def calculate_grade(score):
    if score >= 90:
        return 'A'
    elif score >= 80:
        return 'B'
    elif score >= 70:
        return 'C'
    else:
        return 'F'

students = {"Alice": 95, "Bob": 82, "Charlie": 68}
for student, score in students.items():
    print(f"{student}: Grade {calculate_grade(score)}")`
      },
      intermediate: {
        topics: ['Object-Oriented Programming (OOP)', 'Decorators & Generators', 'File I/O & Exception Handling', 'List Comprehensions & Lambdas'],
        sampleCode: `class StudentRecord:
    def __init__(self, name: str, gpa: float):
        self.name = name
        self.gpa = gpa
        
    def __repr__(self):
        return f"<Student {self.name} GPA: {self.gpa:.2f}>"

# List comprehension & sorting
students = [StudentRecord("Zara", 3.9), StudentRecord("Ali", 3.5), StudentRecord("Omar", 3.8)]
honors = [s for s in students if s.gpa >= 3.8]
print("Honors Students:", honors)`
      },
      advanced: {
        topics: ['Asyncio & Concurrency', 'Metaclasses & Reflection', 'Custom Context Managers', 'Memory Management & Cython Integration'],
        sampleCode: `import asyncio

async def fetch_user_data(user_id: int):
    print(f"Fetching data for User {user_id}...")
    await asyncio.sleep(0.5)
    return {"user_id": user_id, "status": "active"}

async def main():
    results = await asyncio.gather(*(fetch_user_data(i) for i in range(1, 4)))
    print("Concurrent Fetch Results:", results)

asyncio.run(main())`
      }
    },
    projects: [
      { title: 'CLI Task Manager', description: 'Build a command-line todo manager with local JSON persistence.', difficulty: 'Beginner' },
      { title: 'RESTful API with FastAPI', description: 'Build a full backend API with Pydantic validation and JWT Auth.', difficulty: 'Intermediate' },
      { title: 'AI Chatbot with Gemini SDK', description: 'Build an AI assistant using @google/genai or Python Google GenAI SDK.', difficulty: 'Advanced' }
    ],
    interviewQuestions: [
      { question: 'What is the difference between shallow copy and deep copy in Python?', answer: 'A shallow copy creates a new object but inserts references to the objects inside. A deep copy recursively copies all nested objects.' },
      { question: 'Explain Python GIL (Global Interpreter Lock).', answer: 'The GIL is a mutex that allows only one thread to execute Python bytecode at a time, protecting CPython memory management.' }
    ],
    exercises: [
      {
        title: 'Reverse Words in String',
        prompt: 'Write a function reverse_words(sentence: str) -> str that reverses the order of words.',
        initialCode: `def reverse_words(sentence: str) -> str:\n    # Write your solution here\n    pass\n\nprint(reverse_words("Hello World MHN"))`,
        solution: `def reverse_words(sentence: str) -> str:\n    return " ".join(sentence.split()[::-1])\n\nprint(reverse_words("Hello World MHN"))`
      }
    ]
  },

  {
    id: 'cpp',
    name: 'C++',
    slug: 'cpp',
    iconName: 'Cpu',
    description: 'High-performance system programming, game engines, competitive programming, and embedded systems.',
    levels: {
      beginner: {
        topics: ['C++ Syntax & Pointers', 'References & Memory Layout', 'Functions & Overloading', 'Arrays & Strings'],
        sampleCode: `#include <iostream>
using namespace std;

int main() {
    int val = 42;
    int* ptr = &val;
    cout << "Value: " << val << ", Address: " << ptr << endl;
    return 0;
}`
      },
      intermediate: {
        topics: ['OOP (Inheritance, Polymorphism)', 'STL Vectors, Maps, Sets', 'RAII & Smart Pointers (unique_ptr, shared_ptr)', 'Move Semantics'],
        sampleCode: `#include <iostream>
#include <memory>
#include <vector>

class Shape {
public:
    virtual void draw() const = 0;
    virtual ~Shape() = default;
};

class Circle : public Shape {
public:
    void draw() const override { std::cout << "Drawing Circle\\n"; }
};

int main() {
    std::vector<std::unique_ptr<Shape>> shapes;
    shapes.push_back(std::make_unique<Circle>());
    for (const auto& s : shapes) s->draw();
    return 0;
}`
      },
      advanced: {
        topics: ['Template Metaprogramming', 'Multithreading & std::atomic', 'Custom Memory Allocators', 'C++20 Concepts & Coroutines'],
        sampleCode: `#include <iostream>
#include <concepts>

template<typename T>
concept Numeric = std::is_arithmetic_v<T>;

template<Numeric T>
T add(T a, T b) { return a + b; }

int main() {
    std::cout << "Sum: " << add(10.5, 20.3) << std::endl;
    return 0;
}`
      }
    },
    projects: [
      { title: 'Bank Account Management System', description: 'OOP CLI program handling deposits, withdrawals, and file logging.', difficulty: 'Beginner' },
      { title: 'Custom Vector Implementation', description: 'Rebuild std::vector using raw pointers, dynamic allocation, and templates.', difficulty: 'Intermediate' },
      { title: 'Multi-threaded HTTP Web Server', description: 'Build a socket-based web server using POSIX threads and raw C++ sockets.', difficulty: 'Advanced' }
    ],
    interviewQuestions: [
      { question: 'What is RAII in C++?', answer: 'Resource Acquisition Is Initialization: tying resource lifetime (memory, file handles, sockets) to object scope using constructors and destructors.' },
      { question: 'Differentiate std::unique_ptr vs std::shared_ptr.', answer: 'unique_ptr maintains strict single ownership; shared_ptr uses reference counting to allow shared ownership.' }
    ],
    exercises: [
      {
        title: 'Find Maximum in Array',
        prompt: 'Write a function to find maximum element in a C++ vector.',
        initialCode: `#include <iostream>\n#include <vector>\n\nint findMax(const std::vector<int>& arr) {\n    // Code here\n    return 0;\n}\n\nint main() {\n    std::cout << findMax({3, 9, 1, 14, 5});\n    return 0;\n}`,
        solution: `#include <iostream>\n#include <vector>\n#include <algorithm>\n\nint findMax(const std::vector<int>& arr) {\n    return *std::max_element(arr.begin(), arr.end());\n}\n\nint main() {\n    std::cout << findMax({3, 9, 1, 14, 5});\n    return 0;\n}`
      }
    ]
  },

  {
    id: 'javascript',
    name: 'JavaScript & TypeScript',
    slug: 'javascript-typescript',
    iconName: 'Code',
    description: 'The foundation of modern Web development, Node.js servers, and full-stack engineering.',
    levels: {
      beginner: {
        topics: ['Variables (const/let)', 'DOM Manipulation', 'Functions & Arrow Functions', 'Arrays & ES6 Higher Order Methods'],
        sampleCode: `const numbers = [1, 2, 3, 4, 5];
const doubledEvens = numbers
  .filter(n => n % 2 === 0)
  .map(n => n * 2);

console.log("Doubled Evens:", doubledEvens);`
      },
      intermediate: {
        topics: ['Async/Await & Promises', 'TypeScript Interfaces & Generics', 'Event Loop & Closures', 'Modular ESM Modules'],
        sampleCode: `interface User {
  id: number;
  name: string;
  role: 'admin' | 'student';
}

async function fetchUser(id: number): Promise<User> {
  // Simulating async API call
  return { id, name: "MHN Learner", role: "student" };
}

fetchUser(101).then(user => console.log("User:", user.name));`
      },
      advanced: {
        topics: ['Custom Proxy & Reflect API', 'Web Worker Threads', 'Performance Benchmarking & V8 Optimization', 'Abstract Syntax Tree (AST) Transforms'],
        sampleCode: `const handler = {
  get(target: any, prop: string) {
    console.log(\`Property '\${prop}' accessed\`);
    return prop in target ? target[prop] : "Default Property";
  }
};

const proxyUser = new Proxy({ name: "Haseeb" }, handler);
console.log(proxyUser.name);
console.log((proxyUser as any).age);`
      }
    },
    projects: [
      { title: 'Interactive Quiz Application', description: 'Build a dynamic quiz UI using vanilla JS and local storage.', difficulty: 'Beginner' },
      { title: 'Full-Stack Kanban Board', description: 'Build a Drag-and-Drop Task Board in React + Express API.', difficulty: 'Intermediate' },
      { title: 'Real-time Collaborative Canvas', description: 'Build a multi-user drawing app using WebSockets and Canvas API.', difficulty: 'Advanced' }
    ],
    interviewQuestions: [
      { question: 'What is event delegation in JavaScript?', answer: 'Attaching a single event listener to a parent element to handle events on child elements via event bubbling.' },
      { question: 'Explain Event Loop call stack, microtask queue, and macrotask queue.', answer: 'Call stack executes sync code. Microtasks (Promises, queueMicrotask) run right after stack empties, before Macrotasks (setTimeout, I/O).' }
    ],
    exercises: [
      {
        title: 'Two Sum Problem',
        prompt: 'Given array of numbers and a target, return indices of two numbers adding to target.',
        initialCode: `function twoSum(nums, target) {\n  // Implement solution\n}\n\nconsole.log(twoSum([2, 7, 11, 15], 9));`,
        solution: `function twoSum(nums, target) {\n  const map = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const diff = target - nums[i];\n    if (map.has(diff)) return [map.get(diff), i];\n    map.set(nums[i], i);\n  }\n  return [];\n}\n\nconsole.log(twoSum([2, 7, 11, 15], 9));`
      }
    ]
  },

  {
    id: 'java',
    name: 'Java',
    slug: 'java',
    iconName: 'Coffee',
    description: 'Enterprise backend, Android development, Spring Boot, and robust object-oriented software.',
    levels: {
      beginner: {
        topics: ['Java Fundamentals & JVM', 'Classes, Objects & Constructors', 'Control Structures', 'Arrays & Strings'],
        sampleCode: `public class Main {
    public static void main(String[] args) {
        System.out.println("Welcome to Java at MHN Education!");
    }
}`
      },
      intermediate: {
        topics: ['Interfaces & Abstract Classes', 'Java Collections Framework', 'Generics & Exception Handling', 'Lambda Expressions & Streams API'],
        sampleCode: `import java.util.*;
import java.util.stream.*;

public class StreamDemo {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("Haseeb", "Ali", "Zara", "Usman");
        List<String> filtered = names.stream()
            .filter(n -> n.startsWith("A") || n.startsWith("H"))
            .sorted()
            .collect(Collectors.toList());
        System.out.println(filtered);
    }
}`
      },
      advanced: {
        topics: ['Multithreading & ExecutorService', 'Spring Boot REST APIs & Dependency Injection', 'JVM Memory Tuning (Garbage Collection)', 'Reflection API'],
        sampleCode: `import java.util.concurrent.*;

public class ConcurrencyDemo {
    public static void main(String[] args) throws Exception {
        ExecutorService executor = Executors.newFixedThreadPool(2);
        Future<String> future = executor.submit(() -> "Task completed in background");
        System.out.println("Result: " + future.get());
        executor.shutdown();
    }
}`
      }
    },
    projects: [
      { title: 'Student Management System', description: 'Java OOP application managing student records and grades.', difficulty: 'Beginner' },
      { title: 'Spring Boot REST Microservice', description: 'Build an API service with Spring Data JPA and H2 database.', difficulty: 'Intermediate' }
    ],
    interviewQuestions: [
      { question: 'What is the difference between JDK, JRE, and JVM?', answer: 'JDK is the development kit containing tools + JRE. JRE provides libraries to run Java apps. JVM executes bytecode.' }
    ],
    exercises: [
      {
        title: 'Check Palindrome String',
        prompt: 'Write a Java method to check if a string is a palindrome.',
        initialCode: `public class Palindrome {\n    public static boolean isPalindrome(String str) {\n        // Code here\n        return false;\n    }\n}`,
        solution: `public class Palindrome {\n    public static boolean isPalindrome(String str) {\n        String clean = str.replaceAll("[^a-zA-Z0-9]", "").toLowerCase();\n        return clean.equals(new StringBuilder(clean).reverse().toString());\n    }\n}`
      }
    ]
  },

  {
    id: 'sql',
    name: 'SQL & DBMS',
    slug: 'sql',
    iconName: 'Database',
    description: 'Relational database management, complex JOINs, indexing, transactions, and performance tuning.',
    levels: {
      beginner: {
        topics: ['SELECT, WHERE, ORDER BY', 'INSERT, UPDATE, DELETE', 'GROUP BY & Aggregations (COUNT, SUM, AVG)', 'Primary & Foreign Keys'],
        sampleCode: `SELECT department_id, COUNT(*) as employee_count, AVG(salary) as avg_salary
FROM employees
WHERE hire_date >= '2024-01-01'
GROUP BY department_id
HAVING AVG(salary) > 50000;`
      },
      intermediate: {
        topics: ['INNER, LEFT, RIGHT, FULL JOINs', 'Subqueries & CTEs (WITH clause)', 'Database Normalization (1NF, 2NF, 3NF, BCNF)', 'Indexes & Query Optimization'],
        sampleCode: `WITH HighPerformers AS (
  SELECT student_id, AVG(grade) as gpa
  FROM grades
  GROUP BY student_id
  HAVING AVG(grade) >= 3.8
)
SELECT s.name, hp.gpa, d.department_name
FROM HighPerformers hp
JOIN students s ON s.id = hp.student_id
JOIN departments d ON d.id = s.department_id;`
      },
      advanced: {
        topics: ['ACID Transactions & Isolation Levels', 'Stored Procedures & Triggers', 'Window Functions (ROW_NUMBER, RANK)', 'PostgreSQL / MySQL Tuning'],
        sampleCode: `SELECT student_name, subject, score,
       ROW_NUMBER() OVER (PARTITION BY subject ORDER BY score DESC) as rank_in_subject
FROM exam_scores;`
      }
    },
    projects: [
      { title: 'University DB Schema Design', description: 'Design 3NF relational schema for Courses, Students, Faculty, and Enrolments.', difficulty: 'Intermediate' }
    ],
    interviewQuestions: [
      { question: 'Explain ACID properties in relational databases.', answer: 'Atomicity (All or nothing), Consistency (Valid state rules), Isolation (Concurrent transaction safety), Durability (Persisted on commit).' }
    ],
    exercises: [
      {
        title: 'Find Second Highest Salary',
        prompt: 'Write SQL query to find second highest salary from Employee table.',
        initialCode: `-- Write SQL query here\nSELECT salary FROM Employee;`,
        solution: `SELECT MAX(salary) AS SecondHighestSalary\nFROM Employee\nWHERE salary < (SELECT MAX(salary) FROM Employee);`
      }
    ]
  }
];
