Smriti - ReadMe

📋 Overview
Smriti (स्मृति - meaning "memory" in Sanskrit) is a modern, responsive React application designed for creating, managing, and sharing code snippets or text pastes. With a beautiful interface and smooth animations, it provides an elegant solution for developers and users who need to quickly save and remember pieces of code or text.

Live Demo: https://smrit.vercel.app/

✨ Features
Create Memories: Easily create new code/text snippets with titles

Edit Existing Memories: Modify your saved pastes with a single click

Search Functionality: Quickly find memories using the search feature

Copy to Clipboard: One-click copying of content

Share Memories: Share your pastes with others via generated links

Beautiful UI: Modern design with smooth animations and transitions

Responsive Design: Works perfectly on desktop and mobile devices

Local Storage: Your memories are saved locally in your browser

🚀 Getting Started
Prerequisites
Node.js (version 14 or higher)

npm or yarn package manager

Installation
Clone the repository:

bash
git clone <repository-url>
cd smriti-app
Install dependencies:

bash
npm install
Start the development server:

bash
npm start
Open your browser and navigate to http://localhost:3000

🎨 How to Use
Creating a Memory
Navigate to the Home page

Enter a title for your memory in the input field

Type or paste your content in the text area

Click "Create Memory" or press Ctrl+Enter to save

Managing Memories
Visit the "Memories" page to view all your saved pastes

Use the search bar to filter memories by title

Click "Edit" to modify a memory

Click "Delete" to remove a memory

Click "View" to see a full-screen version of a memory

Use "Copy" to quickly copy content to clipboard

Use "Share" to generate a shareable link

Viewing a Memory
Click on "View" from the Memories page or use a direct link

The View page shows the memory content in a focused, readable layout

Use the "Copy Content" button to quickly copy the entire memory

🛠️ Technology Stack
Frontend Framework: React.js

State Management: Redux Toolkit

Routing: React Router v6

Styling: CSS3 with animations

Icons: Emoji-based icons for universal compatibility

Clipboard API: For copy functionality

Web Share API: For native sharing where available

📱 Responsive Design
The application is fully responsive and optimized for:

Desktop computers (1200px+)

Laptops (992px-1199px)

Tablets (768px-991px)

Mobile phones (less than 768px)

🎭 Animations & Interactions
The app includes several subtle animations to enhance user experience:

Fade-in Effects: Elements gently appear when loading

Slide Animations: Content slides into view

Hover Effects: Interactive elements respond to mouse movements

Focus States: Form fields highlight when selected

Transition Effects: Smooth state changes throughout the app

Feedback Animations: Visual confirmation for user actions

🔧 Project Structure
text
src/
  ├── components/
  │   ├── Home.js          # Main memory creation component
  │   ├── Past.js          # Memories list and management
  │   ├── ViewPast.js      # Individual memory view
  │   └── Navbar.js        # Navigation component
  ├── redux/
  │   └── pastfile.js      # Redux store and actions
  ├── App.js               # Main app component with routing
  └── index.js             # App entry point
🎯 Redux Store Structure
javascript
{
  pastes: {
    pastes: [
      {
        _id: "unique-id",
        title: "Memory Title",
        content: "Memory content",
        createdAt: "2023-07-15T10:30:00.000Z"
      }
    ]
  }
}
🌟 Keyboard Shortcuts
Ctrl+Enter: Save memory (on creation/editing page)

Ctrl+/: Focus search field (on memories list page)

🔮 Future Enhancements
User authentication and cloud storage

Syntax highlighting for code memories

Memory expiration options

Export memories as files

Tags and categories for organization

Dark mode theme

Memory encryption for privacy

📄 License
This project is open source and available under the MIT License.

🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

Fork the project

Create your feature branch (git checkout -b feature/AmazingFeature)

Commit your changes (git commit -m 'Add some AmazingFeature')

Push to the branch (git push origin feature/AmazingFeature)

Open a Pull Request

📞 Support
If you have any questions or need help with the application, please open an issue in the repository.

🙏 Acknowledgments
React team for the amazing framework

Redux team for state management solution

Vercel for seamless deployment

Sanskrit language for the inspired name "Smriti"
