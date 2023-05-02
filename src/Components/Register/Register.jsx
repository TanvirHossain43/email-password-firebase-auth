import React, { useState } from 'react';
import app from '../../firebase/firebase.config';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification } from "firebase/auth";
import { Link } from 'react-router-dom';

const auth = getAuth(app)

const Register = () => {
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault();
        setSuccess('')
        setError('')
        const email = event.target.email.value;
        const password = event.target.password.value;
        console.log(email, password)
        //validate
        if (!/(?=.*[A-Z])/.test(password)) {
            setError('please add at least one uppercase')
            return;
        }
        else if (!/(?=[^0-9\n]*[0-9])/.test(password)) {
            setError('Please add at least two numbers')
            return;
        }
        else if (password.length < 6) {
            setError('please add at least 6 character')
            return;
        }

        // create user in firebase
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                // for successfully login
                setError('')
                event.target.reset()
                setSuccess('User has registered successfully')
                sendEmailVerification(loggedUser)

            })
            .catch(error => {
                console.error(error.message)
                setError(error.message)

            })
    }

    const sendVerificationEmail = (loggedUser) =>{
        sendEmailVerification(loggedUser)
        .then(result =>{
            console.log(result)
            alert('Please verify your email')
        })
        .catch(error =>{
            console.log(error)
        })
    }

    const handleEmailChange = (event) => {
        // console.log(event.target.value)
        setEmail(event.target.value)
    }
    const handlePasswordBlur = (event) => {
        // console.log(event.target.value)
    }

    return (
        <div className='w-2/3 mx-auto mt-16'>
            <h2 className='text-center text-2xl font-extrabold mb-6'>Please Register</h2>
            <form onSubmit={handleSubmit}>
                <input onChange={handleEmailChange} className='input input-bordered input-success w-full max-w-xs' type="email" name="email" id="email" placeholder='Enter your Email' required />
                <br />
                <input onBlur={handlePasswordBlur} className='input input-bordered input-success w-full max-w-xs mt-3' type="password" name="password" id="password" placeholder='Your Password' required />
                <br />
                <input className="btn btn-primary mt-3" type="submit" value="Register" />

            </form>
            <p className='text-gray-950'>{error}</p>
            <p>{success}</p>
            <p>Already registered?Please <Link to ="/login" className='text-teal-500'>Login</Link></p> 
        </div>
    );
};

export default Register;
