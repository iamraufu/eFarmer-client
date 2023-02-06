import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from 'react-router-dom';
import OtpInput from 'react18-input-otp';
import Swal from 'sweetalert2';
import useAuth from '../hooks/useAuth';

let otpDescription = {}

const Login = () => {

    let navigate = useNavigate();
    let location = useLocation();
    let from = location.state?.from?.pathname || "/menu";

    const { user, setUser } = useAuth();

    user?.phone && navigate(from, { replace: true })
    const [err, setErr] = useState("")
    const [flag, setFlag] = useState(0)

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => mobileNumberHandler(data.number);

    const mobileNumberHandler = (number) => {
        number.length === 11 ? otpGenerate(number) : setErr("Incorrect Phone Number")
    }

    const otpGenerate = (phone) => {
        setFlag(1)
        document.getElementById('phone-container').style.display = 'none';
        document.getElementById('otp-container').style.display = 'block';
        const OTP = Math.floor(Math.random() * 9000 + 1000);

        const otpDetails = {
            phone,
            otp: OTP.toString()
        }
        otpDescription = otpDetails

        fetch('https://efarmer.herokuapp.com/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(otpDetails)
        })
            .then(response => response.json())
            .then(data => {
                data.status === true ?
                    sendText(otpDetails) :
                    Swal.fire({
                        icon: 'error',
                        title: `${data.otpMessage}`,
                        text: 'Something went wrong!'
                    })
            })
    }

    // sending text
    const sendText = data => {
        setErr("")
        fetch(`https://api.mobireach.com.bd/SendTextMessage?Username=SHWAPNO&Password=Dhaka@1122334456&From=8801847170370&To=${data.phone}&Message=${data.otp} is your login code`)
        setTimeout(() => {
            console.clear();
        }, 1200);
    }

    const [otp, setOtp] = useState('');
    const [seconds, setSeconds] = useState(60);

    useEffect(() => {
        if (flag === 1) {
            if (seconds >= 0) {
                const intervalId = setInterval(() => {
                    setSeconds(formatTime(seconds - 1));
                }, 1000);
                return () => clearInterval(intervalId);
            }
            else {
                setSeconds(formatTime(0))
                setFlag(0)
                document.getElementById('phone-container').style.display = 'block';
                document.getElementById('otp-container').style.display = 'none';
            }
        }
        else {
            setSeconds(60)
        }
    }, [seconds, flag]);

    const formatTime = time => {
        return time < 10 ? (`0${time}`) : time;
    }

    const handleChange = (enteredOtp) => {
        setOtp(enteredOtp);
        enteredOtp.length === 4 && verifyOTP(enteredOtp)
    };

    // function for testing OTP
    const verifyOTP = otp => {
        otpDescription = {
            phone: otpDescription.phone,
            otp: otp
        }
        
        fetch('https://efarmer.herokuapp.com/otp-verification', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(otpDescription)
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === true) {
                    localStorage.setItem('uId', data.user._id)
                    setUser(data.user)
                    navigate('/menu')
                }
                else {
                    Swal.fire({
                        icon: 'error',
                        title: `${data.message}`,
                        text: 'Please try again!'
                    })
                    setOtp('')
                }
                // data.status === true ?
                //         navigate('/menu') :
                //     Swal.fire({
                //         icon: 'error',
                //         title: `${data.message}`,
                //         text: 'Please try again!'
                //     })
            })
    }

    // https://api.mobireach.com.bd/SendTextMessage?Username=SHWAPNO&Password=Dhaka@1122334456&From=8801847170370&To=8801313055087&Message=testmessage

    return (
        <section className='container'>
            <h1 className='title mt-5 text-center'>Enter Mobile Number</h1>

            <div className="d-flex justify-content-center align-items-center mt-5">
                <form id='phone-container' onSubmit={handleSubmit(onSubmit)}>
                    <div className="">
                        <input placeholder='Mobile Number' type='number' className='input-login-number' {...register("number", { required: true })} />
                        <br />
                        {errors.number && <span className='text-danger fw-bold m-1'>Enter Mobile Number</span>}
                    </div>
                    <p className='text-danger fw-bold m-1'>{err}</p>
                    <input type="submit" className='btn-login mt-4' value="Login" />
                </form>
            </div>

            <div style={{ display: 'none' }} id='otp-container' className="">

                <h2 className='otp-text text-center'>One Time Password (OTP) sent</h2>
                <div className="d-flex justify-content-center align-items-center mt-5">
                    <OtpInput inputStyle={'input-otp'} className='input-otp d-flex justify-content-center align-items-center mx-3' value={otp} onChange={handleChange} numInputs={4} isInputNum={true} />
                </div>
                <p className='otp-text text-center mt-3'>Haven’t receive OTP?</p>
                <p className='otp-subtext text-center mt-3'>Resend ( 00:{seconds} )</p>
            </div>
        </section>
    );
};

export default Login;