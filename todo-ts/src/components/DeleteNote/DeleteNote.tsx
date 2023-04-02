import React from 'react';

import './DeleteNote.scss'

type DeleteNoteProps = {
  id: number;
  onDeleteNote: (id: number) => void;
};

const DeleteNote: React.FC<DeleteNoteProps> = ({ id, onDeleteNote }) => {
  const handleClick = () => {
    onDeleteNote(id);
  };

  return (
    <button className="delete-note" onClick={handleClick}>
      Delete
    </button>
  );
};

export default DeleteNote;
