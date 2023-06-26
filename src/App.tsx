import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { AppProvider } from './context/AppContext';
import { Homepage } from './pages/Homepage';
import { PostDetails } from './pages/PostDetails';

function App() {
  return (
    <AppProvider>
      <Layout>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/:postId" element={<PostDetails />} />
          </Routes>
        </BrowserRouter>
      </Layout>
    </AppProvider>
  );
}

export default App;
