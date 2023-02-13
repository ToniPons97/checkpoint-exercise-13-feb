import { useEffect, useRef, useState } from "react";
import "./App.css";

const Post = ({ post, url, fetchNotes }) => {

  const modifyNoteInputRef = useRef(null);

  const deleteNote = async (e) => {
    e.preventDefault();
    //console.log('Delete ' + post.id);
    const response = await fetch(url + `api/notes/${post.id}`, {
      method: "DELETE",
      mode: "cors",
    });
    fetchNotes();
  }

  const modifyNote = (e) => {
    e.preventDefault();

    const modifiedNote = modifyNoteInputRef.current.value;
    if (modifiedNote) {
      console.log(modifiedNote);
    }
  }

  return <li>
    {post.text}
    <button style={{cursor: 'pointer'}} onClick={deleteNote}>Delete</button>
    <input ref={modifyNoteInputRef} placeholder="modify note." />
    <button style={{cursor: 'pointer'}} onClick={modifyNote}>Modify</button>
  </li>;
}


function App() {
  const [note, setNote] = useState('');
  const [notes, setNotes] = useState([]);
  
  const inputRef = useRef(null);
  const API_BASE_URL = 'http://localhost:3001/';

  const handleInput = (ev) => {
    setNote(prevNote => ev.target.value);
  }

  const handleButton = (e) => {
    e.preventDefault();
    if (note) {
      postNote();
      inputRef.current.focus();
      inputRef.current.value = '';
      setNote(prevNote => '');
      fetchAllNotes();
    }
  }

  const fetchAllNotes = async () => {
    const response = await fetch(API_BASE_URL + "api/notes", {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const notes = await response.json();
    setNotes(prevNotes => [...notes]);
  }

  const postNote = async () => {
    const response = await fetch(API_BASE_URL + "api/notes", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: note }),
    });

    const data = await response.json();
    //console.log(data);
  }


  useEffect(() => {
    fetchAllNotes();
  }, []);

  
  
  /*
  useEffect(() => {
    console.log(notes);
  }, [notes]);
  */
  
  return (
    <form>
      <textarea ref={inputRef} onChange={handleInput} placeholder="Enter your note." />
      <button onClick={handleButton}>Save</button>
      <ul>
        {
          notes.map(n => <Post key={n.id} post={n} url={API_BASE_URL} fetchNotes={fetchAllNotes} />)
        }
      </ul>
    </form>
  );
}

export default App;
