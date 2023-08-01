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
          <Route path="https://mongo-posts.onrender.com" element={<Navigate to="https://mongo-posts.onrender.com/posts" replace={true} />} />
          <Route path='https://mongo-posts.onrender.com/posts' element={<Posts />} />
          {checkUser
            ?
            <>
              <Route path='https://mongo-posts.onrender.com/createpost' element={<CreatePost />} />
              <Route path='https://mongo-posts.onrender.com/editpost' element={<EditPosts />} />
            </>
            :
            <>
              <Route path='https://mongo-posts.onrender.com/login' element={<Login />} />
              <Route path='https://mongo-posts.onrender.com/registration' element={<Registration />} />
            </>
          }
        </Routes>
      </main>
    </>
  );
}

export default App;
