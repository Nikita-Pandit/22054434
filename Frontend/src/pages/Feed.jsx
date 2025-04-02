// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import { Card, CardContent, Typography, CardMedia } from '@mui/material';

// // function Feed() {
// //   const [posts, setPosts] = useState([]);

// //   useEffect(() => {
// //     const fetchPosts = () => {
// //       axios.get('http://localhost:5000/api/feed') // Replace with your backend API
// //         .then(response => setPosts(response.data))
// //         .catch(error => console.error(error));
// //     };

// //     fetchPosts();
// //     const interval = setInterval(fetchPosts, 5000); // Refresh every 5 seconds

// //     return () => clearInterval(interval);
// //   }, []);

// //   return (
// //     <div>
// //       <Typography variant="h4" gutterBottom>Feed</Typography>
// //       {posts.map(post => (
// //         <Card key={post.id} style={{ marginBottom: '16px' }}>
// //           <CardMedia
// //             component="img"
// //             height="140"
// //             image={`https://source.unsplash.com/random/300x200?sig=${post.id}`}
// //             alt="Post image"
// //           />
// //           <CardContent>
// //             <Typography variant="h6">{post.title}</Typography>
// //             <Typography variant="body2">{post.content}</Typography>
// //             <Typography variant="caption">Posted at: {new Date(post.timestamp).toLocaleString()}</Typography>
// //           </CardContent>
// //         </Card>
// //       ))}
// //     </div>
// //   );
// // }

// // export default Feed;


// app.get("/posts", async (req, res) => {
//     try {
//         const { type } = req.query;
//         if (!type) {
//             return res.status(400).json({ message: "Type parameter is required" });
//         }

//         const response = await axios.get(`${BASE_URL}/posts`, {
//             headers: {
//                 "Authorization": `${process.env.TOKEN_TYPE} ${process.env.ACCESS_TOKEN}`,
//                 "Content-Type": "application/json"
//             }
//         });
        
//         const posts = response.data;

//         let filteredPosts = [];
//         if (type === "popular") {
//             const maxComments = Math.max(...posts.map(post => post.comments?.length || 0));
//             filteredPosts = posts.filter(post => post.comments?.length === maxComments);
//         } else if (type === "latest") {
//             filteredPosts = posts.sort((a, b) => 
//                 new Date(b.createdAt) - new Date(a.createdAt)
//             ).slice(0, 5);
//         } else {
//             return res.status(400).json({ message: "Invalid type parameter" });
//         }

//         res.json(filteredPosts);
//     } catch (error) {
//         console.error("Posts error:", error);
//         res.status(500).json({ 
//             message: "Error fetching posts", 
//             error: error.message,
//             details: error.response?.data
//         });
//     }
// });


// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Typography, CircularProgress, Alert } from '@mui/material';
// import PostCard from '../components/PostCard';

// export default function Feed() {
//   const [posts, setPosts] = useState([]);
//   const [users, setUsers] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Fetch users first
//         const usersResponse = await axios.get('http://localhost:5000/users');
//         setUsers(usersResponse.data.users);
        
//         // Then fetch latest posts
//         const postsResponse = await axios.get('http://localhost:5000/posts?type=latest');
//         setPosts(postsResponse.data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
    
//     fetchData();
    
//     // Set up polling for real-time updates
//     const interval = setInterval(fetchData, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   if (loading) return <CircularProgress />;
//   if (error) return <Alert severity="error">{error}</Alert>;

//   return (
//     <div>
//       <Typography variant="h4" gutterBottom>Latest Posts</Typography>
//       {posts.map(post => (
//         <PostCard key={post.id} post={post} users={users} />
//       ))}
//     </div>
//   );
// }




import { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, CircularProgress, Alert, Box } from '@mui/material';
import PostCard from '../components/PostCard';

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      // Fetch users and posts in parallel for better performance
      const [usersResponse, postsResponse] = await Promise.all([
        axios.get('http://localhost:5000/users', {
          headers: {
            'Content-Type': 'application/json'
          }
        }),
        axios.get('http://localhost:5000/posts', {
          params: { type: 'latest' },
          headers: {
            'Content-Type': 'application/json'
          }
        })
      ]);

      setUsers(usersResponse.data.users || {});
      setPosts(postsResponse.data || []);
      setError(null);
    } catch (error) {
      console.error('API Error:', error.response?.data || error.message);
      setError(error.response?.data?.message || 'Failed to load feed data');
      // Optionally keep previous data if available
      if (!posts.length) setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    
    // Set up polling for real-time updates (every 10 seconds)
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        {error}
      </Alert>
    );
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Latest Posts
      </Typography>
      
      {posts.length > 0 ? (
        posts.map(post => (
          <PostCard key={post.id} post={post} users={users} />
        ))
      ) : (
        <Typography variant="body1" color="text.secondary">
          No posts available
        </Typography>
      )}
    </div>
  );
}