import React, { useState } from 'react';
import NoteList from './../../components/NoteList/NoteList';
import AddNote from './../../components/AddNote/AddNote';
import './App.scss';

type Note = {
  id: number;
  text: string;
  tags: string[];
};

const App = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  const handleAddNote = (text: string, tags: string[]) => {
    const newNote: Note = {
      id: Date.now(),
      text,
      tags,
    };
    setNotes((prevNotes) => [...prevNotes, newNote]);
  };

  const handleDeleteNote = (id: number) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
    setSelectedNote(null);
  };

  const handleSelectNote = (id: number) => {
    const note = notes.find((note) => note.id === id);
    setSelectedNote(note || null);
  };

  const handleEditNote = (text: string, tags: string[]) => {
    if (!selectedNote) return;
    const updatedNote: Note = {
      ...selectedNote,
      text,
      tags,
    };
    const updatedNotes = notes.map((note) =>
      note.id === selectedNote.id ? updatedNote : note
    );
    setNotes(updatedNotes);
    setSelectedNote(updatedNote);
  };

  return (
    <div className="app">
      <h1>ToDo App</h1>
      <NoteList
        notes={notes}
        onDeleteNote={handleDeleteNote}
      />
      <AddNote onAddNote={handleAddNote} />
    </div>
  );
};

export default App;
