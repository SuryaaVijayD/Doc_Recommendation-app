import React from 'react'

function SecondSection() {
    return (
        <div className=" mx-auto p-8 bg-blue-50">
            <div className="sm:mx-2 md:mx-10 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">Why We Choose This Project?</h1>
                    <p className="text-gray-600 mb-8">
                        User-Centric: Each piece of content addresses a specific user need, from finding a doctor quickly to learning more about the service and contacting support.
                        <br /> Professional and Trust-Building: Content is straightforward, fostering credibility. It assures users that the application values quality and trustworthiness in healthcare.
                    </p>
                    <div className="space-y-8">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="bg-white p-4 rounded-lg shadow-md">
                                    <img src="https://placehold.co/50x50" alt="Hospital icon" className="w-12 h-12" />
                                </div>
                            </div>
                            <div className="ml-4">
                                <h2 className="text-2xl font-bold text-teal-600">73+ Cardiologist</h2>
                                <p className="text-gray-600">Largest private healthcare network of Hospitals</p>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="bg-white p-4 rounded-lg shadow-md">
                                    <img src="https://placehold.co/50x50" alt="Clinic icon" className="w-12 h-12" />
                                </div>
                            </div>
                            <div className="ml-4">
                                <h2 className="text-2xl font-bold text-teal-600">700+ Pulmonologist</h2>
                                <p className="text-gray-600">Largest private network of clinics across India</p>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="bg-white p-4 rounded-lg shadow-md">
                                    <img src="https://placehold.co/50x50" alt="Diagnostic center icon" className="w-12 h-12" />
                                </div>
                            </div>
                            <div className="ml-4">
                                <h2 className="text-2xl font-bold text-teal-600">2,300+ Dermatologist</h2>
                                <p className="text-gray-600">Diagnostic centres across India</p>
                            </div>
                        </div>

                    </div>
                </div>
                <div>
                    <img src="https://res.cloudinary.com/dvp9gkjpk/image/upload/v1731655678/doc_lf84aa.jpg" alt="Doctors in a meeting" className="rounded-lg shadow-md" />
                </div>
            </div>
        </div>
    )
}

export default SecondSection