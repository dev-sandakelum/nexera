import { NexeraUser, nexNoteAbout } from "@/components/types";
import Image from "next/image";

export default function Card1({
  data,
  userNames,
}: {
  data: nexNoteAbout;
  userNames: {
    id: string;
    name: string;
  }[];
}) {
  let fileTypeIcon = "";
  let fileTypeStyle: React.CSSProperties = {};
  if (!data) {
    return null;
  }
  if (data.type == "pdf") {
    fileTypeIcon = "/icons/file-types/pdf.png";
    fileTypeStyle = {
      "--card1-file-type-fg": "var(--file-01-fg)",
      "--card1-file-type-bg": "var(--file-01-bg)",
    } as React.CSSProperties;
  } else if (data.type == "note") {
    fileTypeIcon = "/icons/file-types/note.png";
    fileTypeStyle = {
      "--card1-file-type-fg": "var(--file-02-fg)",
      "--card1-file-type-bg": "var(--file-02-bg)",
    } as React.CSSProperties;
  } else if (data.type == "quiz") {
    fileTypeIcon = "/icons/file-types/quiz.png";
    fileTypeStyle = {
      "--card1-file-type-fg": "var(--file-03-fg)",
      "--card1-file-type-bg": "var(--file-03-bg)",
    } as React.CSSProperties;
  }

  
  return (
    <div
      className="objects"
      style={fileTypeStyle}
    >
      <div className="user">
        <p className="date">
          <span>{data.id}</span>
        </p>
        <p className="username">
          {userNames.find((user) => user.id === data.publishedBy)?.name ||
            data.publishedBy}
        </p>
      </div>
      <div className="type">
        <Image
          className="icon"
          src={fileTypeIcon}
          alt="icon"
          width={24}
          height={24}
        />
      </div>
      <div className="info">
        <p className="name">{data.title}</p>
        <p className="description">{data.description}</p>
      </div>
    </div>
  );
}
