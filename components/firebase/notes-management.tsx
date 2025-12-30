import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    orderBy,
    query,
    serverTimestamp,
  } from 'firebase/firestore';
  
  import { db } from '@/app/api/firebase';
  import { nexNoteAbout } from '@/components/types';
  
/* =========================
   FETCH NOTES
========================= */
export async function fetchNotes(): Promise<nexNoteAbout[]> {
    try {
      const q = query(
        collection(db, 'management_notes'),
        orderBy('createdAt', 'desc')
      );
  
      const snapshot = await getDocs(q);
  
      return snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...(docSnap.data() as Omit<nexNoteAbout, 'id'>),
      }));
    } catch (error) {
      console.error('Error fetching notes:', error);
      return [];
    }
  }
  
/* =========================
   CREATE NOTE
========================= */
export async function createNote(
    note: Omit<nexNoteAbout, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<nexNoteAbout | null> {
    try {
      const docRef = await addDoc(collection(db, 'management_notes'), {
        ...note,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
  
      return {
        id: docRef.id,
        ...note,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
    } catch (error) {
      console.error('Error creating note:', error);
      return null;
    }
  }
  

/* =========================
   UPDATE NOTE
========================= */
export async function updateNote(
    id: string,
    updates: Partial<nexNoteAbout>
  ): Promise<boolean> {
    try {
      const noteRef = doc(db, 'management_notes', id);
  
      await updateDoc(noteRef, {
        ...updates,
        updatedAt: new Date().toISOString(),
      });
  
      return true;
    } catch (error) {
      console.error('Error updating note:', error);
      return false;
    }
  }
  
/* =========================
   DELETE NOTE
========================= */
export async function deleteNote(id: string): Promise<boolean> {
    try {
      const noteRef = doc(db, 'management_notes', id);
      await deleteDoc(noteRef);
      return true;
    } catch (error) {
      console.error('Error deleting note:', error);
      return false;
    }
  }
  