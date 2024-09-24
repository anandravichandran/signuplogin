"use client"; // Add this line at the top

import React, { useState } from 'react';
import { Spotlight } from "../login/ui/Spotlight";
import MagicButton from "../login/ui/MagicButton";
import { FaLocationArrow } from "react-icons/fa6";
import Link from 'next/link';
import { Button } from "../login/ui/MovingBorder";

const Hero = () => {
  // State to store OTP digits
  const [otp, setOtp] = useState(new Array(4).fill(""));
  // State to track the currently active input
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  // State to track filled status of inputs
  const [filled, setFilled] = useState(new Array(4).fill(false));

  // Handle OTP input
  const handleOtpChange = (element: HTMLInputElement, index: number) => { const value = element.value;
    if (isNaN(Number(value))) return;

    // Update OTP state

    // setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Update filled status
    // setFilled([...filled.map((status, idx) => (idx === index ? element.value.length > 0 : status))]);
    const newFilled = [...filled];
  newFilled[index] = value.length > 0;
  setFilled(newFilled);

    // Focus on the next input

  //   if (element.nextSibling && element.value) {
  //     (element.nextSibling as HTMLInputElement).focus();
  //   }
  // };

  if (value && index < otp.length - 1) {
    const nextInput = element.nextElementSibling as HTMLInputElement;
    if (nextInput) {
      nextInput.focus();
    }
  }

    // Handle deletion (backspace)
    if (!value && index > 0) {
      const prevInput = element.previousElementSibling as HTMLInputElement;
      if (prevInput) {
        prevInput.focus();
      }
    }
  };
  // Handle input focus
  const handleFocus = (index: number) => {
    setActiveIndex(index);
  };

  // Handle input blur
  const handleBlur = (index: number) => {
    setActiveIndex(null);
  };

  return (
    <div className="h-screen w-screen overflow-hidden relative">
      <div>
        <Spotlight className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen" fill="white" />
        <Spotlight className="top-20 left-full h-[70vh] w-[100vw]" fill="purple" />
        <Spotlight className="top-28 left-80 h-[80vh] w-[50vw]" fill="blue" />
      </div>

      <div className="h-screen w-full dark:bg-black-100 bg-white dark:bg-grid-white/[0.1] bg-grid-black/[0.1] relative flex items-center justify-center">
        {/* Radial gradient for the container to give a faded look */}
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black-100 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      </div>
      <div className="h-screen w-full dark:bg-black-100 bg-white dark:bg-grid-white/[0.04] bg-grid-black/[0.2] flex items-center justify-center absolute top-0 left-0">
        {/* OTP Input Section */}

{/* ===============logo section */}
<div>
            {/* Logo */}
            <img src="/Webfoxshield.png" alt="Logo" className="fixed top-0 left-3 h-40 z-[900]" />

            {/* Register Button */}
            {/* <div className="fixed top-10 right-10 flex space-x-4 z-[5000]">
              <Link href="/login">
                <Button className="border text-sm font-medium border-neutral-200 dark:border-white/[0.2] text-black dark:text-white px-4 py-3 rounded-full">
                  Signin
                </Button>
              </Link>
            </div> */}
          </div>

        <div className="bg-white-100 rounded-2xl shadow-black-100 shadow-2xl flex w-2/3 max-w-4xl">
          {/* Sign Section */}
          <div className="w-3/5 p-5">
            <div className="text-left font-bold">
              <span className="text-blue-950">Company</span>Name
            </div>
            <div className="py-10">
              <h2 className="text-3xl font-bold text-blue-950 mb-2">User Verification</h2>
              <div className="border-2 w-10 border-pink-900 inline-block mb-2"></div>

              {/* Text */}
              <p className="text-gray-950 text-xl text-center mb-5">Enter your OTP Number</p>

              <div className="relative rounded-lg max-w-lg m-auto">
                {/* OTP Input Boxes */}
                <div className="flex justify-center space-x-3 mb-5">
                  {otp.map((data, index) => (
                    <input
                      key={index}
                      type="text" // Changed from number to text
                      name="otp"
                      maxLength={1} // Ensure only one digit can be entered
                      // className={`w-14 h-14 text-center text-lg rounded-lg border transition-all ${
                      //   filled[index]
                      //     ? "border-blue-500 bg-black-200 shadow-[0_0_10px_0_rgba(59,130,246,0.7) "
                      //     : "border-blue-950"
                      // } focus:ring-2 focus:ring-violet-800 focus:outline-none`}
                      className={`w-14 h-14 text-center text-lg rounded-lg border transition-all ${
                        filled[index]
                          ? "border-blue-500 bg-black-200  outline-purple-500 outline-2" 
                          : "border-blue-950"
                      } focus:ring-2 focus:ring-violet-800 focus:outline-none`}
                      
                      value={data}
                      onChange={(e) => handleOtpChange(e.target, index)}
                      onFocus={() => handleFocus(index)}
                      onBlur={() => handleBlur(index)}
                    />
                  ))}
                </div>

                {/* Verify Button */}
                <div className="flex justify-center items-center">
                  <Link href="/login">
                  <button className="bg-orange-500 text-white font-semibold text-xl py-2 px-11 rounded-lg shadow-md mt-4">
                    Verify
                  </button>

                  </Link>
                  
                </div>
              </div>
            </div>
          </div>

          {/* SignUp Section */}
          <div className="w-3/5 rounded-tl-[10rem] rounded-bl-[10rem] bg-violet-600 text-white rounded-tr-2xl rounded-br-2xl py-36 px-12">
            <h1 className="text-center text-3xl font-bold mb-2">Hello, Friend!</h1>
            <div className="border-2 w-10 border-pink-900 inline-block mb-2"></div>
            <p className="mb-5 text-center">Fill up personal information and start your journey with us</p>
            {/* Sign In Button */}
            <div className="flex justify-center items-center">
              <a href="login">
                <MagicButton
                  title="Sign In"
                  icon={<FaLocationArrow />}
                  position="left"
                />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center relative my-20 z-10">
        <div className='max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center'></div>
      </div>
    </div>
  );
};

