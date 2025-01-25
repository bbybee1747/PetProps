import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';



const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const redirectPath = queryParams.get("redirect") || "/";  

  // Simulate login logic (replace with actual login logic)
  const handleLogin = async () => {
    // Perform authentication logic here (e.g., API call)
    const loginSuccess = true;  // Replace this with real authentication check

    if (loginSuccess) {
      navigate(redirectPath, { replace: true });
    } else {
      alert("Authentication failed.");
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-4 py-3 lg:px-4">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
         <img
             alt="Pet Props Logo"
             src="src/assets/PetProp.png"
             className="mx-auto h-20 w-auto mt-2 mb-2"
         />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">
                Username
              </label>
              <div className="mt-2">
                <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="username"
                placeholder="Username"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-gray-800 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                 type="password"
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
                 placeholder="Password"
                 required
                 autoComplete="current-password"
                 className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
        />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-gray-800 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignIn;