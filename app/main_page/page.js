
  "use client"
import { useState,useEffect } from "react";
import { useSearchParams } from 'next/navigation'
import { jwtDecode } from "jwt-decode";
const CryptoJS = require("crypto-js");
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
export default function Home() {
  const [username, setusername] = useState("")
  const [email, setemail] = useState("")
  const [list, setlist] = useState([])
  const [money, setMoney] = useState('');
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
      <div className="fixed top-0 left-0 -z-10 ">
        
      </div>


      <div className="block">
      <div className="h-[100vh] w-full flex justify-between items-center ">
        <div className="shadow2 h-screen w-[28vw] bg-black bg-opacity-50">
      <span className=" text-white text-lg font-serif m-[1vw] font-extrabold">EXPENDITURE MANAGER</span>
          <div className="flex w-[25vw] m-[1vw] items-center bg-white bg-opacity-10 rounded-[6vw] gap-[1vw]">
            <div className="h-[5.5vw] w-[5.5vw] flex justify-center items-center bg-black rounded-full border-white border-2"><img src="https://pbs.twimg.com/media/D4Zi17gXkAE8464.png" alt="" className="h-[5vw] rounded-full" /></div>
            <div className="text-white flex flex-col gap-[1vw] pr-[2vw]">
              <span className="text-[1vw]">{username}</span>
              <span className="text-[1vw]">{email}</span>
            </div>
          </div>
          <div className=" w-[25vw] h-[34vw] m-[1vw] px-10 py-5 bg-white bg-opacity-10 rounded-[6vw] gap-[2vw]">
            <div className="text-lg text-center rounded-t-xl w-[90%] font-serif bg-white">Monthly Expenditure</div>
            <table class="table-fixed bg-white w-[90%] h-[90%] border border-gray-300 shadow-xl">
  <thead>
    <tr>
      <th className="text-lg font-serif">January</th>
      <th>&#8377;{monthlyExpenditures.jan}</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th className="text-lg font-serif">February</th>
      <th>&#8377;{monthlyExpenditures.feb}</th>
    </tr>
    <tr>
      <th className="text-lg font-serif">March</th>
      <th>&#8377;{monthlyExpenditures.mar}</th>
    </tr>
    <tr>
      <th className="text-lg font-serif">April</th>
      <th>&#8377;{monthlyExpenditures.apr}</th>
    </tr>
    <tr>
      <th className="text-lg font-serif">May</th>
      <th>&#8377;{monthlyExpenditures.may}</th>
    </tr>
    <tr>
      <th className="text-lg font-serif">June</th>
      <th>&#8377;{monthlyExpenditures.jun}</th>
    </tr>
    <tr>
      <th className="text-lg font-serif">July</th>
      <th>&#8377;{monthlyExpenditures.jul}</th>
    </tr>
    <tr>
      <th className="text-lg font-serif">August</th>
      <th>&#8377;{monthlyExpenditures.aug}</th>
    </tr>
    <tr>
      <th className="text-lg font-serif">September</th>
      <th>&#8377;{monthlyExpenditures.sep}</th>
    </tr>
    <tr>
      <th className="text-lg font-serif">October</th>
      <th>&#8377;{monthlyExpenditures.oct}</th>
    </tr>
    <tr>
      <th className="text-lg font-serif">November</th>
      <th>&#8377;{monthlyExpenditures.nov}</th>
    </tr>
    <tr>
      <th className="text-lg font-serif">December</th>
      <th>&#8377;{monthlyExpenditures.dec}</th>
    </tr>
  </tbody>
</table>         
          </div>
        </div>
        <div className=" w-[55vw] h-[40vw] p-[1vw] gap-[1vw] flex flex-col items-center bg-white  border-2 border-black border-opacity-10 rounded-xl shadow1 backdrop-blur-[0.2vw] mr-[4vw]">   
        <form onSubmit={submitbotton} className="flex flex-col justify-center w-full items-center gap-[1vw] p-[1vw] bg-black bg-opacity-10 rounded-md">
      <div className="flex gap-[1vw]">
        <input
          onChange={(e) => setMoney(e.target.value)}
          value={money}
          required
          className="input-shadow1 outline-black border-0 text-white p-[1vw] px-[1.5vw] w-[24vw] bg-black bg-opacity-90 rounded-[6vw] placeholder:text-[1vw] placeholder:text-white placeholder:opacity-70"
          type="number"
          placeholder="Amount spent"
        />
        <input
          onChange={(e) => setDate(e.target.value)}
          value={date}
          className="input-shadow1 outline-black border-0 text-black p-[1vw] px-[1.5vw] w-[24vw] bg-white bg-opacity-90 rounded-[6vw] placeholder:text-[1vw] placeholder:text-black placeholder:opacity-70"
          type="date"
          required
          placeholder="Date"
        />
      </div>
      <div className="flex gap-[1vw]">
        <input
          onChange={(e) => setSpenton(e.target.value)}
          value={spenton}
          required
          className="input-shadow1 outline-black border-0 text-white p-[1vw] px-[1.5vw] w-[42vw] bg-black bg-opacity-90 rounded-[6vw] placeholder:text-[1vw] placeholder:text-white placeholder:opacity-70"
          type="text"
          placeholder="Amount spent on"
        />
        <button type="submit" className="btnanim2 shadow3 text-white py-[0.8vw] px-[2vw] bg-black rounded-[6vw] font-bold text-[1vw] border-black">
          Add
        </button>
      </div>
    </form>
          
          <div className="scroll flex flex-col w-full  p-[1vw] h-[30vw] bg-black bg-opacity-10 rounded-md overflow-y-scroll overflow-x-hidden">
          <table className="table-fixed border border-gray-400  bg-white">
  <thead className="border border-gray-400">
    <tr>
      <th className="w-[25%]">Time</th>
      <th className="w-[25%]">Spent On</th>
      <th className="w-[30%]">Amount</th>
      <th className="w-[20%]">Edit</th>
    </tr>
  </thead>
  <tbody>
    {list.map((entry, index) => (
      <tr key={index} className="border border-gray-400">
      <td className="text-center text-gray-500">{entry.date}</td>
      <td className="text-center"><span className="text-sm">{entry.spenton}</span></td>
      <td className="text-center"><span className="text-green-500">&#8377; {entry.money}</span></td>
      <td className="text-center flex justify-center gap-3 p-3"><button onClick={(e)=>{handleedit(index)}} className="cursor-pointer text-blue-500"><FaEdit /></button><button onClick={(e)=>{handledelete(index)}} className="cursor-pointer text-red-700"><MdDeleteOutline /></button></td>
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