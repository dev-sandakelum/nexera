// export type Note_dataSet = {
//   catogory: string;
//   data: {
//     ID: string;
//     username: string;
//     fileType: "pdf" | "note" | "quiz";
//     name: string;
//     description: string;
//   }[];
// };
// export type Subject = {
//   id: string;
//   title: string;
//   description: string;
// }[];

export type nexSubject = {
  id: string;
  title: string;
  description: string;
  slug: string;

  departmentID: string;   // 🔑
  academicYear: number;   // 🔑 (1, 2, 3, 4)
  semester?: number;      // optional 1,2

  createdBy: string;      // userID

  isOfficial: boolean;    // 🔑 admin-approved

  createdAt: string;
  updatedAt: string;
};

export type uniDepartment = {
  id: string;
  name: string;   // Computer Science
  code: string;   // CS
};

export type nexTopic = {
  id: string;
  subjectID: string;
  title: string;
  description: string;
  slug: string;
  createdBy: string;      // userID
  createdAt: string;
  updatedAt: string;
};
export type baseNote = {
  type: "note";
  url: string;
};
export type pdfNote = {
  type: "pdf";
  url: string;
  sizeInMB: number;
  pageCount?: number;
};
// export type nexQuestion = {
//   id: string;
//   question: string;
//   options: {
//     id: string;
//     option: string;
//   }[];
//   answerID: string[];
// };
export type quizNote = {
  type: "quiz";
  quizUrl: string;
};

export type nexNoteAbout = {
  id: string;
  topicID: string;
  title: string;
  description: string;
  type: "note" | "pdf" | "quiz";
  slug: string;
  createdAt: string;
  published: boolean;
  publishedBy: string; // userID
  updatedAt: string;
  status: "pending" | "approved" | "rejected";
  approvedBy?: string;
};
export type nexNoteData = {
  noteId: string;
  context: pdfNote | baseNote | quizNote;
};

export type nexProjectData = {
  id: string;
  title: string;
  access: "admin only" | "public" | "private";
  description: string;
  action: {
    label: string;
    icon:
      | "Github"
      | "Globe"
      | "Lock"
      | "Shield"
      | "Terminal"
      | "Edit3"
      | "Share2"
      | "ExternalLink"
      | "Code"
      | "Database"
      | "LayoutTemplate";
  };
  contributions: {
    userID: string; // u_001 to u_026
  }[]; // 3 to 6 contributions
  verified: boolean;
  socials: {
    id: number;
    type: "github" | "linkedin";
    url?: string;
  }[];
};

export type NexeraUser = {
  id: string;
  name: string;
  email: string; //*@nex.com (a@nex.com) (only for testing purposes , just use single letters before @nex.com)
  password: string; //nex1234
  profilePicture: string; //sequence URL /img/profile_pic/0.jpg to 96.jpg ,randomly assigned
  headline: string;
  bio: string;
  location: string;
  joinedAt: string;
  lastLogin?: string;
  role?: "user" | "moderator" | "admin";
  twoFactorEnabled?: boolean;
  status: "active" | "disabled";
  academic: {
    institution: string;
    degree: string;
    fieldOfStudy: string;
    studyingYear: number;
    graduationYear: number;
  };
  badges: {
    id: string; // must correspond to nexBadges id in badges.ts (B1 to B10)
  }[]; // must have id from B1 to B10 , 2 badges max and must be unique (only 2 badges per user)
  data: {
    notes: {
      favorites: {
        id: string;
      }[];
      uploads: {
        id: string;
      }[];
    };
    projects: {
      favorites: {
        id: string;
      }[];
      contributions: {
        id: string;
      }[];
    };
    applications: {
      favorites: {
        id: string;
      }[];
      uploads: {
        id: string;
      }[];
    };
  };
};

export type nexBadge = {
  id: string;
  name: string;
  description: string;
  lore: string;
  icon: string;
  color: {
    bgColor: string;
    textColor: string;
    borderColor: string;
  };
};
