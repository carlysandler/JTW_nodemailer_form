import React, { useState} from 'react'
import './Home.css'
import {connect} from 'react-redux'
import axios from 'axios';
import {toast} from 'react-toastify';
// import gif from '../assets/load2.gif';
// import back from '../assets/back.jpg'

/**
 * COMPONENT
 */

export const Home = props => {
  const {username} = props
  console.log(props)

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [banner, setBanner] = useState('');
  const [bool, setBool] = useState(false);

  // handle inputs
  const handleName = (evt) => {
    setName(evt.target.value)
  }

  const handleEmail = (evt) => {
    setEmail(evt.target.value)

  }

  const handleMessage = (evt) => {
    setMessage(evt.target.value)

  }


  const formSubmit= async (evt) => {
    evt.preventDefault();

    try {

      let data = {
        name,
        email,
        message
      }

      setBool(true);

      const res = await axios.post(`/contact`, data);

      if(name.length===0 || email.length===0 || message.length===0){

        setBanner(res.data.msg);
        toast.error(res.data.msg);
        setBool(false);

      }


      else if(res.status===200){
        setBanner(res.data.msg);
        toast.success(res.data.msg);
        setBool(false);


        setName('');
        setEmail('');
        setMessage('')

      }

    } catch (err) {
      console.log(err);
    }



  }

  return (
    <div className="main-cointer">
      <img src={"images/logo192.jpg"} />
      <div className="central-form">
        <h2 className="title">Contact form</h2>
        <div className="back-form">
          <div className="img-back">
            <h3>Welcome, {username}</h3>

            <h4>Send your message</h4>
            <img src={"images/back.jpg"} alt=""/>
          </div>
          <form onSubmit={formSubmit} >
            <p>{banner}</p>

            <label htmlFor="name">Name</label>
            <input type="text"
              onChange={handleName}
              value={name}
              placeholder="your name here..."
            />

            <label htmlFor="email">Email</label>
            <input type="email"
              onChange={handleEmail}
              value={email}
              placeholder="your email here..."
            />

            <label htmlFor="message">Message</label>
            <textarea
              type="text"
              onChange={handleMessage}
              value={message}
              placeholder="your message here..."
              name="message"
            />

            <div className="send-btn">
              <button type="submit">Send <i className="fas fa-paper-plane"></i>
                {bool? <b className="load"><img src={'images/load2.gif'} alt="loading..."/></b>:''}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

/**
 * CONTAINER
 */

const mapState = state => {
  return {
    username: state.auth.username
  }
}

export default connect(mapState)(Home)
