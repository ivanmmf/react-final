import { useRef, useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import axios from '../api/axios';
const LOGIN_URL = '/api/v3/auth/myroles';

const Login = () => {
    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.get('http://localhost:8080/api/v3/auth/myroles', {
                // Axios looks for the `auth` option, and, if it is set, formats a
                // basic auth header for you automatically.
                auth: {
                    username: user,
                    password: pwd
                }
            }
            );

            console.log(JSON.stringify(response?.data));
            //console.log(JSON.stringify(response));
            //const accessToken = response?.data?.accessToken;
            const roles = response?.data.map(role => role.authority);

            sessionStorage.setItem('user', user);
            sessionStorage.setItem('pwd', pwd);
            sessionStorage.setItem('roles', roles);

            //setAuth({ user, pwd, roles, accessToken });
            setUser('');
            setPwd('');
            if (roles.includes('ROLE_admin')){
                navigate('/')
            }
            else navigate('/user');
            //navigate(from, { replace: true });
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }

          return (

              <section>
                  <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                  <h1>Sign In</h1>
                  <form onSubmit={handleSubmit}>
                      <label htmlFor="username">Username:</label>
                      <input
                          type="text"
                          id="username"
                          ref={userRef}
                          autoComplete="off"
                          onChange={(e) => setUser(e.target.value)}
                          value={user}
                          required
                      />

                      <label htmlFor="password">Password:</label>
                      <input
                          type="password"
                          id="password"
                          onChange={(e) => setPwd(e.target.value)}
                          value={pwd}
                          required
                      />
                      <button>Sign In</button>
                  </form>
                  <p>
                      Need an Account?<br />
                      <span className="line">
                    <Link to="/register">Sign Up</Link>
                </span>
                  </p>
              </section>

          )
}
export default Login;
