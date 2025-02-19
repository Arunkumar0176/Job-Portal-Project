import React from 'react';
import { Link } from 'react-router-dom';
import { FiMapPin, FiClock, FiDollarSign, FiCalendar } from 'react-icons/fi';

const Card = ({ data }) => {
  // Destructuring the `data` object with default values for safety
  const {
    companyName = "Unknown Company",
    jobTitle = "No Job Title Provided",
    companyLogo = "default-logo.png", // Fallback for missing logo
    minPrice = "N/A",
    maxPrice = "N/A",
    salaryType = "N/A",
    jobLocation = "Location not specified",
    postingDate = "Date not available",
    experienceLevel = "Experience level not specified",
    employmentType = "Employment type not specified",
    description = "No description provided",
  } = data;

  return (
    <section className="card">
      <Link to="/" className="flex gap-4 flex-col sm:flex-row items-start">
        {/* Company Logo */}
        <img
          src={companyLogo} alt=''
        //   alt={`${companyName} logo`}
        //   className="w-16 h-16 object-contain"
        />
        
       

        {/* Job Details */}
        <div>
        <h4 className="text-sm text-primary mb-1">{companyName}</h4>
          <h3 className="text-lg font-semibold mb-2">{jobTitle}</h3>
          {/* <p className="text-sm">Location: {jobLocation}</p>
          <p className="text-sm">
            Salary: {minPrice} - {maxPrice} ({salaryType})
          </p>
          <p className="text-sm">Posted on: {postingDate}</p>
          <p className="text-sm">Experience: {experienceLevel}</p>
          <p className="text-sm">Employment Type: {employmentType}</p>
          <p className="text-sm text-gray-700">{description}</p> */}
        
            <div className='text-primary/70 text-base flex flex-wrap gap-2 mb-2'>
                <span className='flex items-center gap-2'><FiMapPin/>{jobLocation}</span>
                <span className='flex items-center gap-2'><FiClock/>{employmentType}</span>
                <span className='flex items-center gap-2'><FiDollarSign/>{minPrice}-{maxPrice}k</span>
                <span className='flex items-center gap-2'><FiCalendar/>{postingDate}</span>
            </div>
               <p className='text-base text-primary/70'>{description}</p>
        </div>
      </Link>
    </section>
  );
};

export default Card;
