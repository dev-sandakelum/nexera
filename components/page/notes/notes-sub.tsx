'use client';

import { motion } from "framer-motion";
import Card1 from "./items/card1";
import { nexNoteAbout, nexTopic } from "@/components/types";
import { usePathname, useSearchParams } from "next/navigation";
import NotePreviewPage from "./preview/note/note";
import { useMemo, useEffect, useState } from "react";
import { GetUserNameList } from "@/components/firebase/get-list";
import { nexIctSubjects } from "@/public/json/subjects";


export default function Notes_Sub({
  topics,
  noteAbouts,
}: {
  topics: nexTopic[];
  noteAbouts: nexNoteAbout[];
}) {
  const pathname = usePathname();
  const paths = pathname.split("/");
  const params = useSearchParams();
  const sub_slug = paths[paths.length - 1];
  const note = params.get("n");
  console.log("Sub :", sub_slug);
  const [userNames, setUserNames] = useState<{ id: string; name: string }[]>(
    []
  );
  const subject_id = nexIctSubjects.find((sub) => sub.slug === sub_slug)?.id;
  console.log("Subject ID:", subject_id);
  // Filter topics for this subject
  const subject_topics = useMemo(
    () => topics.filter((topic) => topic.subjectID === subject_id),
    [topics, subject_id]
  );
  
  // Precompute notes by topic to avoid repeated filter calls
  const notesByTopic = useMemo(() => {
    const map: Record<string, nexNoteAbout[]> = {};
    noteAbouts.forEach((n) => {
      if (!map[n.topicID]) map[n.topicID] = [];
      map[n.topicID].push(n);
    });
    return map;
  }, [noteAbouts]);

  useEffect(() => {
    GetUserNameList().then(setUserNames);
  }, []);

  if (note) {
    return <NotePreviewPage note_id={note} />;
  }
  return (
    <motion.div className="NotesPage" initial="hidden" animate="visible">
      {subject_topics.map((topic, idx) => {
        const topic_notes = notesByTopic[topic.id] || [];
        return (
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
                  <Card1 data={item} userNames={userNames} />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        );
      })}
      <div className="footer-space">-- End of Notes --</div>
    </motion.div>
  );
}
