import React from 'react';
import NoteItem from '../../components/NoteItem/NoteItem';

type Note = {
  id: number;
  text: string;
  tags: string[];
};

type NoteListProps = {
  notes: Note[];
  onDeleteNote: (id: number) => void;
};

const NoteList: React.FC<NoteListProps> = ({ notes, onDeleteNote }) => {
  return (
    <ul className="note-list">
      {notes.map((note) => (
        <NoteItem key={note.id} note={note} onDeleteNote={onDeleteNote} />
      ))}
    </ul>
  );
};

export default NoteList;
