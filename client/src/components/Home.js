import React, { useState, useEffect } from 'react'

const Home = () => {
  const [userName, setUserName] = useState('');
  const [show, setShow] = useState(false);


  const userHomePage = async () => {
    try {
      const res = await fetch('/getdata', {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
      });

      const data = await res.json();
      console.log(data);
      setUserName(data.name);
      setShow(true);

    } catch (err) {
      console.log(err);
      

    }
  }

  useEffect (() => {
    userHomePage();
  }, []);

  return (
    <>
    <div className='home-page'>
      <div className='home-div'>
        <p className='pt-5' align="center">WELCOME</p>
        <h1 align="center">{userName}</h1>
        <h2 align="center">{ show ? 'Happy, To See You Back!' : 'TO THE 3W CREATORS LLP'}</h2>

      </div>

    </div>
    </>
  )
}

export default Home
