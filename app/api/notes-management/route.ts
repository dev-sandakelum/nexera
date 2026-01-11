import { createNote, deleteNote, fetchNotes, updateNote } from '@/lib/actions/notes';
import { revalidateNotes } from '@/lib/revalidate';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    const notes = await fetchNotes();
    return NextResponse.json(notes);
  } catch (error) {
    console.error('Error in GET /api/notes-management:', error);
    return NextResponse.json({ error: 'Failed to fetch notes' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const note = await createNote(body);

    if (!note) {
      return NextResponse.json({ error: 'Failed to create note' }, { status: 400 });
    }

    // Clear notes cache after creation
    await revalidateNotes();

    return NextResponse.json(note, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/notes-management:', error);
    return NextResponse.json({ error: 'Failed to create note' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, ...updates } = await request.json();

    if (!id) {
      return NextResponse.json({ error: 'Note ID is required' }, { status: 400 });
    }

    const note = await updateNote(id, updates);

    if (!note) {
      return NextResponse.json({ error: 'Failed to update note' }, { status: 400 });
    }

    // Clear notes cache after update
    await revalidateNotes();

    return NextResponse.json(note);
  } catch (error) {
    console.error('Error in PUT /api/notes-management:', error);
    return NextResponse.json({ error: 'Failed to update note' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Note ID is required' }, { status: 400 });
    }

    const success = await deleteNote(id);

    if (!success) {
      return NextResponse.json({ error: 'Failed to delete note' }, { status: 400 });
    }

    // Clear notes cache after deletion
    await revalidateNotes();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in DELETE /api/notes-management:', error);
    return NextResponse.json({ error: 'Failed to delete note' }, { status: 500 });
  }
}