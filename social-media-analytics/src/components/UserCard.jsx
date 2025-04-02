import { Card, CardContent, Typography, Avatar, Box } from '@mui/material';

const UserCard = ({ user }) => {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Avatar src={user.avatar} sx={{ width: 56, height: 56 }} />
        <Box>
          <Typography variant="h6">{user.name}</Typography>
          <Typography color="text.secondary">
            {user.postCount} posts
          </Typography>
          {user.bio && (
            <Typography variant="body2" sx={{ mt: 1 }}>
              {user.bio}
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default UserCard;