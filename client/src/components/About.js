import React, { useEffect, useState } from 'react'
import demo from "../images/demo.jpg";
import aboutpic from "../images/aboutpic.jpg";
import { useNavigate } from "react-router-dom";

const About = () => {

  let navigate = useNavigate();
  const [userData, setUserData] = useState(0);


  const callAboutPage = async () => {
    try {
      const res = await fetch('/about', {
        method: "GET",
        headers: {
          Accept:"application/json",
          "Content-Type": "application/json"
        },
        credentials:"include"

      });

      const data = await res.json();
      console.log(data);
      setUserData(data);

      if(!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }

    } catch (err) {
      console.log(err);
      navigate("/login");
      //navigate.push('/login');

    }
  }

  useEffect (() => {
    callAboutPage();
  }, 
  );


  return (
    <>
    <div className='container emp-profile'>
      <form method='GET'>
        <div className='row'>
          <div className='col-md-4'>
            <div className='profile-img'>
            <img src={userData.name === "DEVANSHI SHAH" ? demo : aboutpic } alt="demo" height='120 px' width='100 px'/>
            </div>
            
          </div>

          <div className='col-md-6'>
            <div className='profile-head'>
              <h5>{ userData.name }</h5>
              <h6>{ userData.work }</h6>
              <p className='profile-rating mt-3 mb-5'>Rankings : <span> 1/10 </span> </p>

              <ul className="nav nav-tabs" id='myTab' role="tablist">
                <li className="nav-item">
                  <a className="nav-link active" id='home-tab' data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">About</a>
                </li>
                <li className="nav-item">
                <a className="nav-link active" id='profile-tab' data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Timeline</a>
                </li>  
              </ul>
            </div>
          </div>
          <div className='col-md-2'>
            <input type='submit' className='profile-edit-btn' name='btnAddMore' value='Edit Profile'/>
          </div>
        </div>

        <div className='row'>
          {/* left side url */}
          <div className='col-md-4'>
            <div className='profile-work'>
              <p>WORK LINK</p>
              <a href="https://www.youtube.com/@DSChoreography" target="_demo">YouTube</a> <br />
              <a href="https://www.youtube.com/@DSChoreography" target="_demo">Instagram</a> <br />
              <a href="https://www.youtube.com/@DSChoreography" target="_demo">Demo</a> <br />
              <a href="https://www.youtube.com/@DSChoreography" target="_demo">GitHub</a> <br />
              <a href="https://www.youtube.com/@DSChoreography" target="_demo">Web Developer</a> <br />
              <a href="https://www.youtube.com/@DSChoreography" target="_demo">Figma</a> <br />
              <a href="https://www.youtube.com/@DSChoreography" target="_demo">Software Tester</a> <br />
            </div>
          </div>
          {/* right side data toogle */}
          <div className='col-md-8 pl-5 about-info'>
            <div className='tab-content profile-tab' id='myTabContent'>
              <div className='tab-pane fade show active' id='home' role='tabpanel' aria-labelledby='home-tab'>
                <div className='row'>
                  <div className='col-md-6'>
                    <label>User ID</label>
                  </div>
                  <div className='col-md-6'>
                    <p>789451230</p>
                  </div>
                </div>

                <div className='row mt-3'>
                  <div className='col-md-6'>
                    <label>Name</label>
                  </div>
                  <div className='col-md-6'>
                    <p>{ userData.name }</p>
                  </div>
                </div>

                <div className='row mt-3'>
                  <div className='col-md-6'>
                    <label>Email</label>
                  </div>
                  <div className='col-md-6'>
                    <p>{ userData.email }</p>
                  </div>
                </div>

                <div className='row mt-3'>
                  <div className='col-md-6'>
                    <label>Phone</label>
                  </div>
                  <div className='col-md-6'>
                    <p>{ userData.phone }</p>
                  </div>
                </div>

                <div className='row mt-3'>
                  <div className='col-md-6'>
                    <label>Profession</label>
                  </div>
                  <div className='col-md-6'>
                    <p>{ userData.work }</p>
                  </div>
                </div>
              </div>

              <div className='tab-pane fade show' id='profile' role='tabpanel' aria-labelledby='profile-tab'>
                <div className='row'>
                  <div className='col-md-6'>
                    <label>Experience</label>
                  </div>
                  <div className='col-md-6'>
                    <p>Fresher</p>
                  </div>
                </div>

                <div className='row mt-3'>
                  <div className='col-md-6'>
                    <label>Hourly Rate</label>
                  </div>
                  <div className='col-md-6'>
                    <p>10$/hr</p>
                  </div>
                </div>

                <div className='row mt-3'>
                  <div className='col-md-6'>
                    <label>Total Projects</label>
                  </div>
                  <div className='col-md-6'>
                    <p>10</p>
                  </div>
                </div>

                <div className='row mt-3'>
                  <div className='col-md-6'>
                    <label>English Level</label>
                  </div>
                  <div className='col-md-6'>
                    <p>Expert</p>
                  </div>
                </div>

                <div className='row mt-3'>
                  <div className='col-md-6'>
                    <label>Availability</label>
                  </div>
                  <div className='col-md-6'>
                    <p>3 Months</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

      </form>
    </div>
    </>
  )
}

export default About
