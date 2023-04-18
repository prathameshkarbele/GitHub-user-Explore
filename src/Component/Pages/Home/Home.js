// import React, { useEffect, useState } from "react";
// import "./Home.css";
// import axios from "../../../axios";
// import User from "../../ui/User";
// const Home = () => {

//   const [query, setQuery] = useState("");

 
//   // user fetch from the api
//  const [users, setUsres] = useState([]);

//  //pages
//  const [page, setPage] = useState(1);
//  // per page
//  const [limit, setLimit ] = useState(10);
  

//   const handleQueryInput = (e) => {
//     const value =  e.target.value;
//     setQuery(value);
//   }
//  const handlepPevious = () =>{
//    setPage(page =>{
//     if(page===1) return page;
//     else return page -1;
//    })
//  }

// const handlepnextPage = () =>{
//    setPage(page =>{
//      return page +1;
//    })
//  }
//  const handlePageLimit = (e) => {
//   const value = e.target.value;
//    setLimit(parseInt(value)); 
//  }


//   const fetchUsres = async () =>{
//      try {
//       const {data} = await axios.get("/search/users?q=" + query, {
//         params: {
//           page: page,
//           per_page: limit
//         }
//       });

//       return data?.items;
//      } catch (error) {
//        console.log(error);
//        return null;
//      }
//   }
//   const handleSerachUsers = async(e) => {
//    e.preventDefault();
//    if(query) {
//     const items = await fetchUsres();
//     setUsres(items);

//    }
//    else{
//     console.log("Your Query is Empty")
//    }
   
//   }

//   useEffect(()=>{
//    const displayUserOnChange = async() => {
//     if(query) {
//       const items = await fetchUsres();
//       setUsres(items);
  
//      }
//      ;
//    }
//    displayUserOnChange()

//   },[page, limit])

//   return (
//     <div className="container">
//       <div className="search-form">
//         <h2>GitHub Search User</h2>
//         <form>
//           <input type="text" value={query} onChange={handleQueryInput}/>
//           <button onClick={handleSerachUsers}>Search</button>
//         </form>
//       </div>
//       <div className="serach-resualt">
//       <div className="more-options">
//         <label>
//           <small>Per Page</small>
//           <select onChange={handlePageLimit}>
//             <option value="10">10</option>
//             <option value="20">20</option>
//             <option value="50">50</option>
//             <option value="100">100</option>
//           </select>
//         </label>
//         <div className="pagination">
//           <button onClick={handlepPevious}>{page}</button>
//           <button onClick={handlepnextPage}>{page+1}</button>
//         </div>
//       </div>
//        {users ? (
//        users?.map((user) =>{
//          return <User user = {user} key={user.id} />
//        })
//       ) : (
//        <h2>There is nothing to display....</h2>
//       )
//  }
  
  
//   </div>

//     </div>
//   );
//   };

// export default Home;


import React, { useState, useEffect } from "react";
import "./Home.css";
import axios from "../../../axios";
import User from "../../ui/User";
const Home = () => {
  const [query, setQuery] = useState("");
  //Users fetched from the API
  const [users, setUsers] = useState([]);
  //Page
  const [page, setPage] = useState(1);
  //Per page
  const [limit, setLimit] = useState(10);

  const handleQueryInput = (e) => {
    const value = e.target.value;
    setQuery(value);
  };
  const handlePrevPage = () => {
    setPage((page) => {
      if (page === 1) return page;
      else return page - 1;
    });
  };

  const handleNextPage = () => {
    setPage((page) => page + 1);
  };

  const handlePageLimit = (e) => {
    const value = e.target.value;
    setLimit(parseInt(value));
  };

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get("/search/users?q=" + query, {
        params: {
          page,
          per_page: limit,
        },
      });
      
      return data?.items;

    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const handleSearchUsers = async (e) => {
    e.preventDefault();
    if (query) {
      const items = await fetchUsers();
      setUsers(items);

    } else {
      console.log("Your query is empty...");
    }
  };
  useEffect(() => {
    const displayUsersOnChange = async () => {
      if (query) {
        const items = await fetchUsers();
        setUsers(items);
      }
    };
    displayUsersOnChange();
  }, [page, limit]);

  return (
    <div className="container">
      <div className="search-form">
        <h2>GitHub Search User</h2>
        <form>
          <input value={query} onChange={handleQueryInput} type="text" />
          <button onClick={handleSearchUsers}>Search</button>
        </form>
      </div>
      <div className="search-results">
        <div className="more-options">
          <label>
            <small>Per Page</small>
            <select onChange={handlePageLimit}>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </label>
          <div className="pagination">
            <button onClick={handlePrevPage}>{page}</button>
            <button onClick={handleNextPage}>{page + 1}</button>
          </div>
        </div>
        {users ? (
          users.map((user) => {
            return <User user={user} key={user.id} />;
          })
        ) : (
          <h2>There is nothing to display...</h2>
        )}
      </div>
    </div>
  );
};

export default Home;
