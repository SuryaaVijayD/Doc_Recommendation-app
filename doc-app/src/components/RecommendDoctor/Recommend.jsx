import React, { useState } from 'react';
import { TbListNumbers } from "react-icons/tb";
import { FaStar } from "react-icons/fa6";

function Recommend() {
    const [inputRecData, setInputRecData] = useState('');
    const [doctorType, setDoctorType] = useState('');
    const [filterDocData, setFilterDocData] = useState([]);
    const [filteredGender, setFilteredGender] = useState('all'); // Gender filter state
    const [flag, setFlag] = useState(true);

    const initialDoctorData = [
        { id: 1, name: "Dr. Bellarmine V L", location: "MUMBAI" },
        { id: 2, name: "Dr. Mohammed IM", location: "TRICHY" },
        { id: 3, name: "Dr. Raj G", location: "TRICHY" },
        { id: 4, name: "Dr. Veda PPS", location: "CHENNAI" },
        { id: 5, name: "Dr. Sathish SK", location: "CHENNAI" }
    ];

    const handleDetailsSubmit = async (event) => {
        event.preventDefault();

        if (!inputRecData || isNaN(inputRecData) || !doctorType) {
            alert("Please enter valid number of recommendations and doctor type.");
            return;
        }

        const payload = {
            num_recommendations: parseInt(inputRecData, 10),
            speciality: doctorType,
        };

        fetch('http://127.0.0.1:5000/recommend', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
            .then(res => res.json())
            .then(data => {
                console.log(data.recommendations);
                setFilterDocData(data.recommendations);
                setFlag(false);
            })
            .catch(err => console.error(err));
    };

    const handleGenderFilter = (event) => {
        setFilteredGender(event.target.value);
    };

    const displayedDoctors = filterDocData.filter(doctor => {
        if (filteredGender === 'all') return true;
        return filteredGender === 'male' ? doctor.gender === 'm' : doctor.gender === 'f';
    });

    return (
        <div>
            <div className="p-4">
                <nav className="text-sm text-orange-600 mb-4 mt-5 px-4">
                    Home &gt; <span className="text-gray-600">Specialities</span>
                </nav>
                <form onSubmit={handleDetailsSubmit}>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h1 className="text-2xl font-bold text-[#506FB1] mb-4">Find Doctors</h1>
                        <div className="mb-4">
                            <h3 className="text-2xl font-bold text-[#506FB1] mb-4">Enter the number of Recommendations:</h3>
                            <div className="flex">
                                <TbListNumbers className="text-[#506FB1] font-extrabold text-2xl mt-2 mr-3" />
                                <input
                                    type="text"
                                    value={inputRecData}
                                    onChange={(e) => setInputRecData(e.target.value)}
                                    placeholder="Enter The Number Of Recommendations"
                                    className="border-b-2 border-[#506FB1] w-full p-2 focus:outline-none"
                                />
                            </div>
                        </div>

                        <div className="mb-4">
                            <h3 className="text-2xl font-bold text-[#506FB1] mb-4">Enter the Type of Doctor:</h3>
                            <div className="flex gap-4">
                                <input
                                    type="text"
                                    value={doctorType}
                                    onChange={(e) => setDoctorType(e.target.value)}
                                    placeholder="Enter Doctor Speciality (e.g., Cardiologist)"
                                    className="border-b-2 border-[#506FB1] w-full p-2 focus:outline-none"
                                />
                                <select
                                    id="gender-filter"
                                    value={filteredGender}
                                    onChange={handleGenderFilter}
                                    className="border-2 border-black p-2 w-full focus:outline-none"
                                >
                                    <option value="all">All</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div>
                        </div>

                        <div className="mt-5">
                            <button className="h-[40px] w-[180px] px-2 bg-[#506FB1] text-white font-semibold" type="submit">Recommend Doctor</button>
                        </div>
                    </div>
                </form>
            </div>

            <div className="mt-3 mx-4 mb-4">
                <h3 className="text-xl font-bold mb-2">List of Doctors:</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {flag ? (
                        initialDoctorData.map((doctor, index) => (
                            <div key={index} className="relative flex flex-col justify-center items-center gap-6 self-center border p-4 rounded-lg shadow-sm">
                                <div className="h-[150px] w-[150px] bg-gray-500 rounded-full mb-2"></div>
                                <div className='text-center'>
                                    <h3 className="text-2xl md:text-lg mb-3 font-bold">{doctor.name}</h3>
                                    <p>Specialization: {doctor.location}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        displayedDoctors.map((doctor, index) => (
                            <div key={index} className="relative flex flex-col justify-center items-center gap-6 self-center border p-4 rounded-lg shadow-sm">
                                <div className='absolute top-5 right-8 flex gap-1 border-2 px-2'>
                                    <FaStar className=' text-yellow-400 text-2xl self-center' />
                                    <p>{doctor.rating} </p>
                                </div>
                                <div>
                                    <img src={doctor.doctor_image} alt='img' className='h-[150px] w-[150px] bg-gray-500 rounded-full mb-2' />
                                </div>
                                <div className='text-center'>
                                    <h3 className="text-2xl md:text-lg mb-3 font-bold">{doctor.doctor_name}</h3>
                                    <p>Specialization: {doctor.speciality}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default Recommend;
