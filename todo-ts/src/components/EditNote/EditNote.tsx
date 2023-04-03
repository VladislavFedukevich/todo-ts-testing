import React, { useState, useEffect } from 'react';

import './EditNote.scss';

type EditNoteProps = {
  id: number;
  text: string;
  tags: string[];
  onUpdateNote: (id: number, newText: string, newTags: string[]) => void;
  currentText: string;
  currentTags: string[];
  updateCurrentNote: (text: string, tags: string[]) => void;
};

const EditNote: React.FC<EditNoteProps> = ({ id, text, tags, onUpdateNote, currentText, currentTags, updateCurrentNote }) => {
  const [newText, setNewText] = useState(currentText);
  const [newTags, setNewTags] = useState(currentTags.join(', '));

  useEffect(() => {
    setNewText(currentText);
    setNewTags(currentTags.join(', '));
  }, [currentText, currentTags]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updatedTags = newTags.split(',').map((tag) => tag.trim());
    onUpdateNote(id, newText, updatedTags);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.split(',').map((v) => v.trim());
    setNewText(value[0]);
    setNewTags(value.slice(1).join(', '));
    updateCurrentNote(value[0], value.slice(1));
  };

  return (
    <form className="edit-note-form" onSubmit={handleSubmit}>
      <input
        className="edit-note-form__input"
        type="text"
        value={`${newText}, ${newTags}`}
        onChange={handleTextChange}
      />
      <button className="edit-note-form__button" type="submit">
        Save
      </button>
    </form>
  );
};

export default EditNote
