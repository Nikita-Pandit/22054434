import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Typography, Avatar, Box, List, ListItem, ListItemText, CircularProgress, Alert } from '@mui/material';

export default function UserDetail() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user details
        const usersResponse = await axios.get('http://localhost:5000/users');
        const user = usersResponse.data.find(u => u.id === userId);
        
        // Fetch all posts and filter by user
        const postsResponse = await axios.get('http://localhost:5000/posts?type=latest');
        const posts = postsResponse.data.filter(post => post.userId === userId);
        
        setUser(user);
        setUserPosts(posts);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [userId]);

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;
  if (!user) return <Typography>User not found</Typography>;

  return (
    <div>
      <Box display="flex" alignItems="center" mb={4}>
        <Avatar src={`https://i.pravatar.cc/150?img=${userId}`} sx={{ width: 80, height: 80 }} />
        <Box ml={3}>
          <Typography variant="h4">{user.name}</Typography>
          <Typography variant="subtitle1">{userPosts.length} posts</Typography>
        </Box>
      </Box>

      <Typography variant="h5" gutterBottom>Recent Posts</Typography>
      <List>
        {userPosts.map(post => (
          <ListItem key={post.id} button component="a" href={`/posts/${post.id}`}>
            <ListItemText
              primary={post.title}
              secondary={`${post.comments?.length || 0} comments • ${new Date(post.createdAt).toLocaleString()}`}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
}