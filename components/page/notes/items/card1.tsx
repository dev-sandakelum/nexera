import Image from "next/image";

export type Card1Props = {
  data: {
    ID: string;
    username: string;
    fileType: string;
    name: string;
    description: string;
  };
};

export default function Card1({ data }: Card1Props) {
  let fileTypeIcon = "";
  let fileTypeStyle: React.CSSProperties = {};
  if (!data) {
    return null;
  }
  if (data.fileType == "pdf") {
    fileTypeIcon = "/icons/file-types/pdf.png";
    fileTypeStyle = {
      "--card1-file-type-fg": "var(--file-01-fg)",
      "--card1-file-type-bg": "var(--file-01-bg)",
    } as React.CSSProperties;
  } else if (data.fileType == "note") {
    fileTypeIcon = "/icons/file-types/note.png";
    fileTypeStyle = {
      "--card1-file-type-fg": "var(--file-02-fg)",
      "--card1-file-type-bg": "var(--file-02-bg)",
    } as React.CSSProperties;
  } else if (data.fileType == "quiz") {
    fileTypeIcon = "/icons/file-types/quiz.png";
    fileTypeStyle = {
      "--card1-file-type-fg": "var(--file-03-fg)",
      "--card1-file-type-bg": "var(--file-03-bg)",
    } as React.CSSProperties;
  }

  return (
    <div className="objects" style={fileTypeStyle}>
      <div className="user">
        <p className="date">
          <span>{data.ID}</span>
        </p>
        <p className="username">{data.username}</p>
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
        <p className="name">{data.name}</p>
        <p className="description">{data.description}</p>
      </div>
    </div>
  );
}
