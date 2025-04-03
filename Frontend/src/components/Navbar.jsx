import { AppBar, Toolbar, Button } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={Link} to="/">Feed</Button>
        <Button color="inherit" component={Link} to="/top-users">Top Users</Button>
        <Button color="inherit" component={Link} to="/trending-posts">Trending Posts</Button>
      </Toolbar>
    </AppBar>
  );
}