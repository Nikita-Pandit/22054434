// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Card, CardContent, Typography, CardMedia } from '@mui/material';

// function TrendingPosts() {
//   const [trendingPosts, setTrendingPosts] = useState([]);

//   useEffect(() => {
//     axios.get('http://localhost:5000/api/trending-posts') // Replace with your backend API
//       .then(response => setTrendingPosts(response.data))
//       .catch(error => console.error(error));
//   }, []);

//   return (
//     <div>
//       <Typography variant="h4" gutterBottom>Trending Posts</Typography>
//       {trendingPosts.map(post => (
//         <Card key={post.id} style={{ marginBottom: '16px' }}>
//           <CardMedia
//             component="img"
//             height="140"
//             image={`https://source.unsplash.com/random/300x200?sig=${post.id}`}
//             alt="Post image"
//           />
//           <CardContent>
//             <Typography variant="h6">{post.title}</Typography>
//             <Typography>Comments: {post.commentCount}</Typography>
//           </CardContent>
//         </Card>
//       ))}
//     </div>
//   );
// }

// export default TrendingPosts;


// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Typography, CircularProgress, Alert } from '@mui/material';
// import PostCard from '../components/PostCard';

// export default function TrendingPosts() {
//   const [trendingPosts, setTrendingPosts] = useState([]);
//   const [users, setUsers] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Fetch users first
//         const usersResponse = await axios.get('http://localhost:5000/users');
//         setUsers(usersResponse.data.users);
        
//         // Then fetch popular posts
//         const postsResponse = await axios.get('http://localhost:5000/posts?type=popular');
//         setTrendingPosts(postsResponse.data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
    
//     fetchData();
//   }, []);

//   if (loading) return <CircularProgress />;
//   if (error) return <Alert severity="error">{error}</Alert>;

//   return (
//     <div>
//       <Typography variant="h4" gutterBottom>Trending Posts</Typography>
//       {trendingPosts.map(post => (
//         <PostCard key={post.id} post={post} users={users} />
//       ))}
//     </div>
//   );
// }



import { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, CircularProgress, Alert, Container } from '@mui/material';
import PostCard from '../components/PostCard';

export default function TrendingPosts() {
  const [trendingPosts, setTrendingPosts] = useState([]);
  const [users, setUsers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make parallel requests for better performance
        const [usersResponse, postsResponse] = await Promise.all([
          axios.get('http://localhost:5000/users', {
            headers: {
              'Content-Type': 'application/json'
            }
          }),
          axios.get('http://localhost:5000/posts', {
            params: { type: 'popular' },
            headers: {
              'Content-Type': 'application/json'
            }
          })
        ]);

        setUsers(usersResponse.data.users || {});
        setTrendingPosts(postsResponse.data || []);
      } catch (error) {
        console.error('API Error:', error.response?.data || error.message);
        setError(error.response?.data?.message || 'Failed to load trending posts');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom sx={{ mt: 3, mb: 2 }}>
        Trending Posts
      </Typography>
      
      {trendingPosts.length > 0 ? (
        trendingPosts.map(post => (
          <PostCard key={post.id} post={post} users={users} sx={{ mb: 3 }} />
        ))
      ) : (
        <Typography variant="body1" color="text.secondary">
          No trending posts found
        </Typography>
      )}
    </Container>
  );
}