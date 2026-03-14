import { useState } from 'react' // 'use' hata diya
import './App.css'

function App() {
  let [formdata, setFormData] = useState({
    username: '',
    phone: '',
    email: '',
    message: '',
    index: ''
  })
  
  let [userdata, setuserdata] = useState([])

  let getvalue = (event) => {
    let inputname = event.target.name
    let inputValue = event.target.value
    setFormData({ ...formdata, [inputname]: inputValue })
  }

  // Edit Function FIX
  let editrow = (index) => {
    let editData = userdata[index]; // 'indexNumber' ko 'index' kiya
    setFormData({
      username: editData.username,
      phone: editData.phone,
      email: editData.email,
      message: editData.message,
      index: index // Taaki pata chale kaunsi row edit ho rahi hai
    });
  }

  let deleterow = (index) => {
    let filterdataafterdelete = userdata.filter((v, i) => i != index)
    setuserdata(filterdataafterdelete)
  }

  let handlesubmit = (event) => {
    event.preventDefault();
    
    let currentuserdata = {
      username: formdata.username,
      phone: formdata.phone,
      email: formdata.email,
      message: formdata.message
    }

    if (formdata.index !== '') {
      // UPDATE LOGIC
      let tempUserData = [...userdata];
      tempUserData[formdata.index] = currentuserdata;
      setuserdata(tempUserData);
    } else {
      // INSERT LOGIC
      let filteruserdata = userdata.filter((v) => v.email == formdata.email || v.phone == formdata.phone)
      if (filteruserdata.length >= 1) {
        alert('Email or phone already used!')
        return
      }
      setuserdata([...userdata, currentuserdata])
    }

    // Form Reset (Update aur Submit dono ke baad chalna chahiye)
    setFormData({
      username: '',
      phone: '',
      email: '',
      message: '',
      index: ''
    });
  }

  return (
    <div className='container'>
      <form onSubmit={handlesubmit} className='left-container'>
        <label>Name</label>
        <input type="text" onChange={getvalue} value={formdata.username} name='username' required />
        <label>Phone</label>
        <input type="text" onChange={getvalue} value={formdata.phone} name='phone' required />
        <label>Email</label>
        <input type="text" onChange={getvalue} value={formdata.email} name='email' required />
        <label>Message</label>
        <input type="text" onChange={getvalue} value={formdata.message} name='message' required />
        
        <button type="submit">{formdata.index !== '' ? "Update" : "Submit"}</button>
      </form>

      <div className='right-container'>
        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Username</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Message</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className='tabledata'>
            {userdata.length >= 1 ? (
              userdata.map((v, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{v.username}</td>
                  <td>{v.phone}</td>
                  <td>{v.email}</td>
                  <td>{v.message}</td>
                  <td>
                    {/* onClick sahi kiya */}
                    <button type="button" onClick={() => editrow(i)}>edit</button>
                    <button type="button" onClick={() => deleterow(i)}>del</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6}>No data found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default App