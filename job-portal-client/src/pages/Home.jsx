import React, { useEffect, useState } from 'react';
import Banner from '../components/Banner'
import Card from '../components/Card';
import Jobs from './Jobs';
import Sidebar from '../Sidebar/Sidebar';
import Newsletters from '../components/Newsletter';
// import { filterdData } from './utils'; // Adjust the path based on your file structure
// import data from "./Jobs"
import "../../public/jobs.json"


const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

    useEffect(() => {
      setIsLoading(true);
      fetch("jobs.json").then(res => res.json()).then(data => {
        // console.log(data)
        setJobs(data);
        setIsLoading(false);
      })
    }, [])
  //console.log(jobs)

  //handle input change
  const [query, setQuery] = useState("");
  const handleInputChange = (event) => {
    setQuery(event.target.value);
  }
 
  //filter jobs by title 
  const filteredItems = jobs.filter((job) => job.jobTitle.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  
  // -----Radio Filtering----
  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  }
  //----button based filtering-----
  const handleClick = (event) => {
    
    setSelectedCategory(event.target.value);
  }

//calculate the index range
const calculatePageRange = () => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return { startIndex, endIndex };
}
//function for the next page 
const nextPage = () => {
  if (currentPage < Math.ceil(filteredItems.length / itemsPerPage)) {
      setCurrentPage(currentPage+1);
    } 
  } 
  //function for the previous page 
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  //--------------*****
  //main function
  const filterdData = (jobs, selected, query) => {
    let filteredJobs = jobs;
  
    // Filtering based on query
    if (query) {
      filteredJobs = filteredJobs.filter(job =>
        Object.values(job).some(value =>
          value.toString().toLowerCase().includes(query.toLowerCase())
        )
      );
     }
  
    // Category filtering
    if (selected) {
      filteredJobs = filteredJobs.filter(
        ({ jobLocation,
           maxPrice,
           experienceLevel,
           salaryType,
           employmentType,
          postingDate,
         }) => 
          jobLocation.toLowerCase() === selected.toLowerCase() ||
          parseInt(maxPrice) <= parseInt(selected) ||
          postingDate >= selected ||
          salaryType.toLowerCase() === selected.toLowerCase() ||
          experienceLevel.toLowerCase() === selected.toLowerCase() ||
          employmentType.toLowerCase() === selected.toLowerCase()
      );
      console.log(filteredJobs);
    }
      //slice the data based on current page 
      const{startIndex, endIndex} = calculatePageRange();
       filteredJobs = filteredJobs.slice(startIndex, endIndex)

    // Render the filtered jobs
    return filteredJobs.map((data, i) => <Card key={i} data={data} />);
  };
  const result = filterdData(jobs, selectedCategory, query);

  return (
    <div>
      <Banner query={query} handleInputChange={handleInputChange} />
        {/* main content  */}
      <div className='bg-[#FAFAFA] md:grid grid-cols-4 gap-8 lg:px-24 px-4 py-12'>
        {/*left side*/}
        <div className='bg-white p-4 rounded'>
          <Sidebar handleChange={handleChange} handleClick={handleClick}/>
        </div>
        
        {/*job cards */}
        <div className='col-span-2 bg-white p-4 rounded-sm'>
          {
            isLoading ? (<p className="font-medium">Loading....</p>) : result.length > 0 ? (<Jobs result={result}/>) : <>
            <h3 className='text-lg font-bold mb-2'>{result.length} Jobs</h3>
            <p>No data found</p>
            </>
          }
            {/*pagination here*/}
            {
                   result.length > 0 ? (
                  <div className="flex justify-center mt-4 space-x-8">
                  <button onClick={prevPage} disabled={currentPage === 1}
                  className='hover:underline'>Previous</button>
                  <span>Page {currentPage} of {Math.ceil(filteredItems.length / itemsPerPage)}</span>
                 <button onClick={nextPage} disabled={currentPage === Math.ceil(filteredItems.length /
                   itemsPerPage)} className='hover:underline'>Next</button>
                </div>
             ) : null
          }

          </div>
        
        {/*right side*/}
        <div className='bg-white p-4 rounded' ><Newsletters/></div>
      </div>
    </div>
  );
}

export default Home