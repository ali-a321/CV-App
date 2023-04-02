import '../App.css';
import React from 'react';
import defaultPic from "../images/default.jpg"

export default function Preview(props) {
  return (
    <div className=''>
      <div className='previewHeader'>
        <div className='previewInfo'>{props.fullname}</div>
        <div className='titleInfo'>{props.title}</div>
      </div>

      <div className='infoContainer'>
        <div className='columnContainer'>
          <div className='descriptionHeader'>
            Description
            <div className='descriptionInput'>{props.description}</div>
          </div>
          <div className='experienceHeader'>
            Experience
            <div className='workRole'>{props.workInformation}</div>
          </div>
          <div className='educationHeader'>
            Education
            <div className='educationInput'>
              <div className='universityInfo'>{props.universityInfo}</div>
            </div>
          </div>
        </div>

        <div className='personalInfoContainer'>
          <div className='personalDetails'>
            <img src={props.image ||defaultPic } alt='person' className='uploadedImg' />
            Personal Details
         
          </div>
          <div className='addressInfo'>{props.address}</div>
          <div>{props.phonenumber}</div>
          <div className='emailInfo'>{props.email}</div>
        </div>
      </div>
    </div>
  );
}