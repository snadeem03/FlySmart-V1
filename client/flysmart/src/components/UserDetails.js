// importing libraries 

import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaPlus, FaTrashAlt } from 'react-icons/fa';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';




const UserDetails = () => {
    const [additionalMobile, setAdditionalMobile] = useState(false);
    const [passengerForms, setPassengerForms] = useState([]);
    const [showPassengerForm, setShowPassengerForm] = useState(false);
    const navigate = useNavigate();


    const handleAddMobile = () => {
        setAdditionalMobile(true);
    };

    const handleRemoveMobile = () => {
        setAdditionalMobile(false);
    };


    const handleAddPassenger = () => {
        setPassengerForms([...passengerForms, {
            firstName: '', lastName: '', street: '', zipCode: '', city: '', state: '', country: '', mobileNumber: '', additionalMobileNumber: '', email: '', gender: '', dob: '', classType: '', hasAdditionalMobile: false
        }]);
        setShowPassengerForm(true);
    };



    const handleRemovePassenger = (index) => {
        const updatedForms = passengerForms.filter((_, i) => i !== index);
        setPassengerForms(updatedForms);
        if (updatedForms.length === 0) {
            setShowPassengerForm(false);
        }
    };



    const handlePassengerChange = (index, event) => {
        const { name, value } = event.target;
        const updatedForms = passengerForms.map((form, i) =>
            i === index ? { ...form, [name]: value } : form
        );
        setPassengerForms(updatedForms);
    };



    const handleAddPassengerMobile = (index) => {
        const updatedForms = passengerForms.map((form, i) =>
            i === index ? { ...form, hasAdditionalMobile: true } : form
        );
        setPassengerForms(updatedForms);
    };

    const handleRemovePassengerMobile = (index) => {
        const updatedForms = passengerForms.map((form, i) =>
            i === index ? { ...form, hasAdditionalMobile: false, additionalMobileNumber: '' } : form
        );
        setPassengerForms(updatedForms);
    };



    const handleUserSubmit = async (event) => {
        event.preventDefault();


        const form = event.target;
        console.log('The form data is:', form.firstName.value.trim());

        // storing the user form data in a JSON
        const userData = {
            'firstName': form.firstName.value.trim(),
            'lastName': form.lastName.value.trim(),
            'street': form.street.value.trim(),
            'zipCode': form.zipCode.value.trim(),
            'city': form.city.value.trim(),
            'state': form.state.value.trim(),
            'country': form.country.value.trim(),
            'mobileNumber': form.mobileNumber.value.trim(),
            'additionalMobileNumber': additionalMobile ? form.additionalMobileNumber.value.trim() : '',
            'email': form.email.value.trim(),
            'gender': form.gender.value.trim(),
            'dob': form.dob.value.trim(),
            'classType': form.classType.value.trim()
        };

        console.log('The user data is:', userData);






        console.log('hello-2')
        try {
            // posting the data using axios to the server
            const response =await axios.post('http://localhost:3000/userRegister/', userData);
            toast.success('User details submitted successfully!');
            console.log('succesful submission')
            console.log("The Axios Response is : ",response)
            // navigate to the payment component
            navigate('/payment',{'state':{"response":response.data.balance}});
        }
        catch (error) {
            toast.error('Error in submitting the user details');
            console.log('Error in submitting details:', error)
        }
        if (Object.values(userData).some(value => !value)) {
            toast.error('Please fill in all the fields.');
            return;
        }

        if (true) {
            console.log("Hello from IF loop")
        }

        // checking whether mobile number is exactly 10 digits
        if (!/^\d{10}$/.test(userData.mobileNumber)) {
            toast.error('Mobile number must be exactly 10 digits.');
            return;
        }

        // checking whether additional mobile number is exactly 10 digits
        if (additionalMobile && userData.additionalMobileNumber && !/^\d{10}$/.test(userData.additionalMobileNumber)) {
            toast.error('Additional mobile number must be exactly 10 digits.');
            return;
        }


    };





    const handlePassengerSubmit = async (event) => {

        event.preventDefault();

        for (let passenger of passengerForms) {

            console.log("The passenger details from frontend :",passenger)
            console.log("The passenger forms from frontend :",passengerForms)

            try {
                console.log("Is try block being executed ?")
                const response = await axios.post('http://localhost:3000/Passengers/', passenger);
                toast.success('Passenger details submitted successfully!');
                console.log("Succesfully submitted Passenger details")
                console.log("The Axios Response is : ",response)
                navigate('/payment',{ state: { "response":  response} })
            } catch (error) {
                toast.error('Failed to submit passenger details.');
                console.log("Unsuccesful submission of passenger details")  
                return;
            }

        }
    };


    return (
        <div className="bg-white min-h-screen flex items-center justify-center">
            <div className="absolute top-4 right-4 z-10">
                <button
                    onClick={handleAddPassenger}
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Add Passenger Details
                </button>
            </div>
            <div className={`relative flex transition-all duration-500 ${showPassengerForm ? 'justify-start' : 'justify-center'} w-full max-w-6xl`}>
                <div className={`bg-white shadow-md rounded-lg p-6 transition-transform duration-500 ${showPassengerForm ? 'transform -translate-x-1/4' : ''} w-full max-w-xl`}>
                    <h2 className="text-2xl font-semibold text-center mb-6">User Details</h2>
                    <form onSubmit={handleUserSubmit}>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <label htmlFor="firstName" className="block text-gray-700 font-semibold mb-2">
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="lastName" className="block text-gray-700 font-semibold mb-2">
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="street" className="block text-gray-700 font-semibold mb-2">
                                Street Address
                            </label>
                            <input
                                type="text"
                                id="street"
                                name="street"
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <label htmlFor="zipCode" className="block text-gray-700 font-semibold mb-2">
                                    Zip Code
                                </label>
                                <input
                                    type="text"
                                    id="zipCode"
                                    name="zipCode"
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="city" className="block text-gray-700 font-semibold mb-2">
                                    City
                                </label>
                                <input
                                    type="text"
                                    id="city"
                                    name="city"
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <label htmlFor="state" className="block text-gray-700 font-semibold mb-2">
                                    State
                                </label>
                                <input
                                    type="text"
                                    id="state"
                                    name="state"
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="country" className="block text-gray-700 font-semibold mb-2">
                                    Country
                                </label>
                                <input
                                    type="text"
                                    id="country"
                                    name="country"
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="mobileNumber" className="block text-gray-700 font-semibold mb-2">
                                Mobile Number
                            </label>
                            <input
                                type="tel"
                                id="mobileNumber"
                                name="mobileNumber"
                                pattern="[0-9]{10}"
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        {additionalMobile && (
                            <div className="mb-4">
                                <label htmlFor="additionalMobileNumber" className="block text-gray-700 font-semibold mb-2">
                                    Additional Mobile Number
                                </label>
                                <input
                                    type="tel"
                                    id="additionalMobileNumber"
                                    name="additionalMobileNumber"
                                    pattern="[0-9]{10}"
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        )}
                        {!additionalMobile && (
                            <div className="mb-4">
                                <button
                                    type="button"
                                    onClick={handleAddMobile}
                                    className="text-blue-500 hover:underline focus:outline-none"
                                >
                                    Add Additional Mobile Number
                                </button>
                            </div>
                        )}
                        {additionalMobile && (
                            <div className="mb-4">
                                <button
                                    type="button"
                                    onClick={handleRemoveMobile}
                                    className="text-red-500 hover:underline focus:outline-none"
                                >
                                    Remove Additional Mobile Number
                                </button>
                            </div>
                        )}
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <label htmlFor="gender" className="block text-gray-700 font-semibold mb-2">
                                    Gender
                                </label>
                                <select
                                    id="gender"
                                    name="gender"
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                >
                                    <option value="">Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="dob" className="block text-gray-700 font-semibold mb-2">
                                    Date of Birth
                                </label>
                                <input
                                    type="date"
                                    id="dob"
                                    name="dob"
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="classType" className="block text-gray-700 font-semibold mb-2">
                                Class Type
                            </label>
                            <select
                                id="classType"
                                name="classType"
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            >
                                <option value="">Select Class Type</option>
                                <option value="economy">Economy</option>
                                <option value="business">Business</option>
                                <option value="first">First</option>
                            </select>
                        </div>
                        <div className="text-center">
                            <button
                                type="submit"
                                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
                {showPassengerForm && (
                    <div className={`bg-white shadow-md rounded-lg p-6 transition-transform duration-500 transform w-full max-w-xl`}>
                        <h2 className="text-2xl font-semibold text-center mb-6">Passenger Details</h2>
                        <form onSubmit={handlePassengerSubmit}>
                            {passengerForms.map((passenger, index) => (
                                <div key={index} className="mb-4 border-t pt-4">
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="text-xl font-semibold">
                                            Passenger {index + 1}
                                        </h3>
                                        <button
                                            type="button"
                                            onClick={() => handleRemovePassenger(index)}
                                            className="text-red-500 hover:underline focus:outline-none"
                                        >
                                            <FaTrashAlt />
                                        </button>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                        <div>
                                            <label htmlFor={`passenger-firstName-${index}`} className="block text-gray-700 font-semibold mb-2">
                                                First Name
                                            </label>
                                            <input
                                                type="text"
                                                id={`passenger-firstName-${index}`}
                                                name="firstName"
                                                value={passenger.firstName}
                                                onChange={(event) => handlePassengerChange(index, event)}
                                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor={`passenger-lastName-${index}`} className="block text-gray-700 font-semibold mb-2">
                                                Last Name
                                            </label>
                                            <input
                                                type="text"
                                                id={`passenger-lastName-${index}`}
                                                name="lastName"
                                                value={passenger.lastName}
                                                onChange={(event) => handlePassengerChange(index, event)}
                                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor={`passenger-street-${index}`} className="block text-gray-700 font-semibold mb-2">
                                            Street Address
                                        </label>
                                        <input
                                            type="text"
                                            id={`passenger-street-${index}`}
                                            name="street"
                                            value={passenger.street}
                                            onChange={(event) => handlePassengerChange(index, event)}
                                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            required
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                        <div>
                                            <label htmlFor={`passenger-zipCode-${index}`} className="block text-gray-700 font-semibold mb-2">
                                                Zip Code
                                            </label>
                                            <input
                                                type="text"
                                                id={`passenger-zipCode-${index}`}
                                                name="zipCode"
                                                value={passenger.zipCode}
                                                onChange={(event) => handlePassengerChange(index, event)}
                                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor={`passenger-city-${index}`} className="block text-gray-700 font-semibold mb-2">
                                                City
                                            </label>
                                            <input
                                                type="text"
                                                id={`passenger-city-${index}`}
                                                name="city"
                                                value={passenger.city}
                                                onChange={(event) => handlePassengerChange(index, event)}
                                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                        <div>
                                            <label htmlFor={`passenger-state-${index}`} className="block text-gray-700 font-semibold mb-2">
                                                State
                                            </label>
                                            <input
                                                type="text"
                                                id={`passenger-state-${index}`}
                                                name="state"
                                                value={passenger.state}
                                                onChange={(event) => handlePassengerChange(index, event)}
                                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor={`passenger-country-${index}`} className="block text-gray-700 font-semibold mb-2">
                                                Country
                                            </label>
                                            <input
                                                type="text"
                                                id={`passenger-country-${index}`}
                                                name="country"
                                                value={passenger.country}
                                                onChange={(event) => handlePassengerChange(index, event)}
                                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor={`passenger-mobileNumber-${index}`} className="block text-gray-700 font-semibold mb-2">
                                            Mobile Number
                                        </label>
                                        <input
                                            type="tel"
                                            id={`passenger-mobileNumber-${index}`}
                                            name="mobileNumber"
                                            value={passenger.mobileNumber}
                                            onChange={(event) => handlePassengerChange(index, event)}
                                            pattern="[0-9]{10}"
                                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor={`passenger-email-${index}`} className="block text-gray-700 font-semibold mb-2">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            id={`passenger-email-${index}`}
                                            name="email"
                                            value={passenger.email}
                                            onChange={(event) => handlePassengerChange(index, event)}
                                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            required
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                        <div>
                                            <label htmlFor={`passenger-gender-${index}`} className="block text-gray-700 font-semibold mb-2">
                                                Gender
                                            </label>
                                            <select
                                                id={`passenger-gender-${index}`}
                                                name="gender"
                                                value={passenger.gender}
                                                onChange={(event) => handlePassengerChange(index, event)}
                                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                required
                                            >
                                                <option value="">Select Gender</option>
                                                <option value="male">Male</option>
                                                <option value="female">Female</option>
                                                <option value="other">Other</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label htmlFor={`passenger-dob-${index}`} className="block text-gray-700 font-semibold mb-2">
                                                Date of Birth
                                            </label>
                                            <input
                                                type="date"
                                                id={`passenger-dob-${index}`}
                                                name="dob"
                                                value={passenger.dob}
                                                onChange={(event) => handlePassengerChange(index, event)}
                                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor={`passenger-classType-${index}`} className="block text-gray-700 font-semibold mb-2">
                                            Class Type
                                        </label>
                                        <select
                                            id={`passenger-classType-${index}`}
                                            name="classType"
                                            value={passenger.classType}
                                            onChange={(event) => handlePassengerChange(index, event)}
                                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            required
                                        >
                                            <option value="">Select Class Type</option>
                                            <option value="economy">Economy</option>
                                            <option value="business">Business</option>
                                            <option value="first">First</option>
                                        </select>
                                    </div>
                                </div>
                            ))}
                            <div className="text-center">
                                <button
                                    type="button"
                                    onClick={handleAddPassenger}
                                    className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                                >
                                    Add Passenger
                                </button>
                            </div>
                            <div className="text-center mt-6">
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserDetails;
