import { useAppSelector } from './app/hooks';
import Header from './pages/Header';
import { Routes, Route, Navigate } from "react-router-dom"
import Login from './pages/Auth/Login';
import Registration from './pages/Auth/Registration';
import CreatePost from './pages/CreatePost';
import Posts from './pages/Posts';
import EditPosts from './pages/EditPosts';

function App() {

  const checkUser = useAppSelector(state => state.user.checkUser)

  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/posts" replace={true} />} />
          <Route path='posts' element={<Posts />} />
          {checkUser
            ?
            <>
              <Route path='createpost' element={<CreatePost />} />
              <Route path='editpost' element={<EditPosts />} />
            </>
            :
            <>
              <Route path='login' element={<Login />} />
              <Route path='registration' element={<Registration />} />
            </>
          }
        </Routes>
      </main>
    </>
  );
}

export default App;
