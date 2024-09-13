
  "use client"
import { useState,useEffect, useRef } from "react";
import { useSearchParams } from 'next/navigation'
import { jwtDecode } from "jwt-decode";
const CryptoJS = require("crypto-js");
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { FaAngleRight } from "react-icons/fa";
import { FaAngleLeft } from "react-icons/fa";
export default function Home() {
  const [username, setusername] = useState("")
  const [email, setemail] = useState("")
  const [list, setlist] = useState([])
  const [money, setMoney] = useState('');
  const phone = useRef("")
  const hide = useRef("")
  const open = useRef("")
  const [date, setDate] = useState('');
  const [spenton, setSpenton] = useState('');
  const [monthlyExpenditures, setMonthlyExpenditures] = useState({
    jan: 0,
    feb: 0,
    mar: 0,
    apr: 0,
    may: 0,
    jun: 0,
    jul: 0,
    aug: 0,
    sep: 0,
    oct: 0,
    nov: 0,
    dec: 0,
  });
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const submitbotton=(e)=>{
    e.preventDefault()
  
    const newEntry = {money,date,spenton};
    setlist([...list, newEntry]);
    setMoney('');
    setDate('');
    setSpenton('');
      }
  const handledelete=(index)=>{
    
    const newEntry = list.filter((item,idx)=>{
      return idx !== index;
     })
    setlist(newEntry);
    
  }
  const handleedit=(index)=>{
   
    setMoney(list[index].money);
    setDate(list[index].date);
    setSpenton(list[index].spenton);
    const newEntry = list.filter((item,idx)=>{
      return idx !== index;
     })
    setlist(newEntry);
    
  }
  const Display=()=>{
    phone.current.style.display = "block";
    hide.current.style.display = "none";
    open.current.style.display = "none"; 
    phone.current.style.animation = 'moveRight 1s ease-out forwards';
  }
  const In=()=>{
    open.current.style.display = "block";
    setTimeout(()=>{phone.current.style.display = "none";
      hide.current.style.display = "flex";
      hide.current.style.animation = 'left 0.1s ease-in forwards';  
    },1000)
    
    phone.current.style.animation = 'moveleft 1s ease-in forwards';
    
  }
  useEffect(() => {
    const newExpenditures = {
      jan: 0,
      feb: 0,
      mar: 0,
      apr: 0,
      may: 0,
      jun: 0,
      jul: 0,
      aug: 0,
      sep: 0,
      oct: 0,
      nov: 0,
      dec: 0,
    };
    async function  updating() {
    await fetch("/api/expenditure", {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email,value:list})
    })}
    updating()
 
    list.forEach(element => {
      const month = element.date.split("-")[1];
      const amount = parseFloat(element.money);

      switch (month) {
        case '01':
          newExpenditures.jan += amount;
          break;
        case '02':
          newExpenditures.feb += amount;
          break;
        case '03':
          newExpenditures.mar += amount;
          break;
        case '04':
          newExpenditures.apr += amount;
          break;
        case '05':
          newExpenditures.may += amount;
          break;
        case '06':
          newExpenditures.jun += amount;
          break;
        case '07':
          newExpenditures.jul += amount;
          break;
        case '08':
          newExpenditures.aug += amount;
          break;
        case '09':
          newExpenditures.sep += amount;
          break;
        case '10':
          newExpenditures.oct += amount;
          break;
        case '11':
          newExpenditures.nov += amount;
          break;
        case '12':
          newExpenditures.dec += amount;
          break;
        default:
          break;
      }
    });
    setMonthlyExpenditures(newExpenditures);
  }, [list])
  
  useEffect(() => {
     
    async function  checkAndLogin () {
      
    {
      try {
        
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
          setusername(result.name);
          setemail(result.email)

         async function  geting() {
    const res=await fetch("/api/getexpenditure", {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email:result.email})
    })
  const data=await res.json();
  return data.result.value;
}
   const userdata=await geting();
   setlist(userdata)
         
        } else {
          console.error('Login failed:', result.message);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    } 
     }
   
      checkAndLogin();
  }, []);

  return (
    <>
      <div className="fixed top-0 bg-white  left-0 -z-10 ">
        
      </div>


      <div className="block ">
      <div className="h-[100vh] w-full flex justify-between items-center  ">
        <div ref={phone} className="shadow2 h-screen relative w-[90%] lap:w-[28vw] hidden lap:block bg-[#000000] ">
          <button onClick={()=>{In()}} className="w-8 h-8 p-2 absolute block lap:hidden bg-black text-white top-2 z-10 right-1"><FaAngleLeft className="bg-transparent w-6 h-6"/></button>
          <div className="flex bg-black opacity-90">
          <div className="bg-black opacity-90"><img
              alt="Expenditure manager"
              src="https://cdn1.iconfinder.com/data/icons/shopping-essentials-3/32/invoice-bill-statement-purchase-expenditure-cost-shopping-1024.png"
              className="my-3 ml-4 h-8 w-auto bg-white rounded-full"
            /></div>
      <div className=" text-blue-400 bg-black text-lg font-serif lap:p-0 p-4 lap:m-[1vw] font-extrabold">EXPENDITURE MANAGER</div></div>
          <div className="flex lap:w-[25vw] lap:m-[1vw] m-2 items-center bg-black gap-4 lap:gap-[1vw]">
            <div className="h-12  flex justify-center items-center bg-black rounded-full border-white border-2"><img src="https://pbs.twimg.com/media/D4Zi17gXkAE8464.png" alt="" className="h-10 rounded-full" /></div>
            <div className="text-gray-300 text-pretty font-semibold text-sm flex bg-black flex-col">
              <span className=" bg-black  text-semi">{username}</span>
              <span className=" bg-black lap:text-md text-sm  lap:text-[1vw]">{email}</span>
            </div>
          </div>
          <div className=" lap:w-[25vw] lap:h-[34vw] mt-8 lap:ml-4 text-gray-300 bg-black lap:gap-[2vw]">
            <div className="text-2xl text-pretty font-bold text-green-400 text-center rounded-t-xl w-[100%] font-serif bg-black">Monthly Expenditure</div>
            <table class="table-fixed border border-transparent bg-black w-[90%]  lap:mt-6 m-8 lap:m-0 lap:ml-10 rounded-b-xl h-[90%]  shadow-xl">
  <thead className="rounded-b-xl bg-black border border-transparent">
    <tr className="border border-transparent bg-black">
      <th className="text-lg text-left font-serif bg-black">January</th>
      <th className="bg-black">&#8377;{monthlyExpenditures.jan}</th>
    </tr>
  </thead>
  <tbody className="bg-black">
    <tr className="border bg-black border-transparent">
      <th className="text-lg border-x border-x-transparent font-serif text-left bg-black">February</th>
      <th className="bg-black">&#8377;{monthlyExpenditures.feb}</th>
    </tr>
    <tr className="border border-transparent bg-black">
      <th className="text-lg font-serif text-left bg-black">March</th>
      <th className="bg-black">&#8377;{monthlyExpenditures.mar}</th>
    </tr>
    <tr className="border border-transparent bg-black">
      <th className="text-lg font-serif text-left bg-black">April</th>
      <th className="bg-black">&#8377;{monthlyExpenditures.apr}</th>
    </tr>
    <tr className="border border-transparent bg-black">
      <th className="text-lg font-serif text-left bg-black">May</th>
      <th className="bg-black">&#8377;{monthlyExpenditures.may}</th>
    </tr>
    <tr className="border border-transparent bg-black">
      <th className="text-lg font-serif text-left bg-black">June</th>
      <th className="bg-black">&#8377;{monthlyExpenditures.jun}</th>
    </tr>
    <tr className="border border-transparent bg-black">
      <th className="text-lg font-serif text-left bg-black">July</th>
      <th className="bg-black">&#8377;{monthlyExpenditures.jul}</th>
    </tr>
    <tr className="border border-transparent bg-black">
      <th className="text-lg font-serif text-left bg-black">August</th>
      <th className="bg-black">&#8377;{monthlyExpenditures.aug}</th>
    </tr>
    <tr className="border border-transparent bg-black">
      <th className="text-lg font-serif text-left bg-black">September</th>
      <th className="bg-black">&#8377;{monthlyExpenditures.sep}</th>
    </tr>
    <tr className="border border-transparent bg-black">
      <th className="text-lg font-serif text-left bg-black">October</th>
      <th className="bg-black">&#8377;{monthlyExpenditures.oct}</th>
    </tr>
    <tr className="border border-transparent bg-black">
      <th className="text-lg font-serif text-left bg-black">November</th>
      <th className="bg-black">&#8377;{monthlyExpenditures.nov}</th>
    </tr>
    <tr className="bg-black">
      <th className="text-lg font-serif text-left bg-black">December</th>
      <th className="bg-black">&#8377;{monthlyExpenditures.dec}</th>
    </tr>
  </tbody>
</table>         
          </div>
        </div>
        {/* It is done bro */}
        <div ref={hide} className="w-screen h-screen lap:w-[55vw] lap:h-[40vw] lap:p-[1vw] lap:gap-[1vw] flex flex-col items-center bg-white  border-2 border-black border-opacity-10 rounded-xl shadow1 backdrop-blur-[0.2vw] lap:mr-[4vw]"> 
          <button ref={open} onClick={()=>{Display()}} className="lap:hidden z-10 block hover:cursor-pointer fixed top-3 bg-transparent left-1 w-8 h-8 "><FaAngleRight className="bg-white
           rounded-full  w-8 h-6"/></button> 
          <div className="flex bg-white lap:hidden">
          <div className="bg-white ml-4 opacity-90"><img
              alt="Expenditure manager"
              src="https://cdn1.iconfinder.com/data/icons/shopping-essentials-3/32/invoice-bill-statement-purchase-expenditure-cost-shopping-1024.png"
              className="my-3  h-8 w-auto bg-white "
            /></div>
      <div className=" text-blue-400 bg-white py-2 text-lg font-serif m-[1vw] font-extrabold">EXPENDITURE MANAGER</div>
            </div> 
        <form onSubmit={submitbotton} className="flex flex-col justify-center mt-10 lap:mt-0 w-full items-center gap-[1vw] p-[1vw] bg-white  bg-opacity-10 rounded-md">
      <div className="flex gap-[1vw] bg-white ">
        <input
          onChange={(e) => setMoney(e.target.value)}
          value={money}
          required
          className="input-shadow1 outline-black border-0 text-white lap:p-[1vw] w-[40%] px-5 py-2 lap:px-[1.5vw] lap:w-[24vw] bg-black bg-opacity-90 rounded-[6vw] lap:placeholder:text-[1vw] placeholder:text-sm font-semibold placeholder:text-white placeholder:opacity-70"
          type="number"
          placeholder="Amount spent"
        />
        <input
          onChange={(e) => setDate(e.target.value)}
          value={date}
          className="input-shadow1 outline-black border-0 lap:text-black w-[55%] py-2 px-4 lap:p-[1vw] lap:px-[1.5vw] lap:w-[24vw] bg-white bg-opacity-90 rounded-[6vw] lap:placeholder:text-[1vw] lap:text-md text-sm  font-semibold text-gray-800 placeholder:text-black placeholder:opacity-70"
          type="date"
          required
          
        />
      </div>
      <div className="flex w-full m-2 lap:m-0 gap-4 lap:w-fit lap:gap-[1vw] bg-white">
        <input
          onChange={(e) => setSpenton(e.target.value)}
          value={spenton}
          required
          className="input-shadow1 outline-black border-0 text-white lap:p-[1vw] lap:px-[1.5vw] w-[70%] lap:w-[42vw] bg-black bg-opacity-90 rounded-[6vw] px-6 lap:placeholder:text-[1vw] placeholder:text-sm font-semibold placeholder:text-white placeholder:opacity-70"
          type="text"
          placeholder="Amount spent on"
        />
        <button type="submit" className="btnanim2 shadow3 text-gray-200 lap:text-white hover:bg-green-600 lap:py-[0.8vw] py-2 px-8 lap:px-[2vw] bg-black lap:rounded-[6vw] rounded-full  font-semibold font-serif lap:font-bold text-sm lap:text-[1vw] border-black">
          Add
        </button>
      </div>
    </form>
          
          <div className="scroll flex flex-col w-full lap:m-0 m-10  p-[1vw] h-[60vh] lap:h-[30vw]  bg-white rounded-md overflow-y-scroll overflow-x-hidden">
          <table className="table-fixed   bg-white  ">
  <thead className=" text-white text-pretty font-semibold text-sm ">
    <tr className="w-[100%]">
      <th className="w-[25%] py-2 rounded-tl-xl bg-black ">Time</th>
      <th className="w-[25%] bg-black">Spent On</th>
      <th className="w-[30%] bg-black">Amount</th>
      <th className="w-[20%] py-2 rounded-tr-xl bg-black">Edit</th>
    </tr>
  </thead>
  <tbody className=" text-pretty bg-gray-50 font-semibold text-sm">
    {list.map((entry, index) => (
      <tr key={index} className="bg-gray-50 ">
      <td className="text-center bg-gray-50 text-gray-500">{entry.date}</td>
      <td className="text-center bg-gray-50"><span className="text-sm text-gray-800 bg-gray-50">{entry.spenton}</span></td>
      <td className="text-center bg-gray-50"><span className="text-green-500 bg-gray-50">&#8377; {entry.money}</span></td>
      <td className="text-center bg-gray-50 flex justify-center gap-3 p-3"><button onClick={(e)=>{handleedit(index)}} className="cursor-pointer text-blue-500 bg-gray-50"><FaEdit className="bg-gray-50"/></button><button onClick={(e)=>{handledelete(index)}} className="cursor-pointer text-red-700"><MdDeleteOutline className="bg-gray-50"/></button></td>
        </tr>
   
  ))}
  </tbody>
</table>
          </div>
        </div>
      </div></div>
    </>

  );
}