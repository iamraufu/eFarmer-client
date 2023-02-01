import React, {
    // useEffect, 
    useState
} from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import OtpInput from 'react18-input-otp';

const Login = () => {

    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => mobileNumberHandler(data);

    const mobileNumberHandler = (number) => {
        console.log(number)
        document.getElementById('phone-container').style.display = 'none';
        document.getElementById('otp-container').style.display = 'block';
    }

    const [otp, setOtp] = useState('');
    // eslint-disable-next-line
    const [seconds, setSeconds] = useState(60);

    const handleChange = (enteredOtp) => {
        setOtp(enteredOtp);
        enteredOtp.length === 4 && navigate('/menu')
        // console.log(enteredOtp);
    };

    // let seconds = 60
    // const makeIteration = () => {
    //     if (seconds > 0) {
    //         setTimeout(makeIteration, 1000);
    //     }
    //     setSeconds(seconds - 1)
    // }

    // useEffect(()=> {
    //     setTimeout(() => {
    //         if (seconds > 0) {
    //             setTimeout(makeIteration, 1000);
    //         }
    //         setSeconds(seconds - 1)
    //     }, 1000);
    // },[makeIteration,seconds])

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
                    <input type="submit" className='btn-login mt-4' value="Login" />
                </form>
            </div>

            <div style={{ display: 'none' }} id='otp-container' className="">

                <h2 className='otp-text text-center'>One Time Password (OTP) sent</h2>
                <div className="d-flex justify-content-center align-items-center mt-5">
                    <OtpInput inputStyle={'input-otp'} className='input-otp d-flex justify-content-center align-items-center mx-3' value={otp} onChange={handleChange} numInputs={4} />
                </div>
                <p className='otp-text text-center mt-3'>Haven’t receive OTP?</p>
                <p className='otp-subtext text-center mt-3'>Resend ( 00:{seconds} )</p>
            </div>
        </section>
    );
};

export default Login;