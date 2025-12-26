export type Note_dataSet = {
  catogory: string;
  data: {
    ID: string;
    username: string;
    fileType: "pdf" | "note" | "quiz";
    name: string;
    description: string;
  }[];
}
export type Note_Item = {
  id: string; 
  title: string;
  imgUrl: string;
}[];