import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import './ViewPast.css';

function ViewPast() {
  const { id } = useParams();
  const allPastes = useSelector((state) => state.pastes.pastes);
  const paste = allPastes.find((p) => p._id === id);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    setIsVisible(true);
  }, []);

  // Handle copy to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(paste.content);
    
    // Visual feedback for copy action
    const button = document.getElementById('copy-button');
    if (button) {
      button.classList.add('copied');
      button.innerHTML = '✓ Copied!';
      
      setTimeout(() => {
        button.classList.remove('copied');
        button.innerHTML = '📋 Copy Content';
      }, 2000);
    }
  };

  // Format date safely
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return isNaN(date.getTime()) 
        ? 'Unknown date' 
        : date.toLocaleString();
    } catch (error) {
      return 'Unknown date';
    }
  };

  if (!paste) {
    return (
      <div className="viewpaste-not-found">
        Paste not found
      </div>
    );
  }

  return (
    <div className={`viewpaste-container ${isVisible ? 'visible' : ''}`}>
      <div className="viewpaste-header">
        <h1>View Paste</h1>
        <p>Review your saved content</p>
      </div>

      <div className="viewpaste-content-wrapper">
        <div className="viewpaste-input-group">
          <label>Title</label>
          <input
            className="viewpaste-title-input"
            type="text"
            value={paste.title}
            disabled
          />
        </div>

        <div className="viewpaste-input-group">
         <label className='text-blue-100 '>Content</label>

          <textarea
            className="viewpaste-content-textarea"
            value={paste.content}
            disabled
          />
        </div>

        <div className="viewpaste-meta">
          <button 
            id="copy-button"
            className="viewpaste-copy-btn"
            onClick={handleCopy}
          >
            📋 Copy Content
          </button>
        </div>
      </div>
    </div>
  );
}

export default ViewPast;