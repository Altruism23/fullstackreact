import axios from "axios";
import { useState } from "react";


export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const register = async (ev) => {
    ev.preventDefault()
    try {
      const {data} = await axios.post("/register", {email, password})
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="flex justify-center items-center h-screen w-full">
      <div className="flex flex-col shadow-2xl p-32 gap-4 bg-teal-300">
        <p className="flex justify-center text-xl text-blue-700">Register</p>
        <form onSubmit={register}>
          <div className="flex flex-col gap-2">
            <p className="text-blue-700 text-[18px]">Email</p>
            <input
              type="text"
              placeholder="Your email"
              className="border rounded-lg"
              value={email}
              onChange={ev => setEmail(ev.target.value)}
            />
            <p className="text-blue-700 text-[18px]">Password</p>
            <input
              type="password"
              placeholder="Your password"
              className="border rounded-lg"
              value={password}
              onChange={ev => setPassword(ev.target.value)}
            />
            <button className="border bg-blue-600 rounded-lg" type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}
