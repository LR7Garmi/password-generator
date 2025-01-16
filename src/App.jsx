import { useState,useCallback, useEffect,useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  // const [count, setCount] = useState(8)
  const [length,setLength]=useState(8)
  const [numberallowed,setnumberallowed]=useState(false)
  const [charallowed,setcharallowed]=useState(false)
  const [password,setpassword] = useState('')

  const passwordref=useRef(null)

  const generatePassword=useCallback(()=>{

    let pass=""
    let str="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

    if(numberallowed)str+="0123456789"
    if(charallowed)str+="!@#$%^&*()_+=-{}[]|:;<>,.?/~`"

    for(let i=1;i<length;i++){
      const char=Math.floor(Math.random()*str.length+1)
      pass+=str.charAt(char)
    }

    setpassword(pass)

  },[length,numberallowed,charallowed])

  useEffect(()=>{
    generatePassword()
  },[length,numberallowed,charallowed])

  const copythepassword=()=>{
    window.navigator.clipboard.writeText(password)
    // window.alert('Password has been copied')
    passwordref.current.select()
  }

  return (
    <div className="max-w-full h-screen bg-gray-800">
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg py-12 bg-gray-800 text-orange-500">
        <h1 className="text-white text-center my-3">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input type="text" value={password} className='outline-none w-full px-3 py-1' placeholder='Password' readOnly ref={passwordref}/>
          <button onClick={copythepassword} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>Copy</button>
        </div>

        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input type="range" min={8} max={100} value={length} className='cursor-pointer' onChange={(e)=>setLength(e.target.value)} name="" id=""/>
            <label htmlFor="length">Length: {length}</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input type="checkbox" defaultChecked={numberallowed} onChange={()=>{setnumberallowed((prev) =>!prev)}} />
            <label htmlFor="number">Numbers</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input type="checkbox" defaultChecked={charallowed} onChange={()=>{setcharallowed((prev) =>!prev)}} />
            <label htmlFor="character">Character</label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
