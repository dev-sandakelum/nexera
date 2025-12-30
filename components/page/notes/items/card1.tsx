import { NexeraUser, nexNoteAbout } from "@/components/types";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

export default function Card1({
  data,
  users,
}: {
  data: nexNoteAbout;
  users: NexeraUser[];
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

  const params = useSearchParams();
  const pathname = "/";
  const router = useRouter();
  function handleRoute(term: string) {
    const param = new URLSearchParams(params);
    if (term) {
      param.set("n", term);
    } else {
      param.delete("n");
    }
    router.replace(`${pathname}?${param.toString()}`, {
      scroll: false,
    });
  }
  return (
    <div
      className="objects"
      style={fileTypeStyle}
      onClick={() => handleRoute(encodeURIComponent(data.id))}
    >
      <div className="user">
        <p className="date">
          <span>{data.id}</span>
        </p>
        <p className="username">
          {users.find((user) => user.id === data.publishedBy)?.name ||
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
