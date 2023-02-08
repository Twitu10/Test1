import React, {useState} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Login = () => {

  let navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = async (e) => {
    e.preventDefault();

    const res = await fetch('/login', {
      method:"POST",
      headers:{
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({
        email,
        password
      })
    });
    
    const data = res.json();

    if (res.status === 400 || !data) {
      window.alert("Invalid Credentials");
    } else {
      window.alert("Login Successful");
      navigate("/");

    }
  }

  return (
    <>
      <section className='login'>
        <div className='container mt-5'>
            <div className='login-content'>

            </div> 
                    <div className='login'>
                   <NavLink to='/signup' className='login-link'>Create an Account</NavLink>
                   </div>

                <div className='login-form'>
                    <h2 className='form-title'>Login</h2>
                    <form method="POST" className='register-form' id='register-form'>
                   
                <div className='form-group'>
                    <label htmlFor='email'>
                    <i class="zmdi zmdi-email material-icon-name"></i>
                    </label>
                    <input type="text" name="email" id="email" autoComplete='off'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} 
                        placeholder='Your Email'
                    />
                </div> 

                <div className='form-group'>
                    <label htmlFor='password'>
                    <i class="zmdi zmdi-lock material-icon-name"></i>
                    </label>
                    <input type="password" name="password" id="password" autoComplete='off'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} 
                        placeholder='Your Password'
                    />
                  </div>

                <div className='form-group form-button'>
                  <input type="submit" name="login" id="login" className="form-submit"
                  value="Log In"
                  onClick={loginUser}
                  />
                </div>
                    </form>
            </div>
        </div>
     </section>
    </>
  )
}

export default Login
