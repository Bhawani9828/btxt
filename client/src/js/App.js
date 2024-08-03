// import './App.css';
import React, { useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router,Routes,Route, useNavigate } from 'react-router-dom';
import Home from './pages/home';
import Create from './pages/create';
import Access from './pages/access';
import Masternode from './pages/masternodes';
import Messaging from './pages/messaging';
import SignUp from './pages/SignUp';

import TransactionComponent from './pages/transactionDel';
import VideoCall from './pages/videoCall' ;
import SignIn from './pages/SignIn';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Walletnavbar from './components/Walletnavbar';
import Pincode from './pages/Pincode';
import NotFound from './pages/NotFound';

// FOR MOBILES
import MobileStaticPage from './pages/MobileStaticPage';
import useMobileDetection from './pages/useMobileDetection';
import Profile from './pages/Profile';

const useLocalStorageValidation = (keys) => {
  const navigate = useNavigate();

  useEffect(() => {
    const areKeysPresent = () => {
      for (const key of keys) {
        if (!localStorage.getItem(key)) {
          return false;
        }
      }
      return true;
    };

    if (!areKeysPresent()) {
      navigate('/', { replace: true });
    }
  }, []);
};

const SignInWrapper = () => {
  useLocalStorageValidation(['keyW', 'address']);

  return <SignIn />;
};

const PincodeWrapper = () => {
  useLocalStorageValidation(['keyW', 'address', 'password']);

  return <Pincode />;
};

const MasternodeWrapper = () => {
  useLocalStorageValidation(['keyW', 'address', 'password', 'pincode']);
  return <Masternode />;
};

const MessagingWrapper = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/messaging', { replace: true });
  }, []);

  useLocalStorageValidation(['keyW', 'address', 'password', 'pincode']);

  return <Messaging />;
};
function App() {
  const isMobile = useMobileDetection();
  if (isMobile) {
    return <MobileStaticPage />;
  }
  return (
   
    <Router>
       <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/access" element={<Access />} />
        <Route path="/masternode" element={<MasternodeWrapper />} />
        <Route path="/messaging" element={<MessagingWrapper />} />
        <Route path="/signup" element={<SignUp />} />
       
        {/* <Route path="/video" element={<VideoCall />} /> */}
        {/* <Route path="/profile" element={<Profile />} /> */}
        <Route path="/transaction" element={<TransactionComponent />} />
        <Route path="/signin" element={<SignInWrapper  />} />
        <Route path="/walletnavbar" element={<Walletnavbar />} />
        <Route path="/pincode" element={<PincodeWrapper />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />

      </Routes>
    </Router>
  );
}

export default App;
