import { nexNoteData } from "@/components/types";

export const noteContexts: nexNoteData[] = [
  // --- Topic 01: Variables & Data Types ---
  {
    noteId: "n_01",
    context: {
      type: "note",
      content: `# Comprehensive Guide: Introduction to Variables in C
# C භාෂාවේ විචල්‍යයන් (Variables) හැඳින්වීම

---

## What is a Variable?
### (විචල්‍යයක් යනු කුමක්ද?)

A **variable** is a named storage location in the computer's memory (RAM) that holds a value. Since data can change during program execution, variables allow us to store and manipulate that data.

> **Sinhala Explanation:**  
> Variable එකක් කියන්නේ දත්ත ගබඩා කරලා තියාගන්න පුළුවන් "පෙට්ටියක්" වගේ දෙයක්. RAM එකේ ඉඩක් වෙන් කරගෙන ඒකට නමක් දෙනවා.

---

## The Concept of Memory
### (මතකය ක්‍රියා කරන ආකාරය)

Each variable has:
- **Name** (e.g. \`score\`)
- **Value** (e.g. \`95\`)
- **Address** (e.g. \`0x7fff...\`)

Variables map easy-to-remember names to complex memory addresses.

> **Sinhala Explanation:**  
> පරිගණකය දත්ත හඳුනාගන්නේ Address වලින්. Variable නාම අපිට ලේසි.

---

## Declaration vs. Initialization
### (විචල්‍යයක් හඳුන්වා දීම සහ අගයක් ලබා දීම)

### Declaration
Tells the compiler the variable name and type.

\`\`\`c
int count;
\`\`\`

> **Sinhala Explanation:**  
> Declaration කියන්නේ Variable එකක් තියෙනවා කියලා Compiler එකට කියන එක.

---

### Initialization
Assigns the first value to the variable.

\`\`\`c
int count = 10;
\`\`\`

> **Sinhala Explanation:**  
> Variable එක හදන ගමන්ම අගයක් දාන එක Initialization.

---

## Fundamental Data Types
### (මූලික දත්ත වර්ග)

| Type | Description | Size | Format |
|----|-----------|------|--------|
| \`int\` | Integers | 4 bytes | %d |
| \`float\` | Decimal numbers | 4 bytes | %f |
| \`double\` | Large decimals | 8 bytes | %lf |
| \`char\` | Single character | 1 byte | %c |

> **Sinhala Explanation:**  
> - \`int\` → පූර්ණ සංඛ්‍යා  
> - \`float\` → දශම සංඛ්‍යා  
> - \`char\` → තනි අකුරක් ( \`' '\` )

---

## Rules for Naming Variables
### (නම් තැබීමේ නීති)

1. Must begin with a letter or underscore (\`_\`)
2. Can contain letters, digits, underscores
3. **Case Sensitive** — \`age\`, \`Age\`, \`AGE\` are different
4. Cannot use C keywords (\`int\`, \`return\`, \`if\`)

\`\`\`c
int age;        // valid
int student_id // valid
int 2age;      // invalid
\`\`\`

---

## Format Specifiers
### (ආකෘති පිරිවිතර)

\`\`\`c
printf("ID: %d, Salary: %.2f", id, salary);
\`\`\`

| Specifier | Meaning |
|----------|---------|
| %d | int |
| %f | float |
| %c | char |
| %s | string |

> **Sinhala Explanation:**  
> Format specifier කියන්නේ Variable එකේ type එක Compiler එකට කියන සංකේත.

---

## Variable Scope
### (විචල්‍ය පරාසය)

### Local Variable
\`\`\`c
void func() {
  int x = 10;
}
\`\`\`

### Global Variable
\`\`\`c
int global = 100;
\`\`\`

> **Sinhala Explanation:**  
> - Local → function එක ඇතුලේ විතරයි  
> - Global → හැම තැනකම

---

## Constants
### (නියතයන්)

\`\`\`c
const float PI = 3.14159;
\`\`\`

> **Sinhala Explanation:**  
> \`const\` දාපු Variable එක වෙනස් කරන්න බෑ.

---

## Type Casting
### (දත්ත වර්ග පරිවර්තනය)

\`\`\`c
int a = 5;
int b = 2;
float result = (float)a / b;
\`\`\`

> **Sinhala Explanation:**  
> එක data type එකක් වෙන type එකක් විදියට භාවිතා කිරීම Type Casting.

---

## Summary
- Variable = Named memory location  
- Declaration = Memory allocate  
- Initialization = Assign value  
- Types are mandatory  
- Scope controls visibility
`,
    },
  },
  {
    noteId: "n_02",
    context: {
      type: "pdf",
      url: "https://resources.nex/edu/c_primitive_types_chart.pdf",
      sizeInMB: 1.2,
      pageCount: 1,
    },
  },
  {
    noteId: "n_03",
    context: {
      type: "quiz",
      content: [
        {
          id: "q_01",
          question: "How many bytes is a standard `int` on a 32-bit system?",
          options: [
            { id: "opt_1", option: "2 bytes" },
            { id: "opt_2", option: "4 bytes" },
            { id: "opt_3", option: "8 bytes" },
          ],
          answerID: ["opt_2"],
        },
        {
          id: "q_02",
          question: "Which data type is best for storing a single character?",
          options: [
            { id: "opt_a", option: "int" },
            { id: "opt_b", option: "float" },
            { id: "opt_c", option: "char" },
          ],
          answerID: ["opt_c"],
        },
      ],
    },
  },
  {
    noteId: "n_04",
    context: {
      type: "note",
      content: `# Constants and Literals

In programming, a "constant" is a value that cannot be altered by the program during normal execution. C provides two primary ways to define constants.

## 1. The \`#define\` Preprocessor
This is a macro definition. The preprocessor replaces every instance of the name with the value *before* compilation starts.
* **Pros:** Uses no memory (it's a text substitution).
* **Cons:** No type checking; scope is global unless undefined.

\`\`\`c
#define PI 3.14159
#define MAX_USERS 100
\`\`\`

## 2. The \`const\` Keyword
This creates a variable whose value cannot be changed after initialization.
* **Pros:** The compiler performs type checking; respects scope rules.
* **Cons:** Uses memory storage.

\`\`\`c
const int maxAttempts = 3;
const float gravity = 9.8;
\`\`\`

## Literals
Literals are the raw values assigned to variables.
* **Integer Literal:** \`100\`, \`-5\`
* **Float Literal:** \`3.14\`, \`2.5e-3\`
* **Char Literal:** \`'A'\`
* **String Literal:** \`"Hello World"\``,
    },
  },
  {
    noteId: "n_05",
    context: {
      type: "note",
      content: `# Type Casting in C

Type casting allows you to convert a variable from one data type to another. This is crucial when performing arithmetic with mixed types.

## 1. Implicit Conversion (Coercion)
Done automatically by the compiler. Usually occurs when a smaller type is assigned to a larger type (e.g., \`int\` to \`float\`).
* **Risk:** Safe for promotion, but can cause data loss if demoting (e.g., \`float\` to \`int\`).

\`\`\`c
int x = 10;
char y = 'a';
int z = x + y; // 'y' is implicitly converted to its ASCII integer value
\`\`\`

## 2. Explicit Conversion (Casting)
Forced by the programmer using the cast operator \`(type)\`.
* **Usage:** \`(type_name) expression\`

\`\`\`c
double pi = 3.14159;
int integerPi = (int)pi; 
// Result: 3 (fractional part .14159 is lost)

int a = 5, b = 2;
float result = (float)a / b; 
// Result: 2.5 (Without casting, integer division would result in 2)
\`\`\` `,
    },
  },
  {
    noteId: "n_06",
    context: {
      type: "pdf",
      url: "https://resources.nex/edu/ascii_table_complete.pdf",
      sizeInMB: 0.5,
      pageCount: 2,
    },
  },
  {
    noteId: "n_07",
    context: {
      type: "note",
      content: `# Variable Scope and Lifetime

Scope refers to the visibility of variables within different parts of a program.

## Local Scope
Variables declared inside a function or a block \`{ ... }\` are local.
* **Visibility:** Only within that block.
* **Lifetime:** Created when the block is entered, destroyed when it is exited.

\`\`\`c
void myFunction() {
    int x = 10; // Local variable
}
// x cannot be accessed here
\`\`\`

## Global Scope
Variables declared outside of all functions, usually at the top of the file.
* **Visibility:** Accessible by any function in the file.
* **Lifetime:** Exists for the entire duration of the program.

\`\`\`c
int globalVar = 100;

void func1() {
    printf("%d", globalVar); // Works
}
\`\`\`

## Shadowing
If a local variable has the same name as a global variable, the local variable takes precedence within its scope.`,
    },
  },
  {
    noteId: "n_08",
    context: {
      type: "quiz",
      content: [
        {
          id: "q_03",
          question: "Which of the following is a valid variable name?",
          options: [
            { id: "o_1", option: "2cool" },
            { id: "o_2", option: "my_variable" },
            { id: "o_3", option: "int" },
          ],
          answerID: ["o_2"],
        },
      ],
    },
  },

  // --- Topic 02: Control Structures ---
  {
    noteId: "n_09",
    context: {
      type: "note",
      content: `# If-Else Logic Flow

Control flow statements allow your program to make decisions.

## The \`if\` Statement
Executes a block of code only if the condition is true.
\`\`\`c
if (condition) {
    // code to execute if condition is true
}
\`\`\`

## The \`else\` Statement
Executes if the \`if\` condition was false.
\`\`\`c
if (age >= 18) {
    printf("Adult");
} else {
    printf("Minor");
}
\`\`\`

## The \`else if\` Ladder
Used to test multiple conditions in sequence.
\`\`\`c
if (marks > 90) {
    printf("Grade A");
} else if (marks > 75) {
    printf("Grade B");
} else {
    printf("Grade C");
}
\`\`\`

> **Note:** Only one block in an if-else-if ladder will execute—the first one that evaluates to true.`,
    },
  },
  {
    noteId: "n_10",
    context: {
      type: "pdf",
      url: "https://resources.nex/edu/switch_case_flowcharts.pdf",
      sizeInMB: 2.4,
      pageCount: 5,
    },
  },
  {
    noteId: "n_11",
    context: {
      type: "note",
      content: `# Loops Overview

Loops are used to repeat a block of code multiple times. C supports three main types of loops.

## 1. For Loop
Ideal when you know exactly how many times you want to iterate.
* **Syntax:** \`for (initialization; condition; update) { ... }\`

\`\`\`c
for (int i = 0; i < 5; i++) {
    printf("%d ", i);
}
// Output: 0 1 2 3 4
\`\`\`

## 2. While Loop
Ideal when the number of iterations is unknown and depends on a condition being true.
* **Syntax:** \`while (condition) { ... }\`

\`\`\`c
int count = 0;
while (count < 5) {
    count++;
}
\`\`\`

## 3. Do-While Loop
Similar to the while loop, but the condition is checked *after* the code block. This guarantees the loop runs at least once.
* **Syntax:** \`do { ... } while (condition);\`

\`\`\`c
int x = 10;
do {
    printf("This prints even though x is 10");
} while (x < 5);
\`\`\``,
    },
  },
  {
    noteId: "n_12",
    context: {
      type: "quiz",
      content: [
        {
          id: "q_04",
          question: "Which loop always executes at least once?",
          options: [
            { id: "o_4", option: "for" },
            { id: "o_5", option: "while" },
            { id: "o_6", option: "do-while" },
          ],
          answerID: ["o_6"],
        },
      ],
    },
  },
  {
    noteId: "n_13",
    context: {
      type: "note",
      content: `# Computer Networks

## What is a Computer Network?

A set of communication elements connected by communication links. A network can be defined as two or more computers/nodes connected together in such a way that they can share resources.

**More specifically:**

A set of systems/nodes interconnected by communication links that is primarily used for information transfer (information = messages/data from applications)

- **Systems:** Computers and other end systems (tablets, smartphones, sensors), switches, routers
- **Links:** Wired (twisted pair, Twinax, coaxial cable, optical fiber)

## Why We are Using Computer Networks

- Before computer networks, people sent and received information by hand, using the postal service. This is slow and can be unreliable.
- Computer networks enable faster, more efficient modes of communication (email, video conferencing).
- Computer networks and the sharing of electronic data encourages the use of standard policies and procedures.
- Computer networks provide backup and recovery support for our data redundancy.
- Computer networks lead to cost savings.

## Uses of Computer Networks

### 1️⃣ Business Applications
- Resources sharing
- Communication
- Business with other companies
- A client is a program requesting services. Services is a program providing services.

### 2️⃣ Home Applications
- Access to remote information
- Person-to person communication
- Interactive Entertainment
- Electronic Commerce

### 3️⃣ Mobile Users
- Combinations of wireless networks and mobile computing.

### 4️⃣ Social Issues
- Government versus citizen
- Spam mail
- Identity theft
- Many problems could be solved if the computer security is taken seriously.

## Network Hardware

Network hardware components can be categorized into:

- Local Area Networks (LAN)
- Metropolitan Area Networks (MAN)
- Wide Area Networks (WAN)
- Wireless Networks
- Home Networks
- Internetworks

### Transmission Technologies:

#### 📡 Broadcast Links
- Single Communication channel that is shared by all the machines on the network.
- Messages on the network are called packets.
- **Broadcasting:** A packet transmitted is received by every machine.
- **Multicasting:** Transmission to a subset of the machines.

#### 🔗 Point-to-Point Links
- Point-to-point networks consist of many connections between individual pairs of machines.
- Point-to-point transmission with one sender and receiver is sometimes called unicasting.

## Local Area Networks (LAN)

LAN is a network which is designed to operate over a small physical area such as an office, factory or a group of buildings.

**Characteristics:**
- **Size:** Restricted to particular geographic region (office building, single department)
- **Transmission Technology:** 10 Mbps to 10 Gbps
- **Topology:** bus, star and ring
- Usually a privately owned network

### LAN Topologies:

#### ⭕ Ring Topology
- Each computer connects to two other computers, joining them in a circle creating a unidirectional path.
- No need of server to control the connectivity among the nodes.
- Each entity participating in the ring reads a message, then regenerates it and hands it to its neighbor.
- The ring makes it difficult to add new computers.
- Unlike a star topology network, the ring topology network will go down if one entity is removed.
- Minimum collision (in single ring)
- **Single ring:** All devices share a single cable
- **Dual ring:** Data can be sent in both directions

#### 🚌 Bus Topology
- Simplest physical topology consisting of a single cable that runs to every workstation
- Uses the least amount of cabling, but covers the shortest distance
- Each computer shares the same data and address path
- Messages pass through the trunk, and each workstation checks if the message is addressed to itself
- Difficult to add a workstation
- If main cable breaks, the entire network is disrupted
- Very expensive to maintain

#### ⭐ Star Topology
- Branches each network device off a central device called a hub
- Very easy to add a new workstation
- If any workstation goes down, it does not affect the entire network
- If the central device goes down, the entire network goes down
- Resembles spokes in a bicycle wheel
- Easy to install - cable is run from each workstation to the hub
- More expensive to install than bus networks due to more cables and hubs needed

## Metropolitan Area Network (MAN)

- Computer network larger than a LAN and connects clients and servers from multiple buildings over a larger area.
- A MAN may use different transmission technology and different media, such as fiber and wireless because of the greater distance it covers.
- Utilized across multiple buildings.
- Commonly used in school campuses or large companies with multiple buildings.
- Larger than a LAN, but smaller than a WAN.
- Also used to mean the interconnection of several LANs by bridging them together (campus network).

## Wide Area Network (WAN)

A Wide Area Network is a computer network that covers a broad area (i.e., any network whose communications links cross metropolitan, regional, or national boundaries). Or, less formally, a network that uses routers and public communications links.

- The largest and most well-known example of a WAN is the Internet.
- WANs are used to connect LANs and other types of networks together.
- Users and computers in one location can communicate with users and computers in other locations.

### 📶 Wireless WAN
- A wide area network where separate areas of coverage or cells are connected wirelessly to provide service to a large geographic area.
- WWANs make use of technologies that focus on modulation of voice and data.
- Exclusively use Radio Frequency signals designed to accommodate many users.

## Home Network

Every device in the home will be capable of communicating with every other device, and all of them will be accessible over the Internet.

- **Computers:** Desktop PC, notebook PC, PDA, shared peripherals
- **Telecommunications:** Telephone, Mobile telephone, intercom, fax
- **Appliances:** Microwave, refrigerator, clock, furnace, airco, lights, AC
- **Telemetry:** Utility meter, smoke/burglar alarm, thermostat, babycam

## Internetworks

A collection of interconnected networks is called an internetwork or internet. Internetworking devices are products used to connect networks.

As computer networks grow in size and complexity, so do the internetworking devices used to connect them.

**Internetworking Devices:**
- Repeaters
- Hubs
- Bridges
- Switches
- Routers
- Gateways

## Network Software

### 📋 Functions of Network Software
- Helps to set up and install computer networks
- Enables users to have access to network resources in a seamless manner
- Allows administrations to add or remove users from the network
- Helps to define locations of data storage and allows users to access that data
- Helps administrators and security system to protect the network from data breaches, unauthorized access and attacks
- Enables network virtualizations

### 🏗️ Protocol Hierarchies
- Networks are organized as a series of layers.
- Layer n on a host communicated with layer n on another host.
- **Layer n protocol:** Rules and conventions for this communication.
- The entities on each host implementing the layer n protocol are peers.

### 🎯 Design Issues for the Layers
- **Addressing:** Some form of addressing is needed to specify a specific destination.
- **Rules for data transfer:** Simplex, Half-duplex and full duplex transmission.
- **Error control:** Both ends must agree on error detecting and correcting codes.
- **Sequencing and reassembly:** Messages may arrive out of order and need proper reassembly.
- **Flow control:** Need to regulate flow of data to avoid swamping receiver.
- **Message size handling:** Disassembling, transmitting and reassembling messages.
- **Routing:** Choosing a path when there are multiple paths between source and destination.

## Connection-Oriented vs Connectionless Service

### 🔗 Connection-oriented Service
- Connection established and terminated
- Modeled after the telephone system
- Messages arrive in the order they are sent
- **Example:** TCP

### 📦 Connectionless Service
- Also called datagram service
- Modeled after the postal system
- No guarantees on message ordering
- Unreliable: Messages may be lost
- **Example:** UDP

## Service Primitives

A service is formally specified by a set of primitives (operations) available to a user process to access the service.

| Primitive | Meaning |
|-----------|---------|
| LISTEN | Block waiting for an incoming connection |
| CONNECT | Establish a connection with a waiting peer |
| ACCEPT | Accept an incoming connection from a peer |
| RECEIVE | Block waiting for an incoming message |
| SEND | Send a message to the peer |
| DISCONNECT | Terminate a connection |

## Relationship of Services to Protocols

- **Service:** A set of primitives (operations) that a layer provides to the layer above it.
- **Protocol:** A set of rules governing the format and meaning of the frames, packets, or messages that are exchanged by the peer entities within layer.`,
    },
  },
  {
    noteId: "n_14",
    context: {
      type: "pdf",
      url: "https://resources.nex/edu/nested_loops_matrix_guide.pdf",
      sizeInMB: 1.8,
      pageCount: 4,
    },
  },
  {
    noteId: "n_15",
    context: {
      type: "note",
      content: `# Infinite Loops

An infinite loop is a sequence of instructions that loops endlessly, either due to the loop having no terminating condition, having one that can never be met, or one that causes the loop to start over.

## Common Causes
1.  **Logical Error:** Forgetting to update the loop variable.
    \`\`\`c
    int i = 0;
    while (i < 5) {
        printf("Looping...");
        // i is never incremented, so i < 5 is always true
    }
    \`\`\`
2.  **Intentional Usage:** Sometimes infinite loops are used in embedded systems or servers where the program should not stop.

## Creating an Intentional Infinite Loop

**Using \`while\`:**
\`\`\`c
while (1) {
    // Runs forever
}
\`\`\`

**Using \`for\`:**
\`\`\`c
for (;;) {
    // Runs forever
}
\`\`\``,
    },
  },
  {
    noteId: "n_16",
    context: {
      type: "quiz",
      content: [
        {
          id: "q_05",
          question: "What is the result of `1 && 0` in C?",
          options: [
            { id: "o_7", option: "1 (True)" },
            { id: "o_8", option: "0 (False)" },
          ],
          answerID: ["o_8"],
        },
      ],
    },
  },

  // --- Topic 03: Functions ---
  {
    noteId: "n_17",
    context: {
      type: "note",
      content: `# Defining Functions in C

Functions allow you to break down large, complex problems into smaller, manageable chunks. A function is a block of code that performs a specific task.

## Anatomy of a Function

\`\`\`c
ReturnType FunctionName(ParameterList) {
    // Function Body
    // Statements...
    return value; // (Optional if ReturnType is void)
}
\`\`\`

1.  **Return Type:** Data type of the value the function returns (e.g., \`int\`, \`float\`, \`void\`).
2.  **Function Name:** The identifier used to call the function.
3.  **Parameters:** Variables that accept values passed to the function.
4.  **Body:** The code block that executes.

## Example
\`\`\`c
// Function definition
int add(int num1, int num2) {
    int sum = num1 + num2;
    return sum;
}

// Function call inside main
int result = add(5, 10);
\`\`\``,
    },
  },
  {
    noteId: "n_18",
    context: {
      type: "note",
      content: `# Parameters vs Arguments

Though often used interchangeably, there is a technical difference between these two terms.

## Parameters (Formal Parameters)
These are the variables defined in the function declaration. They act as placeholders for the values that will be passed into the function.

\`\`\`c
// 'x' and 'y' are PARAMETERS
void multiply(int x, int y) { ... }
\`\`\`

## Arguments (Actual Parameters)
These are the actual values or variables passed to the function when it is called.

\`\`\`c
// 10 and 20 are ARGUMENTS
multiply(10, 20);
\`\`\`

> **Analogy:** Think of parameters as empty slots in a vending machine, and arguments as the actual soda cans you put into those slots.`,
    },
  },
  {
    noteId: "n_19",
    context: {
      type: "pdf",
      url: "https://resources.nex/edu/memory_call_stack_diagrams.pdf",
      sizeInMB: 3.5,
      pageCount: 10,
    },
  },
  {
    noteId: "n_20",
    context: {
      type: "note",
      content: `# Recursion Explained

Recursion occurs when a function calls itself directly or indirectly. It provides a way to solve problems that can be broken down into smaller, self-similar sub-problems (e.g., Factorials, Fibonacci sequence).

## Structure of a Recursive Function
A recursive function **must** have two parts:
1.  **Base Case:** A condition that stops the recursion. Without this, the function will call itself infinitely, causing a Stack Overflow.
2.  **Recursive Step:** The part where the function calls itself with modified arguments to move closer to the base case.

## Example: Factorial
\`\`\`c
int factorial(int n) {
    if (n == 0) // Base Case
        return 1;
    else        // Recursive Step
        return n * factorial(n - 1);
}
\`\`\``,
    },
  },
  {
    noteId: "n_21",
    context: {
      type: "quiz",
      content: [
        {
          id: "q_06",
          question:
            "Which keyword indicates a function does not return a value?",
          options: [
            { id: "o_9", option: "null" },
            { id: "o_10", option: "void" },
            { id: "o_11", option: "empty" },
          ],
          answerID: ["o_10"],
        },
      ],
    },
  },
  {
    noteId: "n_22",
    context: {
      type: "note",
      content: `# Standard Libraries

C does not have built-in functionality for input/output or complex math in the core language. Instead, it relies on Standard Libraries. You include them using \`#include <header.h>\`.

## Common Libraries

### 1. \`<stdio.h>\` (Standard Input Output)
* \`printf()\`: Prints to the console.
* \`scanf()\`: Reads input from the console.
* \`fopen()\`, \`fclose()\`: File handling.

### 2. \`<math.h>\` (Math Functions)
* \`sqrt(x)\`: Square root.
* \`pow(base, exp)\`: Power.
* \`ceil(x)\`: Rounds up.
* \`floor(x)\`: Rounds down.

### 3. \`<string.h>\` (String Manipulation)
* \`strlen()\`: Length of string.
* \`strcpy()\`: Copy string.
* \`strcmp()\`: Compare strings.`,
    },
  },
  {
    noteId: "n_23",
    context: {
      type: "note",
      content: `# Function Prototypes

In C, the compiler reads code from top to bottom. If you try to call a function before it is defined, the compiler will throw an error (or a warning in older C versions).

## What is a Prototype?
A function prototype is a declaration that tells the compiler about the function's name, return type, and parameters *before* the function is actually implemented.

### Syntax
\`ReturnType FunctionName(ParameterTypes);\`

### Example Code Structure
\`\`\`c
#include <stdio.h>

// Function Prototype
void greetUser(); 

int main() {
    greetUser(); // Compiler knows 'greetUser' exists because of the prototype
    return 0;
}

// Function Definition
void greetUser() {
    printf("Hello!");
}
\`\`\``,
    },
  },
  {
    noteId: "n_24",
    context: {
      type: "note",
      content: `# Pass by Value

In C, the default way arguments are passed to functions is **Pass by Value**.

## How it works
1.  When a function is called, the value of the argument is **copied** into the function's parameter.
2.  The function works with this copy, not the original variable.
3.  Changes made to the parameter inside the function **do not affect** the variable in the calling function.

## Example
\`\`\`c
void changeValue(int num) {
    num = 100; // Changes the copy
}

int main() {
    int x = 10;
    changeValue(x);
    printf("%d", x); // Output is still 10
}
\`\`\`

> To modify the original value, you must use **Pointers** (Pass by Reference), which is an advanced topic.`,
    },
  },

  // --- Topic 04: OSI Model ---
  {
    noteId: "n_25",
    context: {
      type: "note",
      content: `# The 7 Layers of the OSI Model

The Open Systems Interconnection (OSI) model is a conceptual framework used to understand network interactions. It divides network communication into seven layers.

## Layers (Bottom to Top)

1.  **Physical Layer (Layer 1):**
    * Deals with the physical connection (cables, fiber, wifi).
    * Transmits raw **bits** (0s and 1s) over the medium.
    * Devices: Hubs, Repeaters, Cables.

2.  **Data Link Layer (Layer 2):**
    * Provides node-to-node data transfer.
    * Handles physical addressing (**MAC addresses**).
    * Unit of data: **Frame**.
    * Devices: Switches, Bridges.

3.  **Network Layer (Layer 3):**
    * Handles routing and logical addressing (**IP addresses**).
    * Determines the best path for data to travel.
    * Unit of data: **Packet**.
    * Devices: Routers.

4.  **Transport Layer (Layer 4):**
    * Ensures complete data transfer.
    * Protocols: **TCP** (reliable) and **UDP** (fast).
    * Unit of data: **Segment**.

5.  **Session Layer (Layer 5):**
    * Establishes, maintains, and terminates connections (sessions) between applications.

6.  **Presentation Layer (Layer 6):**
    * Translates data between the application and the network.
    * Handles **encryption**, decryption, and compression (e.g., SSL/TLS, JPEG, ASCII).

7.  **Application Layer (Layer 7):**
    * The layer the user interacts with directly.
    * Protocols: HTTP, FTP, SMTP, DNS.`,
    },
  },
];
