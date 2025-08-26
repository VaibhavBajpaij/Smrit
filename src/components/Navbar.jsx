import React, { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

function Navbar() {
  const [activeTab, setActiveTab] = useState('/');
  const location = useLocation();
  
  // Update active tab when location changes
  useEffect(() => {
    setActiveTab(location.pathname);
  }, [location]);

  // Inline styles for the navbar
  const navbarStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '2rem',
    padding: '1rem',
    background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
    borderRadius: '12px',
    margin: '1rem',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
  };

  // Base link style
  const linkBaseStyle = {
    color: 'white',
    textDecoration: 'none',
    padding: '0.75rem 1.5rem',
    borderRadius: '8px',
    fontWeight: '500',
    position: 'relative',
    overflow: 'hidden',
    transition: 'all 0.3s ease',
  };

  // Active link style
  const activeLinkStyle = {
    ...linkBaseStyle,
    background: 'rgba(255, 255, 255, 0.15)',
    transform: 'translateY(-2px)',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)',
  };

  // Hover effect style (applied via onMouseEnter/onMouseLeave)
  const hoverLinkStyle = {
    background: 'rgba(255, 255, 255, 0.1)',
    transform: 'translateY(-2px)',
  };

  // Animation for the active indicator
  const activeIndicatorStyle = {
    position: 'absolute',
    bottom: '0',
    left: '0',
    width: '100%',
    height: '3px',
    backgroundColor: '#fff',
    borderRadius: '2px',
    transform: 'scaleX(0)',
    transition: 'transform 0.3s ease',
  };

  return (
    <div style={navbarStyle}>
      <NavLink 
        to="/"
        style={({ isActive }) => isActive ? activeLinkStyle : linkBaseStyle}
        onMouseEnter={(e) => {
          if (activeTab !== '/') {
            e.target.style.background = hoverLinkStyle.background;
            e.target.style.transform = hoverLinkStyle.transform;
          }
        }}
        onMouseLeave={(e) => {
          if (activeTab !== '/') {
            e.target.style.background = linkBaseStyle.background;
            e.target.style.transform = 'translateY(0)';
          }
        }}
      >
        Home
        {activeTab === '/' && (
          <span 
            style={{...activeIndicatorStyle, transform: 'scaleX(1)'}} 
          />
        )}
      </NavLink>
      
      <NavLink 
        to="/pastes"
        style={({ isActive }) => isActive ? activeLinkStyle : linkBaseStyle}
        onMouseEnter={(e) => {
          if (activeTab !== '/pastes') {
            e.target.style.background = hoverLinkStyle.background;
            e.target.style.transform = hoverLinkStyle.transform;
          }
        }}
        onMouseLeave={(e) => {
          if (activeTab !== '/pastes') {
            e.target.style.background = linkBaseStyle.background;
            e.target.style.transform = 'translateY(0)';
          }
        }}
      >
        Pastes
        {activeTab === '/pastes' && (
          <span 
            style={{...activeIndicatorStyle, transform: 'scaleX(1)'}} 
          />
        )}
      </NavLink>
    </div>
  )
}

export default Navbar