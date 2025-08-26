import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function ViewPast() {
  const { id } = useParams();
  const allPastes = useSelector((state) => state.pastes.pastes);
  const paste = allPastes.find((p) => p._id === id);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    setIsVisible(true);
  }, []);

  // Container styles
  const containerStyle = {
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
    transition: 'all 0.5s ease-out',
  };

  // Header styles
  const headerStyle = {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: '16px',
    padding: '25px',
    marginBottom: '25px',
    color: 'white',
    textAlign: 'center',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    transform: isVisible ? 'scale(1)' : 'scale(0.95)',
    transition: 'all 0.4s ease-out 0.1s',
  };

  // Title input styles
  const titleInputStyle = {
    padding: '16px 20px',
    border: '2px solid #e2e8f0',
    borderRadius: '12px',
    fontSize: '18px',
    fontWeight: '600',
    width: '100%',
    backgroundColor: '#f8fafc',
    color: '#2d3748',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
    transition: 'all 0.3s ease',
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
    transitionDelay: '0.2s',
  };

  // Content textarea styles
  const textareaStyle = {
    padding: '20px',
    border: '2px solid #e2e8f0',
    borderRadius: '12px',
    minWidth: '100%',
    minHeight: '400px',
    fontSize: '16px',
    lineHeight: '1.6',
    backgroundColor: '#f8fafc',
    color: '#4a5568',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
    transition: 'all 0.3s ease',
    fontFamily: "'Fira Code', 'Monaco', 'Consolas', monospace",
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
    transitionDelay: '0.3s',
  };

  // Metadata styles
  const metaStyle = {
    marginTop: '20px',
    padding: '15px',
    backgroundColor: '#f1f5f9',
    borderRadius: '10px',
    fontSize: '14px',
    color: '#64748b',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    opacity: isVisible ? 1 : 0,
    transition: 'all 0.3s ease 0.4s',
  };

  // Copy button styles
  const copyButtonStyle = {
    padding: '10px 20px',
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '500',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  };

  // Handle copy to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(paste.content);
    
    // Visual feedback for copy action
    const button = document.getElementById('copy-button');
    if (button) {
      button.style.backgroundColor = '#10b981';
      button.innerHTML = '✓ Copied!';
      
      setTimeout(() => {
        button.style.backgroundColor = '#3b82f6';
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
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '50vh',
        fontSize: '20px',
        color: '#64748b'
      }}>
        Paste not found
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1 style={{ margin: '0 0 10px 0', fontSize: '28px' }}>View Paste</h1>
        <p style={{ margin: 0, opacity: 0.9 }}>Review your saved content</p>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#374151' }}>
          Title
        </label>
        <input
          style={titleInputStyle}
          type="text"
          value={paste.title}
          disabled
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#374151' }}>
          Content
        </label>
        <textarea
          style={textareaStyle}
          value={paste.content}
          disabled
        />
      </div>

      <div style={metaStyle}>
        {/* <div>
          <div style={{ fontSize: '12px', marginBottom: '5px' }}>Created At</div>
          <div style={{ fontWeight: '500' }}>{formatDate(paste.createdAt)}</div>
        </div> */}
        
        <button 
          id="copy-button"
          style={copyButtonStyle}
          onClick={handleCopy}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = 'none';
          }}
        >
          📋 Copy Content
        </button>
      </div>
    </div>
  );
}

export default ViewPast;