import Notes_Sub from '@/components/page/notes/notes-sub'
import { ictNotes } from '@/public/json/notes'
import { ictTopics } from '@/public/json/topics'


export default function page() {
  return (
    <Notes_Sub topics={ictTopics} noteAbouts={ictNotes}/>
  )
}