export default Hero;


// "use client"; // Add this line at the top

// import React, { useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { Spotlight } from "../login/ui/Spotlight";
// import MagicButton from "../login/ui/MagicButton";
// import { FaLocationArrow } from "react-icons/fa6";
// import Link from 'next/link';
// import { useRouter } from 'next/router';


// // Update Params to use an index signature
// interface Params {
//     email?: string; // Optional, since it might be undefined
// }


// const OtpVerification: React.FC = () => {
//     const router = useRouter();
//     const { email } = router.query; // Access the email parameter from the query
//     const [formData, setFormData] = useState<{ otp: string }>({ otp: '' });
//     const [loading, setLoading] = useState(false);
//     const [message, setMessage] = useState<string | null>(null);

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };

//     const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         console.log(email, formData.otp);
//         try {
//             const response = await fetch('http://localhost:5000/verify_otp', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ email, otp: formData.otp }),
//             });

//             if (!response.ok) {
//                 const { message } = await response.json();
//                 throw new Error(message || 'Invalid OTP');
//             }

//             setFormData({ otp: '' });
//             console.log('Verification successful');
//             router.push('/');
//         } catch (error) {
//             console.error(error);
//             setMessage(error instanceof Error ? error.message : 'An error occurred');
//         }
//     };

//     const handleResendOTP = async (event: React.MouseEvent<HTMLButtonElement>) => {
//         event.preventDefault();
//         setLoading(true);
//         setMessage(null); // Clear any previous messages

//         try {
//             const response = await fetch('http://localhost:5000/resend_otp', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ email }),
//             });

//             if (!response.ok) {
//                 const { message } = await response.json();
//                 throw new Error(message || 'Failed to resend OTP');
//             }

//             setMessage('OTP resent successfully!');
//         } catch (error) {
//             console.error(error);
//             setMessage(error instanceof Error ? error.message : 'An error occurred');
//         } finally {
//             setLoading(false);
//         }
//     };


