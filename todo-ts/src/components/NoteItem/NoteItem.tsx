import React, { useState, useEffect } from 'react';
import DeleteNote from '../DeleteNote/DeleteNote';
import EditNote from '../EditNote/EditNote';

import './NoteItem.scss';

export type Note = {
  id: number;
  text: string;
  tags: string[];
};

type NoteItemProps = {
  note: Note;
  onDeleteNote: (id: number) => void;
  onUpdateNote: (id: number, newText: string, newTags: string[]) => void;
};

const NoteItem: React.FC<NoteItemProps> = ({ note, onDeleteNote, onUpdateNote }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentNote, setCurrentNote] = useState(note);

  useEffect(() => {
    setCurrentNote(note);
  }, [note]);

  const handleUpdateNote = (id: number, newText: string, newTags: string[]) => {
    onUpdateNote(id, newText, newTags);
    setIsEditing(false);
    setCurrentNote((prevNote) => {
      return { ...prevNote, text: newText, tags: newTags };
    });
  };

  return (
    <div className="note-item">
      {isEditing ? (
        <EditNote
          id={currentNote.id}
          text={currentNote.text}
          tags={currentNote.tags}
          currentText={currentNote.text}
          currentTags={currentNote.tags}
          updateCurrentNote={(text, tags) => setCurrentNote({ ...currentNote, text, tags })}
          onUpdateNote={handleUpdateNote}
        />
      ) : (
        <>
          <p className="note-text">
            {currentNote.text.split(' ').map((word, index) => {
              if (currentNote.tags.includes(word)) {
                return (
                  <span key={index} className="tag">
                    {word}
                  </span>
                );
              }
              return word + ' ';
            })}
          </p>
          <div className="tags">
            {currentNote.tags.map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <DeleteNote id={currentNote.id} onDeleteNote={onDeleteNote} />
        </>
      )}
    </div>
  );
};

export default NoteItem;
