import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import app from '../../firebase/firebase.config';
import { Link } from 'react-router-dom';

const auth = getAuth(app)


const Login = () => {
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const handleSubmit = (event) => {
        event.preventDefault()
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password)

        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                const loggedUser = result.user;
                setSuccess('user Login successfully')
            })
            .catch(error => {
                setError(error.message)
            })
    }

    return (
        <div className='w-2/3 mx-auto mt-16'>
            <h2 className='text-center text-2xl font-extrabold mb-6'>Please Login</h2>
            <form onSubmit={handleSubmit}>
                <input className='input input-bordered input-success w-full max-w-xs' type="email" name="email" id="email" placeholder='Enter your Email' required />
                <br />
                <input className='input input-bordered input-success w-full max-w-xs mt-3' type="password" name="password" id="password" placeholder='Your Password' required />
                <br />
                <input className="btn btn-primary mt-3" type="submit" value="Register" />

            </form>
            <p className='text-xl text-red-600'>{error}</p>
            <p className='text-xl text-lime-600'>{success}</p>
            <p>New to this website?Please <Link to="/register"  className='text-teal-500'>Register</Link></p>

        </div>
    );
};

export default Login;