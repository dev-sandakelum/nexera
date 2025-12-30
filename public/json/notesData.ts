import { nexNoteData } from "@/components/types";

export const noteContexts: nexNoteData[] = [
  // --- Topic 01: Variables & Data Types ---
  {
    noteId: "n_01",
    context: {
      type: "note",
      url:"/md/1.md",
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
      url: "/md/4.md",
    },
  },
  {
    noteId: "n_05",
    context: {
      type: "note",
      url: "/md/5.md",
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
      url: "/md/7.md",
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
      url: "/md/9.md",
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
      url: "/md/11.md",
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
      url: "/md/13.md",
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
      url: "/md/15.md",
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
      url: "/md/17.md",
    },
  },
  {
    noteId: "n_18",
    context: {
      type: "note",
      url: "/md/18.md",
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
      url: "/md/20.md",
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
      url: "/md/22.md",
    },
  },
  {
    noteId: "n_23",
    context: {
      type: "note",
      url: "/md/23.md",
    },
  },
  {
    noteId: "n_24",
    context: {
      type: "note",
      url: "/md/24.md",
    },
  },

  // --- Topic 04: OSI Model ---
  {
    noteId: "n_25",
    context: {
      type: "note",
      url: "/md/25.md",
    },
  },{
    noteId: "n_42",
    context: {
      type: "note",
      url: "/md/42.md",
    },
  },
];
