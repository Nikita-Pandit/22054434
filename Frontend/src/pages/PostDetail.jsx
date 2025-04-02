import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Typography, Avatar, Box, List, ListItem, ListItemText, CircularProgress, Alert, Card, CardContent } from '@mui/material';

export default function PostDetail() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [users, setUsers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch users first
        const usersResponse = await axios.get('http://localhost:5000/users');
        setUsers(usersResponse.data.users);
        
        // Fetch all posts and find the specific one
        const postsResponse = await axios.get('http://localhost:5000/posts?type=latest');
        const foundPost = postsResponse.data.find(p => p.id === postId);
        
        if (!foundPost) {
          throw new Error('Post not found');
        }
        
        setPost(foundPost);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [postId]);

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;
  if (!post) return <Typography>Post not found</Typography>;

  return (
    <div>
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Box display="flex" alignItems="center" mb={2}>
            <Avatar src={`https://i.pravatar.cc/150?img=${post.userId}`} />
            <Typography variant="h6" ml={2}>
              {users[post.userId] || 'Unknown User'}
            </Typography>
          </Box>
          
          <Typography variant="h4" gutterBottom>{post.title}</Typography>
          <Typography variant="body1" paragraph>{post.content}</Typography>
          <Typography variant="caption" color="text.secondary">
            Posted on: {new Date(post.createdAt).toLocaleString()}
          </Typography>
        </CardContent>
      </Card>

      <Typography variant="h5" gutterBottom>Comments ({post.comments?.length || 0})</Typography>
      <List>
        {post.comments?.length > 0 ? (
          post.comments.map(comment => (
            <ListItem key={comment.id} alignItems="flex-start">
              <ListItemText
                primary={comment.author}
                secondary={
                  <>
                    <Typography component="span" variant="body2" color="text.primary">
                      {comment.content}
                    </Typography>
                    <br />
                    {new Date(comment.createdAt).toLocaleString()}
                  </>
                }
              />
            </ListItem>
          ))
        ) : (
          <Typography variant="body2" color="text.secondary">No comments yet</Typography>
        )}
      </List>
    </div>
  );
}