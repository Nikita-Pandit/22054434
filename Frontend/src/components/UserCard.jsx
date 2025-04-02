// import { Card, CardContent, Typography, Avatar, Box } from '@mui/material';

// export default function UserCard({ user, postCount }) {
//   return (
//     <Card sx={{ mb: 2 }}>
//       <CardContent>
//         <Box display="flex" alignItems="center">
//           <Avatar src={`https://i.pravatar.cc/150?img=${user.id}`} />
//           <Box ml={2}>
//             <Typography variant="h6">{user.name}</Typography>
//             <Typography variant="body2" color="text.secondary">
//               {postCount} posts
//             </Typography>
//           </Box>
//         </Box>
//       </CardContent>
//     </Card>
//   );
// }


import { Card, CardContent, Typography, Avatar, Box } from '@mui/material';
import { Link } from 'react-router-dom';

export default function UserCard({ user, postCount }) {
  return (
    <Card 
      component={Link} 
      to={`/users/${user.id}`} 
      sx={{ 
        mb: 2, 
        textDecoration: 'none',
        '&:hover': {
          boxShadow: 3,        // Adds shadow on hover
          transform: 'translateY(-2px)', // Slight lift effect
          transition: 'all 0.3s ease' // Smooth transition
        }
      }}
    >
      <CardContent>
        <Box display="flex" alignItems="center">
          <Avatar src={`https://i.pravatar.cc/150?img=${user.id}`} />
          <Box ml={2}>
            <Typography variant="h6">{user.name}</Typography>
            <Typography variant="body2" color="text.secondary">
              {postCount} posts
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}