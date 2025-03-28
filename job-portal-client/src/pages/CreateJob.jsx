//import React from 'react'
import { useState } from "react";
import { useForm } from "react-hook-form";
import CreatableSelect from 'react-select/creatable';

const CreateJob = () => {
    const [selectedOption, setSelectedOption] = useState(null);
    const {
        register,
        handleSubmit,reset,
        formState: { errors },
      } = useForm();
    
      const onSubmit = (data) => {
        data.skills = selectedOption;
        
        console.log("Sending data:", data); // Debugging output
        
        fetch("http://localhost:3000/post-job", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then((result) => {
          console.log("Response:", result);
            if(result.acknowledged === true){
              alert("Job posted successfully!!");
            }
            reset()
        })
    };

    const option = [
      { value: 'javaScript', label: 'javaScript' },
      { value: 'python', label: 'python' },
      { value: 'java', label: 'java' },
      { value: 'c++', label: 'c++' },
      {value: 'React', label: 'React'},
    ]

  return (
      <div className= 'max-w-screen-2x1 container mx-auto xl:px-24 px-4'>
        {/* Form */}
        <div className='bg-[#FAFAFA] py-10 px-4 lg:px-16'>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/*  1st row */}
            <div className="create-job-flex">
                <div className="lg:w-1/2 w-full">
                     <label className="block mb-2 text-lg">Job Title</label> 
                     <input type="text" defaultValue={"Web Developer"} {...register("jobTitle")} 
                     className="create-job-input"/>
                </div>
                <div className="lg:w-1/2 w-full">
                     <label className="block mb-2 text-lg">Company Name</label> 
                     <input type="text" placeholder="Ex: Microsoft" {...register("companyName")} 
                     className="create-job-input"/>
                </div>
            </div>

            {/* 2nd row */}
            <div className="create-job-flex">
                <div className="lg:w-1/2 w-full">
                     <label className="block mb-2 text-lg">Minimum Salary</label> 
                     <input type="text" placeholder = "$20k" {...register("minPrice")} 
                     className="create-job-input"/>
                </div>
                <div className="lg:w-1/2 w-full">
                     <label className="block mb-2 text-lg">Maximum Salary</label> 
                     <input type="text" placeholder="$120k" {...register("maxPrice")} 
                     className="create-job-input"/>
                </div>
              </div>

              {/* 3rd row */}
              <div className="create-job-flex">
                <div className="lg:w-1/2 w-full">
                     <label className="block mb-2 text-lg">Salary Type</label> 
                     <select {...register("salaryType")} className="create-job-input">
                     <option  value="">Choose your Salary</option>
                     <option value="Hourly">Hourly</option>
                     <option value="Monthly">Monthly</option>
                     <option value="Yearly">Yearly</option>
                    </select>
                </div>
                <div className="lg:w-1/2 w-full">
                     <label className="block mb-2 text-lg">Job Location</label> 
                     <input type="text" placeholder="Ex: New york" {...register("jobLocation")} 
                     className="create-job-input"/>
                </div>
              </div>
              {/* 4th row */}
              <div className="create-job-flex">
              <div className="lg:w-1/2 w-full">
                     <label className="block mb-2 text-lg">Job Posting Date</label> 
                     <input type="text" placeholder="Ex: 2023-11-03" {...register("postingDate")} 
                     className="create-job-input"/>
                </div>
                
                <div className="lg:w-1/2 w-full">
                     <label className="block mb-2 text-lg">Salary Type</label> 
                     <select {...register("salaryType")} className="create-job-input">
                     <option  value="">Choose your experienxe</option>
                     <option value="NoExperience">Hourly</option>
                     <option value="Internship">Internship</option>
                     <option value="Work remotely">Work remotely</option>
                    </select>
                </div>
    
              </div>
               
              {/* 5th row */}
              <div>
              <label className="block mb-2 text-lg">Required Skill Sets</label> 
              <CreatableSelect
                 defaultValue={selectedOption}
                 onChange={setSelectedOption}
                 options={option}
                 isMulti
              className="create-job-input py-4"/>
              </div>

              {/* 6th row */}
              <div className="create-job-flex">
              <div className="lg:w-1/2 w-full">
                     <label className="block mb-2 text-lg">Company Logo</label> 
                     <input type="url" 
                     placeholder="Paste your company logo URL: https://weshare.com/img1" 
                     {...register("companyLogo")} 
                     className="create-job-input"/>
                </div>
                
                <div className="lg:w-1/2 w-full">
                     <label className="block mb-2 text-lg">Employment Type</label> 
                     <select 
                     {...register("employmentType")} 
                     className="create-job-input">
                     <option  value="">Choose your Duration</option>
                     <option value="Full-time">Full-time</option>
                     <option value="Part-time">Part-time</option>
                     <option value="Temporary">Temporary</option>
                    </select>
                </div>
    
              </div>
               
              {/* 7th row  */}
               <div className="w-full">
                  <label className="block mb-2 test-lg">Job Description</label>
                  <textarea 
  className="w-full p-3 py-1.5 focus:outline-none placeholder:text-gray-700"
  rows={6}
  defaultValue={"Mollit in laborum tempor lorem incididunt irure. Aute eu ex ad sunt pariatur sint culpa."}
  placeholder="Job Description"
  {...register("description")}
/>

               </div>

              {/* last row */}
              <div className="w-full">
                <label className="block mb-2 text-lg">Job Posted by</label>
             <input type="email"
                  placeholder="your email"
                  {...register("postedBy")}
                  className="create-job-input"
              />
             
             </div>

      <input type="submit" className="block mt-12 bg-blue text-white font-semibold px-8 py-2 rounded-sm cursor-pointer"/>
    </form>
        </div>
      </div>
  )
}

export default CreateJob