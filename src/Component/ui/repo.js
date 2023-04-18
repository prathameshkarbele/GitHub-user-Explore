import React from 'react'

const repo = ({repos}) => {

    const {name, html_url, description, language} = repos
    console.log(repos);
  return (
    <div className="repo">
                <h3><a href={html_url}>{name} </a> </h3>
                <p>{description}.</p>
                {language &&<small>Written in {language}</small>}
            </div>
  )
}

export default repo

