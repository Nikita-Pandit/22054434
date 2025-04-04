import Navbar from './Navbar';
import { Container } from '@mui/material';

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        {children}
      </Container>
    </>
  );
};

export default Layout;