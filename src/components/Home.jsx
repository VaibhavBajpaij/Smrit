import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { addtoPastes, updateToPastes } from "../redux/pastfile";
import { useDispatch, useSelector } from "react-redux";
import './Home.css';

function Home() {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pastid");

  const dispatch = useDispatch();
  const allPastes = useSelector((state) => state.pastes.pastes);

  // Load paste data in edit mode
  useEffect(() => {
    if (pasteId && allPastes.length > 0) {
      const paste = allPastes.find((p) => p._id === pasteId);
      if (paste) {
        setTitle(paste.title);
        setValue(paste.content);
      }
    }
  }, [pasteId, allPastes]);

  function createPast() {
    if (!title.trim() || !value.trim()) {
      // Add a shake animation to indicate required fields
      const inputs = document.querySelectorAll('input, textarea');
      inputs.forEach(input => {
        input.classList.add('shake');
        setTimeout(() => input.classList.remove('shake'), 820);
      });
      return;
    }

    const paste = {
      title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      dispatch(updateToPastes(paste));
      // Success feedback for update
      document.querySelector('button').classList.add('success');
      setTimeout(() => {
        document.querySelector('button').classList.remove('success');
      }, 2000);
    } else {
      dispatch(addtoPastes(paste));
      // Success feedback for create
      document.querySelector('button').classList.add('pulse');
      setTimeout(() => {
        document.querySelector('button').classList.remove('pulse');
      }, 1000);
    }

    setTitle("");
    setValue("");
    setSearchParams({});
  }

  // Add keyboard shortcut (Ctrl+Enter)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        createPast();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [title, value]);

  return (
    <div className="paste-container">
      <div className="paste-header animate-slide-down">
        <h1>📋 SMRITI</h1>
        <p>Share your code snippets with elegance</p>
      </div>

      <div className="paste-card animate-fade-in">
        <div className="input-group">
          <input
            className="title-input"
            type="text"
            value={title}
            placeholder="Paste title..."
            onChange={(e) => setTitle(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          <button
            onClick={createPast}
            className="create-btn"
          >
            {pasteId ? "Update" : "Create"} Paste
            <span className="btn-icon">{pasteId ? "↻" : "+"}</span>
          </button>
        </div>

        <div className={`text-area-container ${isFocused ? 'focused' : ''}`}>
          <textarea
            className="content-textarea"
            value={value}
            placeholder="Paste your content here..."
            onChange={(e) => setValue(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          <div className="textarea-overlay"></div>
        </div>
        
        <div className="paste-footer">
          <p>💡 Pro tip: Use Ctrl+Enter to save quickly</p>
        </div>
      </div>
    </div>
  );
}

export default Home;