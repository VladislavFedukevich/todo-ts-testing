import React from 'react';
import NoteItem from '../NoteItem/NoteItem';

type Note = {
  id: number;
  text: string;
  tags: string[];
};

type NoteListProps = {
  notes: Note[];
  onDeleteNote: (id: number) => void;
  onUpdateNote: (id: number, newText: string, newTags: string[]) => void; // изменен тип параметра id на number
};

const NoteList: React.FC<NoteListProps> = ({ notes, onDeleteNote, onUpdateNote }) => {
  return (
    <div className="note-list">
      {notes.map((note) => (
        <NoteItem
          key={note.id}
          note={note}
          onDeleteNote={onDeleteNote}
          onUpdateNote={onUpdateNote} // передано свойство onUpdateNote
        />
      ))}
    </div>
  );
};

export default NoteList
