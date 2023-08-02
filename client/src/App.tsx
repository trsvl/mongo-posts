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
          <Route path={process.env.REACT_APP_PUBLIC_URL + "/"} element={<Navigate to={process.env.REACT_APP_PUBLIC_URL + "/posts"} replace={true} />} />
          <Route path={process.env.REACT_APP_PUBLIC_URL + '/posts'} element={<Posts />} />
          {checkUser
            ?
            <>
              <Route path={process.env.REACT_APP_PUBLIC_URL + '/createpost'} element={<CreatePost />} />
              <Route path={process.env.REACT_APP_PUBLIC_URL + '/editpost'} element={<EditPosts />} />
            </>
            :
            <>
              <Route path={process.env.REACT_APP_PUBLIC_URL + '/login'} element={<Login />} />
              <Route path={process.env.REACT_APP_PUBLIC_URL + '/registration'} element={<Registration />} />
            </>
          }
          <Route path='*' element={<h1 className='absolute__center'>Not Found</h1>} />
        </Routes>
      </main>
    </>
  );
}

export default App;
