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
