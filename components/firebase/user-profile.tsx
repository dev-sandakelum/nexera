// components/firebase/user-profile.tsx
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/app/api/firebase';
import { NexeraUser } from '@/components/types';

/**
 * Update user profile information
 */
export async function updateUserProfile(
  userId: string,
  updates: Partial<NexeraUser>
): Promise<boolean> {
  try {
    const userRef = doc(db, 'TestUsers', userId);
    
    await updateDoc(userRef, {
      ...updates,
      lastLogin: new Date().toISOString(),
    });
    
    return true;
  } catch (error) {
    console.error('Error updating user profile:', error);
    return false;
  }
}

/**
 * Change user password
 */
export async function changeUserPassword(
  userId: string,
  currentPassword: string,
  newPassword: string
): Promise<boolean> {
  try {
    // In a real app, you'd verify the current password first
    const userRef = doc(db, 'TestUsers', userId);
    
    await updateDoc(userRef, {
      password: newPassword,
      lastLogin: new Date().toISOString(),
    });
    
    return true;
  } catch (error) {
    console.error('Error changing password:', error);
    return false;
  }
}

/**
 * Update user avatar
 */
export async function updateUserAvatar(
  userId: string,
  avatarUrl: string
): Promise<boolean> {
  try {
    const userRef = doc(db, 'TestUsers', userId);
    
    await updateDoc(userRef, {
      profilePicture: avatarUrl,
      lastLogin: new Date().toISOString(),
    });
    
    return true;
  } catch (error) {
    console.error('Error updating avatar:', error);
    return false;
  }
}

/**
 * Delete user account
 */
export async function deleteUserAccount(
  userId: string
): Promise<boolean> {
  try {
    const userRef = doc(db, 'TestUsers', userId);
    
    // In a real app, you'd actually delete the document
    // For now, we'll just mark it as disabled
    await updateDoc(userRef, {
      status: 'disabled',
      lastLogin: new Date().toISOString(),
    });
    
    return true;
  } catch (error) {
    console.error('Error deleting account:', error);
    return false;
  }
}

/**
 * Toggle 2FA status
 */
export async function toggle2FA(
  userId: string,
  enabled: boolean
): Promise<boolean> {
  try {
    const userRef = doc(db, 'TestUsers', userId);
    
    // In a real app, you'd implement actual 2FA logic
    await updateDoc(userRef, {
      twoFactorEnabled: enabled,
      lastLogin: new Date().toISOString(),
    });
    
    return true;
  } catch (error) {
    console.error('Error toggling 2FA:', error);
    return false;
  }
}