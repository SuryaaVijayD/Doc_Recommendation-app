import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();

    const handleFindDoctorClick = () => {
        navigate('/find-doctor');
    };
    const handleAppointment = () => {
        navigate('/appointment');
    }


    return (
        <div className="relative h-[90vh] md:h-[60vh]">
            <img src="https://res.cloudinary.com/dvp9gkjpk/image/upload/v1731652063/hospital_image_z16ywv.jpg" alt="Apollo Proton Cancer Centre building at night" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-blue-900 bg-opacity-50 flex items-center justify-center px-8">
                <div className="text-white max-w-lg">
                    <h1 className="text-3xl font-bold mb-4">CROWD  COMPUTING INTEGRATED FRAMEWORK FOR MEDICAL HEALTH INFORMATION TECHNOLOGY</h1>
                    <p className="mb-4 mt-5">Trusted, personalized doctor recommendations in your area.</p>
                    <div className='flex flex-col gap-7'>
                        <button
                            type="button"
                            className="px-4 py-3 bg-white text-black font-semibold hover:bg-transparent hover:text-white hover:border-2 hover:border-white"
                            onClick={handleFindDoctorClick}
                        >
                            Find a Doctor Now!
                        </button>
                        <button
                            type='button'
                            className='px-4 py-3 border-2 border-white bg-transparent'
                        >
                            Learn More
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
