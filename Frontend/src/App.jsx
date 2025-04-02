// import { useState } from 'react'


// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App


// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// import { AppBar, Toolbar, Button } from '@mui/material';
// import TopUsers from './pages/TopUsers';
// import TrendingPosts from './pages/TrendingPosts';
// import Feed from './pages/Feed';

// function App() {
//   return (
//     <Router>
//       <AppBar position="static">
//         <Toolbar>
//           <Button color="inherit" component={Link} to="/">Feed</Button>
//           <Button color="inherit" component={Link} to="/top-users">Top Users</Button>
//           <Button color="inherit" component={Link} to="/trending-posts">Trending Posts</Button>
//         </Toolbar>
//       </AppBar>
//       <div style={{ padding: '20px' }}>
//         <Routes>
//           <Route path="/" element={<Feed />} />
//           <Route path="/top-users" element={<TopUsers />} />
//           <Route path="/trending-posts" element={<TrendingPosts />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;


// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Navbar from './components/Navbar';
// import TopUsers from './pages/TopUsers';
// import TrendingPosts from './pages/TrendingPosts';
// import Feed from './pages/Feed';
// import { Container } from '@mui/material';

// export default function App() {
//   return (
//     <Router>
//       <Navbar />
//       <Container maxWidth="md" sx={{ py: 4 }}>
//         <Routes>
//           <Route path="/" element={<Feed />} />
//           <Route path="/top-users" element={<TopUsers />} />
//           <Route path="/trending-posts" element={<TrendingPosts />} />
//         </Routes>
//       </Container>
//     </Router>
//   );
// }

// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { Container } from '@mui/material';
// import Navbar from './components/Navbar';
// import TopUsers from './pages/TopUsers';
// import TrendingPosts from './pages/TrendingPosts';
// import Feed from './pages/Feed';

// const App = () => {
//   return (
//     <Router>
//       <Navbar />
//       <Container maxWidth="md" sx={{ py: 4 }}>
//         <Routes>
//           <Route path="/" element={<Feed />} />
//           <Route path="/top-users" element={<TopUsers />} />
//           <Route path="/trending-posts" element={<TrendingPosts />} />
//         </Routes>
//       </Container>
//     </Router>
//   );
// };

// export default App;


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';
import Navbar from './components/Navbar';
import TopUsers from './pages/TopUsers';
import TrendingPosts from './pages/TrendingPosts';
import Feed from './pages/Feed';
import UserDetail from './pages/UserDetail';
import PostDetail from './pages/PostDetail';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/top-users" element={<TopUsers />} />
          <Route path="/trending-posts" element={<TrendingPosts />} />
          <Route path="/users/:userId" element={<UserDetail />} />
          <Route path="/posts/:postId" element={<PostDetail />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;