import React, { useEffect, useState } from 'react';
import Navbar from "./components/Navbar";
import Filter from "./components/Filter";
import Cards from "./components/Cards";
import Spinner from "./components/Spinner";
import { toast } from 'react-toastify';
import { filterData,apiUrl } from './data';

 
const App = () => {

    const[courses,setCourses] = useState([]); //we can set it to null since we have added spinner 
    const [loading,setLoading] = useState(true);
    const [category,setCategory]  = useState(filterData[0].title);

  //for api fetch
  async function fetchData(){
   setLoading(true);
    try{
          let response = await fetch(apiUrl);
          let output = await response.json();
          //output
          setCourses(output.data);
          setLoading(false);
     
    }
    catch(error){
        toast.error("Something went wrong");
        setLoading(false);
    }
    
 
  }

  useEffect(()=>{
      fetchData();
  },[])

  return (
    <div className="min-h-screen flex flex-col bg-bgDark2">

      <div>
           <Navbar/>
      </div>

      <div className="bg-bgDark2">
          <div>
              <Filter 
              filterData = {filterData}
              setCategory = {setCategory}
              category = {category}></Filter>
          </div>

          <div className="w-11/12 max-w-[1200px] 
           mx-auto flex flex-wrap justify-center items-center min-h-[50vh]">
         {
            (loading ? (<Spinner/>) : (<Cards courses={courses} category = {category}/>))

        }
       </div>

      </div> 
      </div>
   
   
  )
}

export default App