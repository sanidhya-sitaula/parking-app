import React from 'react'; 
import Header from './Header'; 

const About = (props) => {
    const {userDetails} = props; 
    return (
        <div>
            <Header title = "About" userDetails = {userDetails} />
            <div className = "explore-message">
                <p className = "about-description">This is a store finder tool.</p>
                <p className = "about-description">Created by Aryama Upadhyaya</p>
            </div>
        </div>
    )
}

export default About; 