import { useState, useCallback, useEffect,useRef } from "react"


function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  
  // useRef hook
  const copyPassword=useRef(null)

  const passwordGenerate = useCallback(() => {
    let pass = '';
    let str = 'QWERTYUIOPLKJHGFDSAZXCVBNMqwertyuioplkjhgfdsaazxcvbnm'
    if (numberAllowed) str += '0123456789';
    if (charAllowed) str += '~!@#$%^&*()_+=-}{[]|":<>?/.,;';
    for (let i = 0; i <=length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);


    }
    setPassword(pass)
  }, [length, numberAllowed, charAllowed, setPassword])
  
  const copyPasswordtoClipboard=useCallback(()=>{
    copyPassword.current?.select();
    copyPassword.current?.setSelectionRange(0,100);
    window.navigator.clipboard.writeText(password)
  },[password])
  useEffect(()=>{
     passwordGenerate()
  },[length,numberAllowed,charAllowed,passwordGenerate])

  return (
    <>


      <div className="w-full max-w-md mx-auto shadow-md bg-gray-600 rounded-lg px-4 py-3 my-8" >
        <h1 class="text-4xl text-center font-bold  text-white ">
          Password Generator
        </h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4 mx-3">

          <input type='text'
            value={password}
            className="outline-none bg-white w-full py-1 px-3 text-black"
            placeholder="Password"
            readOnly 
            min={0}
            max={100}
            ref={copyPassword}/>
          <button className="bg-blue-700 w-1/4 text-xl outline-none" onClick={copyPasswordtoClipboard}>Copy</button>
        </div>0
        <div className="flex items-center text-sm justify-around shadow rounded-lg overflow-hidden mb-4 mx-3 gap-4">
          <div className="flex gap-2 items-center justify-center">

          <input type="range" value={length} onChange={(e)=>setLength(e.target.value)} name="length" className="cursor-pointer" id="" />
          <label>Length: {length}</label>
          </div>
          <div className="flex gap-2 items-center justify-center">

            <input type="checkbox" value={numberAllowed} name="numberAllowed" onChange={()=>setNumberAllowed((prev)=>!prev)} className="cursor-pointer" />
            <label>Number</label>
          </div>
          <div className="flex gap-2 items-center justify-center">
            <input type="checkbox" value={charAllowed} name="charAllowed" onChange={()=>setCharAllowed((prev)=>!prev)} className="cursor-pointer" />
            <label>Character</label>
          </div>

        </div>
      </div>
    </>
  )
}

export default App
