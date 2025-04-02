// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Card, CardContent, Typography, Avatar } from '@mui/material';

// function TopUsers() {
//   const [topUsers, setTopUsers] = useState([]);

//   useEffect(() => {
//     axios.get('http://localhost:5000/api/top-users') // Replace with your backend API
//       .then(response => setTopUsers(response.data))
//       .catch(error => console.error(error));
//   }, []);

//   return (
//     <div>
//       <Typography variant="h4" gutterBottom>Top Users</Typography>
//       {topUsers.map(user => (
//         <Card key={user.id} style={{ marginBottom: '16px' }}>
//           <CardContent style={{ display: 'flex', alignItems: 'center' }}>
//             <Avatar src={`https://i.pravatar.cc/150?img=${user.id}`} />
//             <div style={{ marginLeft: '16px' }}>
//               <Typography variant="h6">{user.name}</Typography>
//               <Typography>Posts: {user.postCount}</Typography>
//             </div>
//           </CardContent>
//         </Card>
//       ))}
//     </div>
//   );
// }

// export default TopUsers;


// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Typography, CircularProgress, Alert } from '@mui/material';
// import UserCard from '../components/UserCard';

// export default function TopUsers() {
//   const [topUsers, setTopUsers] = useState([]);
//   const [users, setUsers] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Fetch users first
//         const usersResponse = await axios.get('http://localhost:5000/users');
//         setUsers(usersResponse.data.users);
        
//         // Then fetch posts to calculate post counts
//         const postsResponse = await axios.get('http://localhost:5000/posts');
//         const posts = postsResponse.data;
        
//         // Calculate post counts per user
//         const postCounts = {};
//         posts.forEach(post => {
//           postCounts[post.userId] = (postCounts[post.userId] || 0) + 1;
//         });
        
//         // Create top users array
//         const userArray = Object.entries(usersResponse.data.users).map(([id, name]) => ({
//           id,
//           name,
//           postCount: postCounts[id] || 0
//         }));
        
//         // Sort and get top 5
//         setTopUsers(userArray.sort((a, b) => b.postCount - a.postCount).slice(0, 5));
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
//       <Typography variant="h4" gutterBottom>Top Users</Typography>
//       {topUsers.map(user => (
//         <UserCard key={user.id} user={user} postCount={user.postCount} />
//       ))}
//     </div>
//   );
// }


import { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, CircularProgress, Alert } from '@mui/material';
import UserCard from '../components/UserCard';

export default function TopUsers() {
  const [topUsers, setTopUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make a single request to our backend's /users endpoint
        const response = await axios.get('http://localhost:5000/users', {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        // Our backend already returns the top 5 users with post counts
        setTopUsers(response.data);
      } catch (error) {
        console.error('API Error:', error.response?.data || error.message);
        setError(error.response?.data?.message || 'Failed to load top users');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
        Top Users
      </Typography>
      {topUsers.length > 0 ? (
        topUsers.map(user => (
          <UserCard 
            key={user.id} 
            user={{ id: user.id, name: user.name }} 
            postCount={user.postCount} 
          />
        ))
      ) : (
        <Typography variant="body1" color="text.secondary">
          No users found
        </Typography>
      )}
    </div>
  );
}