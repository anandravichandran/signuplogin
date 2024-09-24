
"use client";
import React, { useState, FormEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter
import { Spotlight } from '../login/ui/Spotlight';
import MagicButton from '../login/ui/MagicButton';
import { FaLocationArrow, FaRegEnvelope, FaUser,FaLock, FaLockOpen, } from 'react-icons/fa6';
import { FaFacebook, FaLinkedinIn, FaGoogle } from 'react-icons/fa';
import { MdLockOutline, MdVisibility, MdVisibilityOff } from 'react-icons/md';
import Link from 'next/link';
import  {useNavigate}  from 'react-router-dom';

interface User {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Signup: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<User>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [passwordStrength, setPasswordStrength] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ name: string; email: string; password: string; confirmPassword: string; general?: string }>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prevUser) => {
      const updatedUser = { ...prevUser, [name]: value };

      // Check password strength
      if (name === 'password') {
        setPasswordStrength(getPasswordStrength(value));
      }

      // Check if passwords match
      if (name === 'password' || name === 'confirmPassword') {
        if (updatedUser.password !== updatedUser.confirmPassword) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            confirmPassword: 'Passwords do not match.',
          }));
        } else {
          setErrors((prevErrors) => ({ ...prevErrors, confirmPassword: '' }));
        }
      }

      return updatedUser;
    });
  };

  const onSignup = async () => {
    // Clear errors
    setErrors({ name: '', email: '', password: '', confirmPassword: '' });

    // Basic validation
    let hasError = false;

    if (!formData.name.trim()) {
      setErrors((prev) => ({ ...prev, name: 'Please enter your name.' }));
      hasError = true;
    }

    if (!formData.email.includes('@')) {
      setErrors((prev) => ({ ...prev, email: 'Please enter a valid email address.' }));
      hasError = true;
    }

    if (formData.password.length < 8) {
      setErrors((prev) => ({ ...prev, password: 'Password must be at least 8 characters long.' }));
      hasError = true;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrors((prev) => ({ ...prev, confirmPassword: 'Passwords do not match.' }));
      hasError = true;
    }

    // If any validation error exists, return early
    if (hasError) return;

    try {
      // Log form data to the console
      console.log("Form Data:", formData);

      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData?.message || 'Registration failed';
        
        // Check if user already exists
        if (response.status === 409) {
          setErrors((prev) => ({ ...prev, general: 'User already exists' }));
        } else {
          throw new Error(errorMessage);
        }
      } else {
        // Clear form data on successful registration
        setFormData({ name: '', email: '', password: '', confirmPassword: '' });
        console.log('Register successful');

        // Navigate to the sign-in page after successful registration
        router.push(`/loginotp/${formData.email}`);
      }

    } catch (error: any) {
      // Handle error properly
      console.error(error.message || 'An unexpected error occurred');
      setErrors((prev) => ({ ...prev, general: error.message || 'An unexpected error occurred' }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await onSignup(); // Call the signup function on form submit
  };

  const getPasswordStrength = (password: string): string => {
    let strength = '';
    if (password.length >= 8) {
      if (/[A-Z]/.test(password) && /[0-9]/.test(password) && /[^A-Za-z0-9]/.test(password)) {
        strength = 'Strong';
      } else if (/[A-Z]/.test(password) || /[0-9]/.test(password)) {
        strength = 'Medium';
      } else {
        strength = 'Weak';
      }
    } else {
      strength = 'Too Short';
    }
    return strength;
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const getStrengthColor = () => {
    switch (passwordStrength) {
      case 'Strong':
        return 'text-green-900';
      case 'Medium':
        return 'text-blue-800';
      case 'Weak':
        return 'text-red-800';
      default:
        return 'text-gray-700';
    }
  };

  return (
    <div className="w-screen h-screen overflow-hidden relative">
      <div>
        <Spotlight className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen" fill="white" />
        <Spotlight className="-top-2 left-full h-[80vh] w-[50vw]" fill="purple" />
        <Spotlight className="top-28 left-80 h-[80vh] w-[50vw]" fill="blue" />
      </div>

      <div className="h-screen w-full dark:bg-black-100 bg-white dark:bg-grid-white/[0.04] bg-grid-black/[0.2] flex items-center justify-center absolute top-0 left-0">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black-100 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        {/*  webshield logo  */}
        <div>
          <img src="/Webfoxshield.png" alt="Logo" className="fixed top-0 left-3 h-40 z-[900]" />
        </div>

        <div className="bg-white-100 rounded-2xl shadow-black-100 shadow-2xl flex w-2/3 max-w-4xl ml-4 sm:ml-6 md:ml-6 lg:ml-10">
          <div className="w-3/5 rounded-tr-[10rem] rounded-br-[10rem] rounded-2xl dark:bg-violet-950 text-white py-36 px-12 flex flex-col justify-center">
            <h1 className="text-center text-3xl font-bold mb-2">Hello, Friend!</h1>
            <div className="border-2 w-10 border-pink-900 inline-block mb-2"></div>
            <p className="mb-5 text-center">Fill up your personal information and start your journey with us</p>
            <div className="flex justify-center items-center">
              <Link href="/login">
                <MagicButton title="Sign In" icon={<FaLocationArrow />} position="left" />
              </Link>
            </div>
          </div>

          <div className="w-3/5 p-5">
            <div className="text-left font-bold">
              <span className="text-3xl text-blue-950">WebFoxShield</span>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="py-10">
                <h2 className="text-xl font-bold text-blue-950 mb-2">Signup to Account</h2>
                <div className="border-2 w-10 border-pink-900 inline-block mb-2"></div>
                <div className="relative rounded-lg max-w-lg m-auto">

                  <div className="bg-black-100 w-full p-2 flex items-center mb-3 rounded-2xl">
                    <FaUser className="text-gray-100 mr-2" />
                    <input
                      className="bg-black-100 outline-none text-lg flex-1 rounded-lg"
                      type="text"
                      placeholder="Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}

                  <div className="bg-black-100 w-full p-2 flex items-center mb-3 rounded-2xl">

                    <FaRegEnvelope className="text-gray-100 mr-2" />
                    <input
                      className="bg-black-100 outline-none text-lg flex-1 rounded-lg"
                      type="email"
                      placeholder="Email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}

                  <div className="bg-black-100 w-full flex items-center rounded-2xl p-2 mb-3">
                 
                    <MdLockOutline className="text-gray-100 mr-2" />
                    {/* <FaLock className="text-gray-100 mr-2" /> */}
                    <input
                      className="bg-black-100 outline-none text-lg flex-1 rounded-lg"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                    <div
                      className="text-gray-100 mr-2 cursor-pointer"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <MdVisibility /> : <MdVisibilityOff />}
                    </div>
                  </div>
                  <p className={`text-xs ${getStrengthColor()}`}>{passwordStrength}</p>
                  {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}

                  <div className="relative bg-black-100 w-full p-2 flex items-center mb-3 rounded-2xl">
                  {/* <FaLock className="text-gray-100 mr-2" /> */}
                    <MdLockOutline className="text-gray-100 mr-2" />
                    <input
                      className="bg-black-100 outline-none text-lg flex-1 rounded-lg"
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Confirm Password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                    <div
                      className="text-gray-100 mr-2 cursor-pointer"
                      onClick={toggleConfirmPasswordVisibility}
                    >
                      {showConfirmPassword ? <MdVisibility /> : <MdVisibilityOff />}
                    </div>
                  </div>
                  {errors.confirmPassword && <p className="text-red-500 text-xs">{errors.confirmPassword}</p>}
                  <button
                    type="submit"
                    className="border-2 justify-center border-gray-950 rounded-xl p-3 w-64 text-lg text-white bg-gray-900 mx-auto block hover:bg-orange-500 transition-all duration-300"
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;


