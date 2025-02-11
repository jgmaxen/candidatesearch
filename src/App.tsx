import { Outlet } from 'react-router-dom';
import Nav from './components/Nav';

function App() {
  return (
    <>
      <Nav />
      <main style={mainStyle}>
        <Outlet /> {/* ✅ This renders the active page */}
      </main>
    </>
  );
}

const mainStyle = {
  padding: '20px',
  maxWidth: '900px',
  margin: '0 auto',
};

export default App;
