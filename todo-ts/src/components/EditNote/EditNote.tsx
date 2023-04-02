import React, { useState } from 'react';

import './EditNote.scss'

type Note = {
  id: number;
  text: string;
  tags: string[];
};

type EditNoteProps = {
  text: string;
  note: Note;
  onSaveNote: (text: string, tags: string[]) => void;
  onCancelEdit: () => void;
};

const EditNote: React.FC<EditNoteProps> = ({ note, onSaveNote, onCancelEdit }) => {
  const [text, setText] = useState(note.text);
  const [tags, setTags] = useState(note.tags.join(', '));

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const handleTagsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTags(event.target.value);
  };

  const handleSaveNote = () => {
    const tagsArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
    onSaveNote(text, tagsArray);
  };

  return (
    <div className="edit-note">
      <h2>Edit Note</h2>
      <textarea value={text} onChange={handleTextChange} />
      <input type="text" value={tags} onChange={handleTagsChange} />
      <button onClick={handleSaveNote}>Save</button>
      <button onClick={onCancelEdit}>Cancel</button>
    </div>
  );
};

export default EditNote;
