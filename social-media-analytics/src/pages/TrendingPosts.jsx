// import { useEffect, useState } from 'react';
// import { fetchTrendingPosts } from '../utils/api';
// import { Grid, Card, CardContent, Typography, Avatar, Chip } from '@mui/material';
// import Loading from '../components/Loading';

// const TrendingPosts = () => {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const getTrendingPosts = async () => {
//       try {
//         const postsData = await fetchTrendingPosts();
//         // Add mock data for demonstration
//         const enhancedPosts = postsData.map(post => ({
//           ...post,
//           commentsCount: Math.floor(Math.random() * 100), // Mock comments count
//           author: `User ${post.userid}`,
//           avatar: `https://i.pravatar.cc/150?img=${post.userid}`,
//           image: `https://picsum.photos/600/400?random=${post.id}`
//         }));
//         setPosts(enhancedPosts);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching trending posts:', error);
//         setLoading(false);
//       }
//     };

//     getTrendingPosts();
//   }, []);

//   if (loading) return <Loading />;

//   return (
//     <Grid container spacing={3}>
//       {posts.map((post) => (
//         <Grid item xs={12} key={post.id}>
//           <Card>
//             <img
//               src={post.image}
//               alt="Post"
//               style={{ width: '100%', height: '300px', objectFit: 'cover' }}
//             />
//             <CardContent>
//               <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
//                 <Avatar src={post.avatar} />
//                 <Typography variant="subtitle1">{post.author}</Typography>
//                 <Chip
//                   label={`${post.commentsCount} comments`}
//                   color="primary"
//                   size="small"
//                   sx={{ marginLeft: 'auto' }}
//                 />
//               </div>
//               <Typography variant="body1">{post.content}</Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//       ))}
//     </Grid>
//   );
// };
// export default TrendingPosts;


import { useEffect, useState } from 'react';
import { fetchTrendingPosts } from '../utils/api';
import { Grid } from '@mui/material';
import Loading from '../components/Loading';
import PostCard from '../components/PostCard';

const TrendingPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getTrendingPosts = async () => {
      try {
        const postsData = await fetchTrendingPosts();
        const enhancedPosts = postsData.map(post => ({
          ...post,
          commentsCount: Math.floor(Math.random() * 100),
          author: `User ${post.userid}`,
          avatar: `https://i.pravatar.cc/150?img=${post.userid}`,
          image: `https://picsum.photos/600/400?random=${post.id}`
        }));
        setPosts(enhancedPosts);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching trending posts:', error);
        setLoading(false);
      }
    };

    getTrendingPosts();
  }, []);

  if (loading) return <Loading />;

  return (
    <Grid container spacing={3}>
      {posts.map((post) => (
        <Grid item xs={12} key={post.id}>
          <PostCard post={post} />
        </Grid>
      ))}
    </Grid>
  );
};

export default TrendingPosts;