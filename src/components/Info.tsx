import axios from "axios";
import { useEffect, useState } from "react"

export default function Info() {
  const [countries, setCountries] = useState<Array<any>>([]);
  const [data, setData] = useState({
    name: "",
    country: "",
    city: "",
    adress: "",
    email: "",
    phone: ""
  });
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get('email');
  

  useEffect(()=>{
    const getCountries = async() =>{
      const res = await axios.get('https://restcountries.com/v3.1/all')
      setCountries(res.data); 
    }
  
    getCountries(); 
  }, [])

  const sendEmail = () =>{
    console.log(data);
    axios.post(`${import.meta.env.VITE_URL_API}send-email`,{
      emailto: email,
      emailfrom: data.email,
      info: data
    }).then((res)=>{
      console.log(res.data)
      setData((prev)=>({
        ...prev,
        name: "",
        email: "",
        country: "Country",
        city: "",
        adress: "",
        phone: ""
      }))
    }
    )
  }

  return (
    <div className='px-72 py-32'>
      <form action="" className="flex flex-col gap-10" onSubmit={(e)=>{e.preventDefault(), sendEmail()}}>
        <input type="text" className='bg-gray-600 w-[80%] rounded-md border-b-[1.5px] border-yellow-500 p-3 text-white' placeholder='Full Name' onChange={(e)=>{setData((prev)=>({...prev, name: e.target.value}))}} value={data.name} required />
        <select onChange={(e)=>{setData((prev)=>({...prev, country: e.target.value}))}} className='bg-gray-600 w-[80%] rounded-md border-b-[1.5px] border-yellow-500 p-3 text-white' required>
          <option>Country</option>
          {
            countries && countries.map((e)=>(
              <option value={e.name.common}>{e.name.common}</option>
            ))
          }
        </select>
        <input type="text" className='bg-gray-600 w-[80%] rounded-md border-b-[1.5px] border-yellow-500 p-3 text-white' placeholder='City' onChange={(e)=>{setData((prev)=>({...prev, city: e.target.value}))}} value={data.city}  required />
        <input type="text" className='bg-gray-600 w-[80%] rounded-md border-b-[1.5px] border-yellow-500 p-3 text-white' placeholder='Adress include(neighborhood)' onChange={(e)=>{setData((prev)=>({...prev, adress: e.target.value}))}} value={data.adress} required />
        <input type="email" className='bg-gray-600 w-[80%] rounded-md border-b-[1.5px] border-yellow-500 p-3 text-white' placeholder='Email' onChange={(e)=>{setData((prev)=>({...prev, email: e.target.value}))}} value={data.email} required />
        <input type="tel" className='bg-gray-600 w-[80%] rounded-md border-b-[1.5px] border-yellow-500 p-3 text-white' placeholder='Cell Phone' onChange={(e)=>{setData((prev)=>({...prev, phone: e.target.value}))}} value={data.phone} required />
        <button className="bg-gray-600 font-semibold w-[80%] rounded-lg border-[1.5px] border-yellow-500 p-3 text-white">Submit</button>
      </form>
    </div>
  )
}
