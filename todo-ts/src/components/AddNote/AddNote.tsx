import { useState } from 'react';
import './AddNote.scss';

type AddNoteProps = {
  onAddNote: (noteText: string, tags: string[]) => void;
};

const AddNote: React.FC<AddNoteProps> = ({ onAddNote }) => {
  const [noteText, setNoteText] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  const handleAddNote = () => {
    if (noteText.length > 0) {
      const tagsArray = noteText.split('#').filter(Boolean).slice(1);
      onAddNote(noteText, tagsArray);
      setNoteText('');
      setTags([]);
    }
  };

  const handleNoteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNoteText(event.target.value);
  };

  return (
    <div className="add-note">
      <input
        type="text"
        placeholder="Type your note here"
        value={noteText}
        onChange={handleNoteChange}
      />
      <button onClick={handleAddNote}>Add Note</button>
    </div>
  );
};

export default AddNote;
