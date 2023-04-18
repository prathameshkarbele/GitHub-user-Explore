import React, { useEffect, useState } from 'react'
import "./User.css";
import site from "../../../assets/site.png";
import github from "../../../assets/github.png";
import location from "../../../assets/location.png";
import user from "../../../assets/user.png";
import { Link, useParams} from 'react-router-dom';
import axios from 'axios';
import Repo from '../../ui/repo';


const User = () => {

    const { login } = useParams();

    //User Information
    const [userInfo, setUserInfo] = useState({});

    // user repo
    const [repos, setRepos] = useState([]);

    useEffect(() => {
    const fetchUserInformation = async () => {
      try {
        const response = await Promise.all([
          // axios.get(`/users/${login}`),
          axios.get(`https://api.github.com/users/${login}`),
          axios.get(`https://api.github.com/users/${login}/repos`),
        ]);
        setUserInfo(response[0].data);
        setRepos(response[1].data);
        // console.log(response[0].data);
        // console.log(response[1].data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserInformation();
  }, []);
  return (
    <div className='container'>
    <Link to="/" className='back'>Back</Link>
         <div className="user-informtion">
            <div className="image">
            <img src={userInfo.avatar_url} alt="" />
            </div>
            <div className="user-content">
                <h3>{userInfo.login}</h3>
                <p>{userInfo.bio}</p>
                <div className="more-data">
                <p>
                <img src={user} alt="" /> {userInfo.followers
} Followers,  {userInfo.following}. Following 

                </p>
                {userInfo?.location &&<p>
                <img src={location} alt="" />
                {userInfo.location}
                </p>}

                {userInfo?.blog &&<p><img src={site} alt="" />{userInfo.blog}</p>}
                <p><img src={github} alt="" /><a href="userInfo.html_url">View Github Profile
</a></p>

                </div>
            </div>
         </div>
         <div className="user-repos">
         {repos ? 
          repos?.map((repo) =>{
           return <Repo repos = {repo} key={repo.id} />
          }):(
            <h2>There is nothing to display...</h2>
          )
         }
         </div>
    </div>
  );
};

export default User
