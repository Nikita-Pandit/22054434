import { Card, CardContent, Typography, Avatar, Chip, CardMedia } from '@mui/material';
import { formatDistanceToNow } from 'date-fns';

const PostCard = ({ post, variant = 'default' }) => {
  // Determine image height based on variant
  const imageHeight = variant === 'compact' ? 200 : 300;

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {post.image && (
        <CardMedia
          component="img"
          height={imageHeight}
          image={post.image}
          alt="Post image"
        />
      )}
      <CardContent sx={{ flexGrow: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
          <Avatar src={post.avatar} />
          <Typography variant="subtitle1">{post.author}</Typography>
          {post.commentsCount !== undefined && (
            <Chip
              label={`${post.commentsCount} comments`}
              color="primary"
              size="small"
              sx={{ marginLeft: 'auto' }}
            />
          )}
        </div>
        <Typography variant="body1" sx={{ mb: 1 }}>{post.content}</Typography>
        {post.timestamp && (
          <Typography variant="caption" color="text.secondary">
            {formatDistanceToNow(new Date(post.timestamp), { addSuffix: true })}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default PostCard;