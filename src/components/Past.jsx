import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromPastes } from "../redux/pastfile";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

function Past() {
  const pastes = useSelector((state) => state.pastes.pastes);
  const [searchTerm, setSearchTerm] = useState("");
  const [animateItems, setAnimateItems] = useState({});
  const dispatch = useDispatch();

  // Filter pastes based on search term
  const filteredPastes = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Animate items on mount and when filtered results change
  useEffect(() => {
    const timer = setTimeout(() => {
      const newAnimateItems = {};
      filteredPastes.forEach((paste) => {
        newAnimateItems[paste._id] = true;
      });
      setAnimateItems(newAnimateItems);
    }, 50);
    
    return () => clearTimeout(timer);
  }, [filteredPastes]);

  function handleDelete(pasteId) {
    // Animate out before deleting
    setAnimateItems(prev => ({...prev, [pasteId]: false}));
    
    setTimeout(() => {
      dispatch(removeFromPastes(pasteId));
      toast.success("Paste deleted");
    }, 300);
  }

  // Format date safely
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return isNaN(date.getTime()) 
        ? "Unknown date" 
        : date.toLocaleString();
    } catch (error) {
      return "Unknown date";
    }
  };

  // Container styles
  const containerStyle = {
    padding: "20px",
    maxWidth: "1200px",
    margin: "0 auto",
  };

  // Search input styles
  const searchInputStyle = {
    padding: "12px 20px",
    borderRadius: "25px",
    border: "2px solid #e2e8f0",
    width: "100%",
    maxWidth: "600px",
    fontSize: "16px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
    transition: "all 0.3s ease",
    outline: "none",
    marginBottom: "30px",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
  };

  // Paste card styles
  const getPasteCardStyle = (id) => ({
    border: "1px solid #e2e8f0",
    borderRadius: "12px",
    padding: "20px",
    backgroundColor: "white",
    color: "#2d3748",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.04)",
    marginBottom: "20px",
    transform: animateItems[id] ? "translateY(0)" : "translateY(20px)",
    opacity: animateItems[id] ? 1 : 0,
    transition: "all 0.3s ease",
  });

  // Title styles
  const titleStyle = {
    fontWeight: "600",
    fontSize: "20px",
    color: "#2d3748",
    margin: "0",
  };

  // Content styles
  const contentStyle = {
    border: "1px solid #cbd5e0",
    padding: "15px",
    borderRadius: "8px",
    backgroundColor: "#f7fafc",
    color: "#4a5568",
    fontSize: "15px",
    lineHeight: "1.5",
    overflow: "hidden",
    maxHeight: "150px",
    transition: "all 0.3s ease",
  };

  // Button container styles
  const buttonContainerStyle = {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
  };

  // Base button styles
  const baseButtonStyle = {
    padding: "8px 16px",
    borderRadius: "8px",
    color: "white",
    fontWeight: "500",
    fontSize: "14px",
    border: "none",
    cursor: "pointer",
    transition: "all 0.2s ease",
    display: "flex",
    alignItems: "center",
    gap: "5px",
  };

  // Specific button styles
  const buttonStyles = {
    edit: {
      ...baseButtonStyle,
      backgroundColor: "#4299e1",
    },
    delete: {
      ...baseButtonStyle,
      backgroundColor: "#f56565",
    },
    view: {
      ...baseButtonStyle,
      backgroundColor: "#48bb78",
    },
    copy: {
      ...baseButtonStyle,
      backgroundColor: "#718096",
    },
    share: {
      ...baseButtonStyle,
      backgroundColor: "#9f7aea",
    },
  };

  // Hover effects for buttons
  const handleMouseEnter = (e, color) => {
    e.target.style.transform = "translateY(-2px)";
    e.target.style.boxShadow = `0 4px 8px rgba(0, 0, 0, 0.1)`;
    e.target.style.backgroundColor = color;
  };

  const handleMouseLeave = (e, originalColor) => {
    e.target.style.transform = "translateY(0)";
    e.target.style.boxShadow = "none";
    e.target.style.backgroundColor = originalColor;
  };

  // Date styles
  const dateStyle = {
    fontSize: "12px",
    color: "#a0aec0",
    fontStyle: "italic",
  };

  return (
    <div style={containerStyle}>
      <input
        style={searchInputStyle}
        type="search"
        placeholder="🔍 Search pastes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={(e) => {
          e.target.style.borderColor = "#4299e1";
          e.target.style.boxShadow = "0 2px 10px rgba(66, 153, 225, 0.2)";
        }}
        onBlur={(e) => {
          e.target.style.borderColor = "#e2e8f0";
          e.target.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.05)";
        }}
      />

      <div>
        {filteredPastes.length > 0 ? (
          filteredPastes.map((paste) => (
            <div
              key={paste?._id}
              style={getPasteCardStyle(paste._id)}
            >
              {/* Title */}
              <h3 style={titleStyle}>{paste.title}</h3>

              {/* Content */}
              <div style={contentStyle}>
                {paste.content}
              </div>

              {/* Buttons row */}
              <div style={buttonContainerStyle}>
                {/* Edit */}
                <Link to={`/?pastid=${paste._id}`}>
                  <button
                    style={buttonStyles.edit}
                    onMouseEnter={(e) => handleMouseEnter(e, "#3182ce")}
                    onMouseLeave={(e) => handleMouseLeave(e, "#4299e1")}
                  >
                    ✏️ Edit
                  </button>
                </Link>

                {/* Delete */}
                <button
                  style={buttonStyles.delete}
                  onClick={() => handleDelete(paste?._id)}
                  onMouseEnter={(e) => handleMouseEnter(e, "#e53e3e")}
                  onMouseLeave={(e) => handleMouseLeave(e, "#f56565")}
                >
                  🗑️ Delete
                </button>

                {/* View */}
                <Link to={`/pastes/${paste._id}`}>
                  <button
                    style={buttonStyles.view}
                    onMouseEnter={(e) => handleMouseEnter(e, "#38a169")}
                    onMouseLeave={(e) => handleMouseLeave(e, "#48bb78")}
                  >
                    👁️ View
                  </button>
                </Link>

                {/* Copy */}
                <button
                  style={buttonStyles.copy}
                  onClick={() => {
                    navigator.clipboard.writeText(paste?.content);
                    toast.success("Copied to clipboard");
                  }}
                  onMouseEnter={(e) => handleMouseEnter(e, "#4a5568")}
                  onMouseLeave={(e) => handleMouseLeave(e, "#718096")}
                >
                  📋 Copy
                </button>

                {/* Share */}
                <button
                  style={buttonStyles.share}
                  onClick={() => {
                    const shareData = {
                      title: paste.title,
                      text: paste.content,
                      url: `${window.location.origin}/pastes/${paste._id}`,
                    };
                    if (navigator.share) {
                      navigator.share(shareData);
                    } else {
                      navigator.clipboard.writeText(shareData.url);
                      toast.success("Link copied to clipboard!");
                    }
                  }}
                  onMouseEnter={(e) => handleMouseEnter(e, "#805ad5")}
                  onMouseLeave={(e) => handleMouseLeave(e, "#9f7aea")}
                >
                  📤 Share
                </button>
              </div>

              {/* Date */}
              {/* <div style={dateStyle}>
                {formatDate(paste.createdAt)}
              </div> */}
            </div>
          ))
        ) : (
          <div style={{
            textAlign: "center",
            padding: "40px",
            color: "#a0aec0",
            fontSize: "18px"
          }}>
            {searchTerm ? "No pastes found matching your search" : "No pastes yet"}
          </div>
        )}
      </div>
    </div>
  );
}

export default Past;