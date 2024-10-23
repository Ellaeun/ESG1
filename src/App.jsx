import { FaLock, FaUser } from "react-icons/fa";
import { MdMail } from "react-icons/md";

const App = () => {
  return (
    <div 
      className="h-screen flex items-center justify-center text-black mt-4" 
      style={{ backgroundImage: "url('../src/picture/green.jpg')", backgroundSize: 'cover' }}
    >
      <div className="bg-gradient-to-r from-blue-500 via-yellow-500 to-green-500 p-8 rounded-lg shadow-lg font-serif font-bold">
        <h2 className="text-3xl text-center font-extrabold mb-6">Login</h2>
        <form className="flex flex-col items-center" action="">
          <div className="w-full relative mb-4">
            <input className="border border-yellow-700 w-full rounded-full py-2 px-2" placeholder="Username" type="text" />
            <FaUser className="absolute top-1/2 right-3 transform -translate-y-1/2" />
          </div>
          <div className="w-full relative mb-4">
            <input className="border border-yellow-700 w-full rounded-full py-2 px-2" placeholder="Email" type="email" />
            <MdMail className="absolute top-1/2 right-3 transform -translate-y-1/2" />
          </div>
          <div className="w-full relative mb-4">
            <input className="border border-yellow-700 w-full rounded-full py-2 px-2" placeholder="Password" type="password" />
            <FaLock className="absolute top-1/2 right-3 transform -translate-y-1/2" />
          </div>
          <button type="submit" className="bg-black text-white font-bold font-serif w-full py-2 px-4 rounded-full mt-4">Register</button>
          <span className="block mt-4">Already have an account? <span className="text-white cursor-pointer">Login</span></span>
        </form>
      </div>
    </div>
  );
};

export default App;
