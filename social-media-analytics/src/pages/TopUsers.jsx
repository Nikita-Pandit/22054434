// import { useEffect, useState } from 'react';
// import { fetchTopUsers } from '../utils/api';
// import { Grid, Card, CardContent, Typography, Avatar } from '@mui/material';
// import Loading from '../components/Loading';

// const TopUsers = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const getTopUsers = async () => {
//       try {
//         const usersData = await fetchTopUsers();
//         // Convert to array and sort by post count (mock implementation)
//         const usersArray = Object.entries(usersData).map(([id, name]) => ({
//           id,
//           name,
//           postCount: Math.floor(Math.random() * 100), // Mock post count
//           avatar: `https://i.pravatar.cc/150?img=${id}` // Random avatar
//         }));
//         setUsers(usersArray.sort((a, b) => b.postCount - a.postCount).slice(0, 5));
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching top users:', error);
//         setLoading(false);
//       }
//     };

//     getTopUsers();
//   }, []);

//   if (loading) return <Loading />;

//   return (
//     <Grid container spacing={3}>
//       {users.map((user) => (
//         <Grid item xs={12} sm={6} md={4} key={user.id}>
//           <Card>
//             <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//               <Avatar src={user.avatar} sx={{ width: 56, height: 56 }} />
//               <div>
//                 <Typography variant="h6">{user.name}</Typography>
//                 <Typography color="text.secondary">
//                   {user.postCount} posts
//                 </Typography>
//               </div>
//             </CardContent>
//           </Card>
//         </Grid>
//       ))}
//     </Grid>
//   );
// };

// export default TopUsers;



import { useEffect, useState } from 'react';
import { fetchTopUsers } from '../utils/api';
import { Grid } from '@mui/material';
import Loading from '../components/Loading';
import UserCard from '../components/UserCard';

const TopUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getTopUsers = async () => {
      try {
        const usersData = await fetchTopUsers();
        const usersArray = Object.entries(usersData).map(([id, name]) => ({
          id,
          name,
          postCount: Math.floor(Math.random() * 100),
          avatar: `https://i.pravatar.cc/150?img=${id}`,
          bio: `Social media enthusiast with ${Math.floor(Math.random() * 1000)} followers`
        }));
        setUsers(usersArray.sort((a, b) => b.postCount - a.postCount).slice(0, 5));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching top users:', error);
        setLoading(false);
      }
    };

    getTopUsers();
  }, []);

  if (loading) return <Loading />;

  return (
    <Grid container spacing={3}>
      {users.map((user) => (
        <Grid item xs={12} sm={6} md={4} key={user.id}>
          <UserCard user={user} />
        </Grid>
      ))}
    </Grid>
  );
};

export default TopUsers;