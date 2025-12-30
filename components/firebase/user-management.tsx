import {
    collection,
    getDocs,
    getDoc,
    updateDoc,
    doc,
    query,
    orderBy,
  } from 'firebase/firestore';
  
  import { db } from '@/app/api/firebase';
  import { NexeraUser } from '@/components/types';
  

  export async function fetchUsers(): Promise<NexeraUser[]> {
    try {
      const q = query(
        collection(db, 'TestUsers'),
        orderBy('joinedAt', 'desc')
      );
  
      const snapshot = await getDocs(q);
  
      return snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...(docSnap.data() as Omit<NexeraUser, 'id'>),
      }));
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
  }

  export async function fetchUserById(
    id: string
  ): Promise<NexeraUser | null> {
    try {
      const userRef = doc(db, 'TestUsers', id);
      const snapshot = await getDoc(userRef);
  
      if (!snapshot.exists()) return null;
  
      return {
        id: snapshot.id,
        ...(snapshot.data() as Omit<NexeraUser, 'id'>),
      };
    } catch (error) {
      console.error('Error fetching user:', error);
      return null;
    }
  }
  

  export async function updateUserRole(
    id: string,
    role: 'admin' | 'moderator' | 'user'
  ): Promise<boolean> {
    try {
      const userRef = doc(db, 'TestUsers', id);
  
      await updateDoc(userRef, { role });
  
      return true;
    } catch (error) {
      console.error('Error updating user role:', error);
      return false;
    }
  }

  

export async function toggleUserStatus(
  id: string,
  status: 'active' | 'disabled'
): Promise<boolean> {
  try {
    const userRef = doc(db, 'TestUsers', id);

    await updateDoc(userRef, { status });

    return true;
  } catch (error) {
    console.error('Error toggling user status:', error);
    return false;
  }
}


export async function updateUserBadge(
  id: string,
  badgeId: string
): Promise<boolean> {
  try {
    const userRef = doc(db, 'TestUsers', id);
    
    // Update the first badge (role badge) in the badges array
    await updateDoc(userRef, {
      'badges.0.id': badgeId,
    });

    return true;
  } catch (error) {
    console.error('Error updating user badge:', error);
    return false;
  }
}

export async function updateLastLogin(
    id: string
  ): Promise<boolean> {
    try {
      const userRef = doc(db, 'TestUsers', id);
  
      await updateDoc(userRef, {
        lastLogin: new Date().toISOString(),
      });
  
      return true;
    } catch (error) {
      console.error('Error updating last login:', error);
      return false;
    }
  }
  