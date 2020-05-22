import React, {useState, useEffect} from "react";

import {axiosWithAuth} from "./axiosWithAuth";

const Jokes = () => {
    const [jokes, setJokes] = useState([])

    useEffect(()=>{
        axiosWithAuth()
        .get('/api/jokes')
        .then(res => {
            console.log(res.data)
            setJokes(res.data)
        })
    },[])
    return(
        <div className="jokes">
            {jokes.map(item => {
                return(
                    <div className="joke">
                        <p>{item.joke}</p>
                     </div>
                )
            })}
        </div>
    )
}

export default Jokes;