"use client"
import { useState,useEffect } from "react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { jwtDecode } from "jwt-decode";
const CryptoJS = require("crypto-js");


export default function Example() {
  const [email, setemail] = useState()
  const [password, setpassword] = useState()

    const [isClient, setIsClient] = useState(false);
  
    useEffect(() => {
     
      async function  checkAndLogin () {
        
      {
        try {
          const token = localStorage.getItem('Token');
          if (!token) {
            console.error('No token found');
            return;
          }
      
          const decoded = jwtDecode(token, '@deekshigowda'); 
          if (!decoded) {
            console.error('Token verification failed');
            return;
          }
          var bytes  = CryptoJS.AES.decrypt(decoded.password, '@deekshigowda');
          var originalText = bytes.toString(CryptoJS.enc.Utf8);
          const data = await fetch("/api/login", {
            method: "post",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({email:decoded.email, password:originalText})
          })
          const result= await data.json()
      
          if (result.success) {
            
            window.location.replace(`/main_page?token=${token}`)
          } else {
            console.error('Login failed:', result.message);
           
          }
        } catch (error) {
          console.error('Error:', error);
        }
      } 
       }
      setIsClient(true);
     
        checkAndLogin();
    }, []);
  
  
  
  
  
  const Submit = async (e) => {
    e.preventDefault()
    const data = await fetch("/api/login", {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email,password })
    })
    const result= await data.json()
    if(result.success)
     {
      localStorage.setItem('Token',result.token)
      const tok = localStorage.getItem('Token');
      toast("Success")
      setemail("")
      setpassword("")
      setTimeout(() => {
        window.location.replace(`/main_page?token=${tok}`)
      }, 500);}
      else{
        
      toast.error(result.error)
        setemail("")
      setpassword("")
      }
     

  }

return (
  <>
  <div className="flex min-h-screen bg-[#f7f7f7] flex-1 flex-col justify-center px-6 py-12 lg:px-[20%]"> 
    <div className="flex min-h-full border bg-white shadow-lg shadow-slate-200 md:shadow-xl md:shadow-slate-200 flex-1 flex-col justify-center px-6  py-12 lg:px-8">
    <ToastContainer />
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Expenditure manager"
          src="https://cdn1.iconfinder.com/data/icons/shopping-essentials-3/32/invoice-bill-statement-purchase-expenditure-cost-shopping-1024.png"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={Submit} method="POST" className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => { setemail(e.target.value) }}
                required
                autoComplete="email"
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
              <div className="text-sm">
                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => { setpassword(e.target.value) }}
                required
                autoComplete="current-password"
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Don't have a account?{' '}
          <a href="/signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            Sign up
          </a>
        </p>
      </div>
    </div>
  </div></>
)
  }  