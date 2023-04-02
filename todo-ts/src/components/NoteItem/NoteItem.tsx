import React from 'react';
import DeleteNote from '../DeleteNote/DeleteNote'

type Note = {
  id: number;
  text: string;
  tags: string[];
};

type NoteItemProps = {
  note: Note;
  onDeleteNote: (id: number) => void;
};

const NoteItem: React.FC<NoteItemProps> = ({ note, onDeleteNote }) => {
  return (
    <li className="note-item">
      <p className="note-text">{note.text}</p>
      <div className="tags">
        {note.tags.map((tag) => (
          <span key={tag} className="tag">
            {tag}
          </span>
        ))}
      </div>
      <DeleteNote id={note.id} onDeleteNote={onDeleteNote} />
    </li>
  );
};

export default NoteItem;
