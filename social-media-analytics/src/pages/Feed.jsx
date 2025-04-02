// import { useEffect, useState } from 'react';
// import { fetchLatestPosts } from '../utils/api';
// import { Grid, Card, CardContent, Typography, Avatar } from '@mui/material';
// import Loading from '../components/Loading';

// const Feed = () => {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const getLatestPosts = async () => {
//       try {
//         const postsData = await fetchLatestPosts();
//         // Add mock data for demonstration
//         const enhancedPosts = postsData.map(post => ({
//           ...post,
//           commentsCount: Math.floor(Math.random() * 50), // Mock comments count
//           author: `User ${post.userid}`,
//           avatar: `https://i.pravatar.cc/150?img=${post.userid}`,
//           image: `https://picsum.photos/600/400?random=${post.id}`,
//           timestamp: new Date(Date.now() - Math.floor(Math.random() * 1000 * 60 * 60 * 24)).toISOString()
//         }));
//         setPosts(enhancedPosts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)));
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching latest posts:', error);
//         setLoading(false);
//       }
//     };

//     getLatestPosts();

//     // Set up polling for real-time updates
//     const interval = setInterval(() => {
//       getLatestPosts();
//     }, 30000); // Update every 30 seconds

//     return () => clearInterval(interval);
//   }, []);

//   if (loading) return <Loading />;

//   return (
//     <Grid container spacing={3}>
//       {posts.map((post) => (
//         <Grid item xs={12} sm={6} md={4} key={post.id}>
//           <Card>
//             <img
//               src={post.image}
//               alt="Post"
//               style={{ width: '100%', height: '200px', objectFit: 'cover' }}
//             />
//             <CardContent>
//               <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
//                 <Avatar src={post.avatar} />
//                 <Typography variant="subtitle1">{post.author}</Typography>
//               </div>
//               <Typography variant="body1" sx={{ mb: 1 }}>{post.content}</Typography>
//               <Typography variant="caption" color="text.secondary">
//                 {new Date(post.timestamp).toLocaleString()} • {post.commentsCount} comments
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//       ))}
//     </Grid>
//   );
// };

// export default Feed;



import { useEffect, useState } from 'react';
import { fetchLatestPosts } from '../utils/api';
import { Grid } from '@mui/material';
import Loading from '../components/Loading';
import PostCard from '../components/PostCard';

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getLatestPosts = async () => {
      try {
        const postsData = await fetchLatestPosts();
        const enhancedPosts = postsData.map(post => ({
          ...post,
          commentsCount: Math.floor(Math.random() * 50),
          author: `User ${post.userid}`,
          avatar: `https://i.pravatar.cc/150?img=${post.userid}`,
          image: `https://picsum.photos/600/400?random=${post.id}`,
          timestamp: new Date(Date.now() - Math.floor(Math.random() * 1000 * 60 * 60 * 24)).toISOString()
        }));
        setPosts(enhancedPosts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching latest posts:', error);
        setLoading(false);
      }
    };

    getLatestPosts();
    const interval = setInterval(getLatestPosts, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <Loading />;

  return (
    <Grid container spacing={3}>
      {posts.map((post) => (
        <Grid item xs={12} sm={6} md={4} key={post.id}>
          <PostCard post={post} variant="compact" />
        </Grid>
      ))}
    </Grid>
  );
};

export default Feed;