//     return (
//         <div className="h-screen w-screen overflow-hidden relative">
//             <div>
//                 <Spotlight className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen" fill="white" />
//                 <Spotlight className="top-20 left-full h-[70vh] w-[100vw]" fill="purple" />
//                 <Spotlight className="top-28 left-80 h-[80vh] w-[50vw]" fill="blue" />
//             </div>

//             <div className="h-screen w-full dark:bg-black-100 bg-white dark:bg-grid-white/[0.1] bg-grid-black/[0.1] relative flex items-center justify-center">
//                 <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black-100 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
//             </div>

//             <div className="h-screen w-full dark:bg-black-100 bg-white dark:bg-grid-white/[0.04] bg-grid-black/[0.2] flex items-center justify-center absolute top-0 left-0">
//                 <div>
//                     {/* Logo */}
//                     <img src="/Webfoxshield.png" alt="Logo" className="fixed top-0 left-3 h-40 z-[900]" />
//                 </div>

//                 <div className="bg-white-100 rounded-2xl shadow-black-100 shadow-2xl flex w-2/3 max-w-4xl">
//                     {/* Sign Section */}
//                     <div className="w-3/5 p-5">
//                         <div className="text-left font-bold">
//                             <span className="text-blue-950">Company</span>Name
//                         </div>
//                         <div className="py-10">
//                             <h2 className="text-3xl font-bold text-blue-950 mb-2">User Verification</h2>
//                             <div className="border-2 w-10 border-pink-900 inline-block mb-2"></div>

//                             {/* Text */}
//                             <p className="text-gray-950 text-xl text-center mb-5">Enter your OTP Number</p>

//                             <form onSubmit={handleSubmit}>
//                                 <div className="relative rounded-lg max-w-lg m-auto">
//                                     {/* OTP Input Boxes */}
//                                     <div className="flex justify-center space-x-3 mb-5">
//                                         <input 
//                                             type="text" 
//                                             name="otp" 
//                                             value={formData.otp} 
//                                             onChange={handleChange} 
//                                             placeholder="Enter OTP" 
//                                             required 
//                                             className="w-14 h-14 text-center text-lg rounded-lg border transition-all border-blue-950 focus:ring-2 focus:ring-violet-800 focus:outline-none"
//                                         />
//                                     </div>

//                                     {/* Verify Button */}
//                                     <div className="flex justify-center items-center">
//                                         <button type="submit" className="bg-orange-500 text-white font-semibold text-xl py-2 px-11 rounded-lg shadow-md mt-4">
//                                             Verify OTP
//                                         </button>
//                                         <button type="button" onClick={handleResendOTP} disabled={loading} className="bg-gray-300 text-black font-semibold text-xl py-2 px-11 rounded-lg shadow-md mt-4 ml-4">
//                                         {loading ? 'Resending...' : 'Resend OTP'}
//                                         </button>
//                                     </div>
//                                 </div>
//                             </form>
//                         </div>
//                     </div>

//                     {/* SignUp Section */}
//                     <div className="w-3/5 rounded-tl-[10rem] rounded-bl-[10rem] bg-violet-600 text-white rounded-tr-2xl rounded-br-2xl py-36 px-12">
//                         <h1 className="text-center text-3xl font-bold mb-2">Hello, Friend!</h1>
//                         <div className="border-2 w-10 border-pink-900 inline-block mb-2"></div>
//                         <p className="mb-5 text-center">Fill up personal information and start your journey with us</p>
//                         {/* Sign In Button */}
//                         <div className="flex justify-center items-center">
//                             <Link href="/login">
//                                 <MagicButton
//                                     title="Sign In"
//                                     icon={<FaLocationArrow />}
//                                     position="left"
//                                 />
//                             </Link>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <div className="flex justify-center relative my-20 z-10">
//                 <div className='max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center'></div>
//             </div>
//         </div>
//     );
// };

// export default OtpVerification;
