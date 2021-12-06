import React, { useEffect, useState } from 'react'
import './App.css'
import axios from "axios"
import { Table } from 'reactstrap'
import {Modal,Alert} from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons';



export default function Login(props) {
  const  [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [name, setName] = useState("")
  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [phone, setPhone] = useState("")
  const [switchModal, setSwitchModal] = useState(false)
  const [onAdd, setOnAdd] = useState(false)
  const [driveId, setDriveId] = useState(false)





  const [load, setLoad] = useState(false)
  const [error, setError] = useState(false)
  const [msg, setMsg] = useState("")
  const [company, setCompany] = useState("")
  const [driverData, setDriversData] = useState([])
  const [addDriver, setAddDriver] = useState(false)
  const [onDelete, setOnDelete] = useState(false)
  const [onUpdate, setOnUpdate] = useState(false)



  const [success, setSuccess] = useState('')
const closeDriver = () => {
  setAddDriver(false)
  setPhone('')
  setEmail('')
  setName('')
  setAddress('')
  setCity('')
  setState('')
}

const { confirm } = Modal;

function showConfirm(id) {
  confirm({
    title: 'Are you sure you Want to delete this Driver?',
    icon: <ExclamationCircleOutlined />,
    onOk() {
      delDriver(id)
    },
    onCancel() {
      console.log('Cancel');
    },
  });
}






const addDriverNew = (e) => {
  e.preventDefault()
  setLoad(true)
  const data = {

    "name": name,
    "phone": phone,
    "email": email,
    "address":address,
    "city": city,
    "state": state
  }
  axios
    .post(`https://demodev.remis.ng/Driver/Add/96f583d7-7395-412d-bb7c-5f6747ab479b`, data, {
      headers: {
        Authorization : `Bearer ${sessionStorage.getItem('token')}`
      }
    })
    .then(response => {
      if (response.status === 200) {

          setLoad(false)
          setOnAdd(true)
          setAddDriver(false)
          setTimeout(() => {
            setOnAdd(false)
          },3000)
          getDrivers()
          setSuccess(true)
          setMsg("Driver Addded Successfully")




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

const deleteDriver = (e) => {
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
        var token = response.data.token
        // var decoded = jwt_decode(token)
          setLoad(false)
          sessionStorage.setItem('token', response.data.token)
          // Cookie.set('userInfo', decoded)
          // sessionStorage.setItem('user', decoded.sub)
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

const updateDriverFunc = () => {
  setSwitchModal(true)
  setAddDriver(true)
}

const getDriverDetail = (id) => {
  const driver = driverData.find((v) => v.id === id);
  setPhone(driver.phone)
  setEmail(driver.email)
  setName(driver.name)
  setAddress(driver.address)
  setCity(driver.city)
  setState(driver.state)
  setDriveId(id)
  if(driver){
    setAddDriver(true)
    setSwitchModal(true)
}

}

const updateDriver = (e) => {
  e.preventDefault()
  setLoad(true)
  const data = {

    "name": name,
    "phone": phone,
    "email": email,
    "address":address,
    "city": city,
    "state": state
  }
  axios
    .put(`https://demodev.remis.ng/Driver/Edit/96f583d7-7395-412d-bb7c-5f6747ab479b/${driveId}`, data, {
      headers: {
        Authorization : `Bearer ${sessionStorage.getItem('token')}`
      }
    })
    .then(response => {
      if (response.status === 200) {

          setLoad(false)
          setOnUpdate(true)
          setAddDriver(false)
          setTimeout(() => {
            setOnUpdate(false)
          },3000)
          getDrivers()
          setSuccess(true)
          setMsg("Driver Updated Successfully")




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

const getDrivers = (queryString = '/96f583d7-7395-412d-bb7c-5f6747ab479?Page=1&PageLimit=11&') => {
  axios
    .get(`https://demodev.remis.ng/Drivers?count=false&id=96f583d7-7395-412d-bb7c-5f6747ab479b`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
      }
    })
    .then(res => {
      if (res.data) {
        console.log(res.data.data.drivers)
        // setTotalItems(res.data.totalPages * 10)
        setDriversData(res.data.data.drivers)
      } else {
      }
    })
    .catch(err => {
      if (err) {
      }
    })
}

const delDriver = (id) => {
  axios
    .delete(`https://demodev.remis.ng/Driver/Delete/96f583d7-7395-412d-bb7c-5f6747ab479b/${id}`,{
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
      }
    })
    .then(res => {
      if (res.data) {
        getDrivers()
        setOnDelete(true)
        setTimeout(() => {
          setOnDelete(false)
        },3000)

      } else {
      }
    })
    .catch(err => {
      if (err) {
      }
    })
}



const getCompanies = (queryString = 'pageNumber=1&pageSize=11') => {
  axios
    .get(`https://demodev.remis.ng/Company/Details`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
      }
    })
    .then(res => {
      if (res.data) {
        setCompany(res.data.id)

        // setTotalItems(res.data.totalPages * 10)
        // setDriversData(res.data.records)
      } else {
      }
    })
    .catch(err => {
      if (err) {
      }
    })
}


const addDriverFunc = () => {
  setAddDriver(true)
  setSwitchModal(false)
}



useEffect(() => {
  getDrivers()
  getCompanies()
}, [])



    return (
      <div className="container">
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      {onAdd &&
      <Alert message="New Driver Added Successfully" type="success" className="text-center" />}

      {onDelete &&
      <Alert message="Driver Deleted Successfully" type="error" className="text-center" />}
      {onUpdate &&
      <Alert message="Driver Info Updated Successfully" type="success" className="text-center" />}
      <br />
      <div className="d-flex justify-content-end">
      <button type="button" class="btn btn-info" onClick={addDriverFunc}>Add Driver</button>

      </div>
      <br />
      <Table>
        <thead>
          <tr>
          <th>Company Name</th>

            <th>Driver Name</th>
            <th>Drivers Phone</th>
            <th>Driver Email</th>
            <th>Driver Address</th>
            <th>Driver City</th>

            <th>Driver State</th>
                       <th>Actions</th>
          </tr>
        </thead>
        {driverData ? (
          <tbody>
            {driverData.map(data => {
              return (
                <tr>
                <td>
                {data.companyName}
                </td>
                  <td>
                  {data.name}
                  </td>

                  <td>{data.phone}</td>

                  <td>
                  {data.email}

                  </td>

                  <td>{data.address}</td>
                  <td>{data.city}</td>

                  <td>{data.state}</td>


                    <td>
                    <button type="button" class="btn btn-success" onClick={getDriverDetail.bind(this, data.id)}>Update Driver</button>{" "}
                    <button type="button" class="btn btn-danger" onClick={showConfirm.bind(this, data.id)}>Delete Driver</button>


                    </td>

                </tr>
              )
            })}
          </tbody>
        ) : (
          <div className='text-center'>
            <p className='d-flex justify-content-center py-5'>
              Drivers Not Available{' '}
            </p>
          </div>
        )}
      </Table>
      <Modal
        title={switchModal ? "Update Driver" : "Add Driver" }
        visible={addDriver}
        footer={null}
        onCancel={closeDriver}
        maskClosable={false}
      >
      <form>
      {!switchModal ?
      <>
      <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label">Name</label>
      <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e) => setName(e.target.value)} value={name} />
      </div>
      <div class="mb-3">
      <label for="exampleInputPassword1" class="form-label">Phone</label>
      <input type="text" class="form-control" id="exampleInputPassword1" onChange={(e) => setPhone(e.target.value)} value={phone}  />
      </div>
      <div class="mb-3">
      <label for="exampleInputPassword1" class="form-label">Email</label>
      <input type="text" class="form-control" id="exampleInputPassword1" onChange={(e) => setEmail(e.target.value)} value={email}  />
      </div>
      <div class="mb-3">
      <label for="exampleInputPassword1" class="form-label">Address</label>
      <input type="text" class="form-control" id="exampleInputPassword1" onChange={(e) => setAddress(e.target.value)} value={address}  />
      </div>
      <div class="mb-3">
      <label for="exampleInputPassword1" class="form-label">City</label>
      <input type="text" class="form-control" id="exampleInputPassword1" onChange={(e) => setCity(e.target.value)} value={city}  />
      </div>
      <div class="mb-3">
      <label for="exampleInputPassword1" class="form-label">state</label>
      <input type="text" class="form-control" id="exampleInputPassword1" onChange={(e) => setState(e.target.value)} value={state}  />
      </div>
  </> :
  <>
<div class="mb-3">
<label for="exampleInputEmail1" class="form-label">Name</label>
<input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e) => setName(e.target.value)} value={name} />
</div>
<div class="mb-3">
<label for="exampleInputPassword1" class="form-label">Phone</label>
<input type="text" class="form-control" id="exampleInputPassword1" onChange={(e) => setPhone(e.target.value)} value={phone}  />
</div>
<div class="mb-3">
<label for="exampleInputPassword1" class="form-label">Email</label>
<input type="text" class="form-control" id="exampleInputPassword1" onChange={(e) => setEmail(e.target.value)} value={email}  />
</div>
<div class="mb-3">
<label for="exampleInputPassword1" class="form-label">Address</label>
<input type="text" class="form-control" id="exampleInputPassword1" onChange={(e) => setAddress(e.target.value)} value={address}  />
</div>
<div class="mb-3">
<label for="exampleInputPassword1" class="form-label">City</label>
<input type="text" class="form-control" id="exampleInputPassword1" onChange={(e) => setCity(e.target.value)} value={city}  />
</div>
<div class="mb-3">
<label for="exampleInputPassword1" class="form-label">state</label>
<input type="text" class="form-control" id="exampleInputPassword1" onChange={(e) => setState(e.target.value)} value={state}  />
</div>
</>}
<div className="d-flex justify-content-end">
<button type="submit" class="btn btn-info" onClick={switchModal ? updateDriver : addDriverNew}>{load ? (
  <div
    class='spinner-border'
    role='status'
    style={{ width: '1rem', height: '1rem' }}
  >
    <span class='sr-only'>Loading...</span>
  </div>
) : (
  'Submit'
)}</button>
</div>

</form>
      </Modal>
      </div>
    )
}
