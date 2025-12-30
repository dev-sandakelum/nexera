import { motion } from "framer-motion";
import Card1 from "./items/card1";
import { nexNoteAbout, nexSubject, nexTopic } from "@/components/types";
import { useSearchParams } from "next/navigation";
import { nexeraUsers } from "@/public/json/users";
import NotePreviewPage from "./preview/note/note";

export default function Notes_Sub({
  topics,
  noteAbouts,
}: {
  topics: nexTopic[];
  noteAbouts: nexNoteAbout[];
}) {
  const params = useSearchParams();
  const sub = params.get("u");
  const note = params.get("n");
  if (note) {
    return <NotePreviewPage note_id={note}/>;
  }

  const subject_topics = topics.filter((topic) => topic.subjectID === sub);
  return (
    <motion.div className="NotesPage" initial="hidden" animate="visible">
      {subject_topics.map((topic, idx) => {
        const topic_notes = noteAbouts.filter(
          (note) => note.topicID === topic.id
        );
        return(
        <motion.div key={topic.id}>
          <motion.h1
            className="catogory"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            {topic.title}
          </motion.h1>
          <motion.div className="topic">
            {topic_notes.map((item, idx2) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: (idx * topic_notes.length + idx2) * 0.1,
                  duration: 0.4,
                }}
              >
                <Card1 data={item} users={nexeraUsers}/>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      )})}
      <div className="footer-space">-- End of Notes --</div>
    </motion.div>
  );
}
