import React, { useState, useEffect } from 'react';

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
  const [filterTag, setFilterTag] = useState<string | null>(null);

  const handleAddNote = (text: string, tags: string[]) => {
    const newNote: Note = {
      id: Date.now(),
      text,
      tags,
    };
    setNotes((prevNotes) => {
      const updatedNotes = [...prevNotes, newNote];
      localStorage.setItem('notes', JSON.stringify(updatedNotes));
      return updatedNotes;
    });
  };

  const handleDeleteNote = (id: number) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
    setNotes(updatedNotes);
  };

  const handleUpdateNote = (id: number, newText: string, newTags: string[]) => {
    const updatedNotes = notes.map((note) => {
      if (note.id === id) {
        return {
          ...note,
          text: newText,
          tags: newTags,
        };
      }
      return note;
    });
    setNotes(updatedNotes);
  };

  const handleFilterTag = (tag: string) => {
    setFilterTag(tag);
    localStorage.setItem('filterTag', tag);
    const filteredNotes = notes.filter((note) => note.tags.includes(tag));
    setNotes(filteredNotes);
  };

  const clearFilter = () => {
    setFilterTag(null);
    localStorage.removeItem('filterTag');
    const notesData = localStorage.getItem('notes');
    if (notesData) {
      setNotes(JSON.parse(notesData));
    }
  };

  useEffect(() => {
    const savedTag = localStorage.getItem('filterTag');
    if (savedTag) {
      setFilterTag(savedTag);
      const filteredNotes = notes.filter((note) => note.tags.includes(savedTag));
      setNotes(filteredNotes);
    }
    const notesData = localStorage.getItem('notes');
    if (notesData) {
      setNotes(JSON.parse(notesData));
    }
  }, []);

  const filteredNotes = filterTag
    ? notes.filter((note) => note.tags.includes(filterTag))
    : notes;

  return (
    <div className="app">
      <h1>ToDo App</h1>
      <div className="toolbar app-toolbar">
        <span>Filter by tag:</span>
        {notes
          .flatMap((note) => note.tags)
          .filter((tag, index, tags) => tags.indexOf(tag) === index)
          .map((tag) => (
            <button key={tag} onClick={() => handleFilterTag(tag)}>
              {tag}
            </button>
          ))}
        <button onClick={clearFilter}>Clear Filter</button>
      </div>
      <NoteList
        notes={filteredNotes}
        onDeleteNote={handleDeleteNote}
        onUpdateNote={handleUpdateNote}
      />
      <AddNote onAddNote={handleAddNote} />
    </div>
  );
};

export default App;
