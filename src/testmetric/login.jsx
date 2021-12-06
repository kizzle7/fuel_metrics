import React, { useEffect, useState } from 'react'
import './App.css'
import axios from "axios"

export default function Login(props) {
  const  [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [load, setLoad] = useState(false)
  const [error, setError] = useState(false)
  const [msg, setMsg] = useState("")



const Login = (e) => {
  e.preventDefault()
  setLoad(true)
  const data = {
  "email": email,
  "password": password
  }
  axios
    .post(`https://demodev.remis.ng/login`, data)
    .then(response => {
      if (response.status === 200) {
        console.log(response)
        var token = response.data.token
          setLoad(false)
          sessionStorage.setItem('token', response.data.token)
          // Cookie.set('userInfo', decoded)
          window.location.href = '/drivers'



      }
    })
    .catch(err => {
      setLoad(false)
      if (err.response !== undefined) {
        setMsg(err.response.data.message)
        setError(true)
      }

      else {
        setMsg('Connection Error')

        setError(true)
      }
    })

}

    return (
      <div className="col-md-6 offset-3">
      <br />
      <br />
      <br />
      <br />
      <form>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Email address</label>
    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e) => setEmail(e.target.value)} />
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Password</label>
    <input type="password" class="form-control" id="exampleInputPassword1" onChange={(e) => setPassword(e.target.value)}  />
  </div>

  <button type="submit" class="btn btn-primary" onClick={Login}>{load ? (
    <div
      class='spinner-border'
      role='status'
      style={{ width: '1rem', height: '1rem' }}
    >
      <span class='sr-only'>Loading...</span>
    </div>
  ) : (
    'Login'
  )}</button>
</form>
      </div>
    )
}
