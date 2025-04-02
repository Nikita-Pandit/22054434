// import { Card, CardContent, Typography, CardMedia, Avatar, Box } from '@mui/material';

// export default function PostCard({ post, users }) {
//   return (
//     <Card sx={{ mb: 3 }}>
//       <CardMedia
//         component="img"
//         height="140"
//         image={`https://source.unsplash.com/random/300x200?sig=${post.id}`}
//         alt="Post image"
//       />
//       <CardContent>
//         <Box display="flex" alignItems="center" mb={2}>
//           <Avatar src={`https://i.pravatar.cc/150?img=${post.userId}`} />
//           <Typography variant="subtitle1" ml={2}>
//             {users[post.userId] || 'Unknown User'}
//           </Typography>
//         </Box>
//         <Typography variant="h6">{post.title}</Typography>
//         <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
//           {post.content}
//         </Typography>
//         <Typography variant="caption" display="block" sx={{ mt: 2 }}>
//           {new Date(post.createdAt).toLocaleString()} • {post.comments?.length || 0} comments
//         </Typography>
//       </CardContent>
//     </Card>
//   );
// }



import { Card, CardContent, Typography, CardMedia, Avatar, Box } from '@mui/material';
import { Link } from 'react-router-dom';

export default function PostCard({ post, users }) {
  return (
    <Card 
      component={Link} 
      to={`/posts/${post.id}`} 
      sx={{ 
        mb: 3, 
        textDecoration: 'none',
        '&:hover': {
          boxShadow: 3, // Adds shadow on hover for better UX
          transform: 'translateY(-2px)', // Slight lift effect
          transition: 'all 0.3s ease' // Smooth transition
        }
      }}
    >
      <CardMedia
        component="img"
        height="140"
        image={`https://source.unsplash.com/random/300x200?sig=${post.id}`}
        alt="Post image"
      />
      <CardContent>
        <Box display="flex" alignItems="center" mb={2}>
          <Avatar src={`https://i.pravatar.cc/150?img=${post.userId}`} />
          <Typography variant="subtitle1" ml={2}>
            {users[post.userId] || 'Unknown User'}
          </Typography>
        </Box>
        <Typography variant="h6">{post.title}</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {post.content}
        </Typography>
        <Typography variant="caption" display="block" sx={{ mt: 2 }}>
          {new Date(post.createdAt).toLocaleString()} • {post.comments?.length || 0} comments
        </Typography>
      </CardContent>
    </Card>
  );
}