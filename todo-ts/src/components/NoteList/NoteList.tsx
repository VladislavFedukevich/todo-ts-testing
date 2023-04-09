import React from 'react';
import NoteItem from '../NoteItem/NoteItem';

import { Note } from '../NoteItem/NoteItem';

type NoteListProps = {
  notes: Note[]; // передаем заметки в качестве свойства
  onDeleteNote: (id: number) => void;
  onUpdateNote: (id: number, newText: string, newTags: string[]) => void; // изменен тип параметра id на number
};

const NoteList: React.FC<NoteListProps> = ({ notes, onDeleteNote, onUpdateNote }) => {
  const handleDeleteNote = (id: number) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
    onDeleteNote(id);
  };

  return (
    <div className="note-list">
      {notes.map((note) => (
        <NoteItem
          key={note.id}
          note={note}
          onDeleteNote={handleDeleteNote}
          onUpdateNote={onUpdateNote}
        />
      ))}
    </div>
  );
};

export default NoteList;
