export type Note_dataSet = {
  catogory: string;
  data: {
    ID: string;
    username: string;
    fileType: "pdf" | "note" | "quiz";
    name: string;
    description: string;
  }[];
};
export type Note_Item = {
  id: string;
  title: string;
  description: string;
}[];

export type ProjectData = {
  id: string;
  title: string;
  access: "admin only" | "public" | "private";
  description: string;
  action: {
    label: string;
    icon: React.ComponentType;
  };
  contributionsLabel: {
    id: string;
    image: string;
  }[];
  socials: {
    id: number;
    type: "verified" | "github" | "linkedin";
    url?: string;
  }[];
};

export type NexeraUser = {
  id: string;
  name: string;
  email: string;
  profilePicture: string; //sequence URL public/img/profile_pic/0.jpg to 96.jpg
  headline: string;
  bio: string;
  location: string;
  joinedAt: string;
  academic : {
    institution: string;
    degree: string;
    fieldOfStudy: string;
    studyingYear: number;
    graduationYear: number;
  };
  badges: {
    id: number;
    name: string;
  }[]; // must have id from B1 to B10 , 2 badges min , max and must be unique 
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
