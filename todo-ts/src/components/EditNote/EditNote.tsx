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

const EditNote: React.FC<EditNoteProps> = ({ id, onUpdateNote, currentText, currentTags, updateCurrentNote }) => {
  const [newText, setNewText] = useState(currentText);
  const [newTags, setNewTags] = useState(currentTags.join(', '));
  const [updatedTags, setUpdatedTags] = useState<string[]>([]);

  useEffect(() => {
    setNewText(currentText);
    setNewTags(currentTags.join(', '));
  }, [currentText, currentTags]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updatedTags = newTags.split(',').map((tag) => tag.trim());
    onUpdateNote(id, newText, updatedTags);

    const updatedNote = { id, text: newText, tags: updatedTags };
    const notes = JSON.parse(localStorage.getItem('notes') || '[]');
    const updatedNotes = notes.map((note: any) => {
      if (note.id === id) {
        return updatedNote;
      }
      return note;
    });
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.split(',').map((item) => item.trim());
    const updatedText = value[0];
    const updatedTags = value.slice(1).filter(Boolean);

    if (updatedTags.length > 0) {
      setNewText(updatedText);
      setNewTags(updatedTags.join(', '));
      setUpdatedTags(updatedTags);
      updateCurrentNote(updatedText, updatedTags);
    } else {
      setNewText(updatedText);
      setNewTags('');
      setUpdatedTags([]);
      updateCurrentNote(updatedText, []);
    }
  };

  const highlightTags = (text: string): string => {
    const tags = [...newTags.split(',').map(tag => tag.trim()), ...updatedTags];
    const tagRegex = new RegExp(`(${tags.map(tag => `#${tag}`).join('|')})`, 'gi');
    const matches = text.match(tagRegex);
    if (!matches) return text;
    return matches.map(match => `<span class="highlight">${match}</span>`).join(' ');
  };


  const highlightedTags = highlightTags(newText);

  return (
    <form className="edit-note-form" onSubmit={handleSubmit}>
      <div className="edit-note-highlight-tag" dangerouslySetInnerHTML={{ __html: highlightedTags }} />
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

export default EditNote;
