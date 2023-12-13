import OTP from './OTP';
import Routing from './routes/Routing';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
          <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    <Routing/>
    {/* <OTP/> */}
    </>
  );
}

export default App;
