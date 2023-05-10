import React, { useRef, useState } from 'react';
import './App.css';
import Preview from './component/preview';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function FormInput() {
  const [formData, setFormData] = React.useState([{
    fullname: "",
    title: "",
    address: "",
    phonenumber: "",
    email: "",
    description: ""
  }]);

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const dataForm = [...formData];
    dataForm[index][name] = value;
    setFormData(dataForm);
    console.log("change");
  }

  // Work experience
  const [expData, setExpData] = React.useState([{
    workInformation: {
      position: "",
      workdescription: "",
      company: "",
      location: "",
      begin: "",
      last: ""
    }
  }]);

  const handleWorkDelete = (index) => {
    const dataForm = [...expData];
    dataForm.splice(index, 1);
    setExpData(dataForm);
    console.log("delete");
  }

  function handleWorkAdd() {
    setExpData([...expData, {
      workInformation: {
        position: "",
        workdescription: "",
        company: "",
        location: "",
        begin: "",
        last: "",
      }
    }]);
    console.log("add clicked");
  }

  const handleWorkChange = (e, index) => {
    const { name, value } = e.target;
    const dataForm = [...expData];
    dataForm[index].workInformation[name] = value;
    setExpData(dataForm);
    console.log("change");
  }

  // Education
  const [eduData, setEduData] = React.useState([{
    universityInfo: {
      university: "",
      city: "",
      degree: "",
      major: "",
      start: "",
      end: ""
    }
  }]);

  console.log(eduData);

  const handleEduDelete = (index) => {
    const dataForm = [...eduData];
    dataForm.splice(index, 1);
    setEduData(dataForm);
    console.log("delete");
  };

  function handleEduAdd() {
    setEduData([
      ...eduData,
      {
        universityInfo: {
          university: "",
          city: "",
          degree: "",
          major: "",
          start: "",
          end: ""
        }
      }
    ]);
    console.log("add clicked");
  }

  const handleEduChange = (e, index) => {
    const { name, value } = e.target;
    const dataForm = [...eduData];
    dataForm[index].universityInfo[name] = value;
    setEduData(dataForm);
    console.log("change");
  };
  //Image Upload
  const [image, setImage] = React.useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      setImage(e.target.result);
    };
    reader.readAsDataURL(file);
  };
  //PDF
  const [pdfData, setPdfData] = useState(null);
  const contentRef = useRef(null);

  const handleGeneratePDF = () => {
    if (contentRef.current) {
      html2canvas(contentRef.current, {
        scale: 1.2 // increase the scale to improve the quality
      }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'PNG', 0, 0);
        const pdfBlob = pdf.output('blob');
        const pdfUrl = URL.createObjectURL(pdfBlob);
        setPdfData(pdfUrl);
      });
    }
  };
  return (
    <div>
      <div className='formWrapper'>
        <form>
          <div className='personalTitle'>Personal Information</div>
          {formData.map((singleData, index) => (
            <div key={index} className='personal-form'>
              <input
                type='text'
                maxLength={50}
                placeholder='Full Name'
                onChange={(e) => handleChange(e, index)}
                name='fullname'
                value={singleData.fullname}
              />

              <input
                type='text'
                maxLength={50}
                placeholder='Title'
                onChange={(e) => handleChange(e, index)}
                name='title'
                value={singleData.title}
              />
              <input
                type = "text"
                maxLength={50}
                placeholder= "Address"
                onChange = { (e) => handleChange(e,index)}
                name = "address"
                value = {singleData.address}
              />
            <input
                type="tel"
                maxLength={14}
                pattern="[0-9()-]*"
                placeholder="Phone number"
                 onChange={(e) => {
                  const onlyNums = e.target.value.replace(/[^0-9()-]/g, '');
                  if (onlyNums.length <= 14) { 
                    handleChange({ target: { name: 'phonenumber', value: onlyNums } }, index);
                  }
                }}
                name="phonenumber"
                value={singleData.phonenumber}
              />
              <input
                type = "text"
                maxLength={50}
                placeholder= "Email"
                onChange = { (e) => handleChange(e,index)}
                name = "email"
                value = {singleData.email}
              />
              <input
                type = "text"
                maxLength={500}
                placeholder= "Description"
                onChange = { (e) => handleChange(e,index)}
                name = "description"
                value = {singleData.description}
              />    
            </div>
            ))}
             <div>
              <div> Profile Picture </div>
              <input type="file" onChange={handleImageChange} />
            </div>
            
        </form>

        <form> 
          <div className='experienceTitle'>Experience</div>
          {expData.map((singleData, index) => (    
            <div key={index} className='experience-form'>
              <input 
                type="text"
                maxLength={50}
                placeholder="Position"
                onChange={(e) => handleWorkChange(e, index)}
                name="position"
                value={singleData.workInformation.position}
              /> 
              <input
                type="text"
                maxLength={500}
                placeholder="Work Description"
                onChange={(e) => handleWorkChange(e, index)}
                name="workdescription"
                value={singleData.workInformation.workdescription}
              />
              <input
                type="text"
                maxLength={50}
                placeholder="Company"
                onChange={(e) => handleWorkChange(e, index)}
                name="company"
                value={singleData.workInformation.company}
              />
              <input
                type="text"
                maxLength={60}
                placeholder="Company Location"
                onChange={(e) => handleWorkChange(e, index)}
                name="location"
                value={singleData.workInformation.location}
              />
              <input
                type="text"
                maxLength={8}
                placeholder="Start-date"
                onChange={(e) => handleWorkChange(e, index)}
                name="begin"
                value={singleData.workInformation.begin}
              
              />
              <input
                type="text"
                maxLength={8}
                placeholder="End-date"
                onChange={(e) => handleWorkChange(e, index)}
                name="last"
                value={singleData.workInformation.last}
              />
              {expData.length > 1 && (
                <div className='deleteExp' onClick={() => handleWorkDelete(index)}> 
                  Delete
                </div>
              )}
              {expData.length - 1 === index && expData.length < 5 && (
                <div className='addExp' onClick={handleWorkAdd}> 
                  Add Experience
                </div>
              )}
            </div>
          ))}
        </form>

        <form> 
          <div className='educationTitle'>Education</div>
          {eduData.map((singleData, index) => (    
            <div key={index} className='education-form'>
              <input 
                type="text"
                maxLength={35}
                placeholder="University"
                onChange={(e) => handleEduChange(e, index)}
                name="university"
                value={singleData.universityInfo.university}      
              /> 
              <input
                type="text"
                maxLength={50}
                placeholder="City"
                onChange={(e) => handleEduChange(e, index)}
                name="city"
                value={singleData.universityInfo.city}
              />
              <input
                type="text"
                maxLength={30}
                placeholder="Degree type"
                onChange={(e) => handleEduChange(e, index)}
                name="degree"
                value={singleData.universityInfo.degree}
              />
              <input
                type="text"
                maxLength={35}
                placeholder="Major"
                onChange={(e) => handleEduChange(e, index)}
                name="major"
                value={singleData.universityInfo.major}
              />
              <input
                type="text"
                maxLength={8}
                placeholder="From"
                onChange={(e) => handleEduChange(e, index)}
                name="start"
                value={singleData.universityInfo.start}
              />
              <input
                type = "text"
                maxLength={8}
                placeholder= "To"
                onChange = { (e) => handleEduChange(e,index)}
                name = "end"
                value = {singleData.universityInfo.end}
              />
              {eduData.length  >1 && <div className='deleteEdu' onClick= { () => handleEduDelete(index)} > 
              Delete</div>}
    
              {eduData.length -1 === index && eduData.length<5 && 
              <div className='addEdu' onClick= {handleEduAdd}> Add Education</div> 
              }
            </div>
          ))} 
        </form>
        </div> 
        <div className='centerBtn'> 
          <button onClick={handleGeneratePDF} className="generateBtn">Generate PDF</button> 
          {pdfData && (
        <a href={pdfData} target="_blank" rel="noreferrer" className='filePdf'>
          Download PDF
        </a>
      )}
        </div>
        
        <div>
      
        <div>
  
      <div ref={contentRef}>
        {
     
        <Preview 
          image = {image} 
          fullname = {formData.map((singleData,index) => (
                  <div key={index}>
                  {singleData.fullname && <section>{singleData.fullname} </section>}
                  </div>
              )) }
        
          title = {formData.map((singleData,index) => (
              <span key={index}>
              {singleData.title} 
              </span>
          )) }
          address = {formData.map((singleData,index) => (
              <span key={index}>
              {singleData.address && <section>{singleData.address} </section>}
              </span>
          )) }
          phonenumber = {formData.map((singleData,index) => (
              <span key={index}>
              {singleData.phonenumber && <span>{singleData.phonenumber} </span>}
              </span>
          )) }
          email = {formData.map((singleData,index) => (
              <span key={index}>
              {singleData.email && <span>{singleData.email} </span>}
              </span>
          )) }

          description = {formData.map((singleData,index) => (
              <span key={index}>
              {singleData.description && <span>{singleData.description} </span>}
              </span>
          )) }

        //Work props
        workInformation={expData.map((singleData) => (
          <div className="universityInfo">
            <span className='universitytitle'> {singleData.workInformation.position}</span>
            {singleData.workInformation.company && (
              <span className='universitytitle'>, {singleData.workInformation.company}</span>
            )}{" "}
          <div>
            {singleData.workInformation.location && (
              <span className='italic'> {singleData.workInformation.location}</span>
            )}{" "}
            <br></br>
            {singleData.workInformation.workdescription && (
            <span className='duration'> {singleData.workInformation.workdescription}</span>
            )}  
            {" "} <br></br>
            {singleData.workInformation.begin && (
              <span className='duration'> {singleData.workInformation.begin}</span>
            )}{" "}
            {singleData.workInformation.last && (
              <span className='duration'>- {singleData.workInformation.last}</span>
            )}
            </div>
          </div>
        ))}

        //Education props
        universityInfo={eduData.map((singleData) => (
            <div className="universityInfo">
               <span className='universitytitle'> {singleData.universityInfo.university}</span>
                {singleData.universityInfo.city && (
                  <span className='universitytitle'>, {singleData.universityInfo.city}</span>
                )}  
                {" "}
                 <div>
                {singleData.universityInfo.degree && (
                  <span className='degreeInfo'>Degree: {singleData.universityInfo.degree}</span>
                )}{" "}
                <br></br>
                {singleData.universityInfo.major && (
                  <span className='majorInfo'>Major: {singleData.universityInfo.major}</span>
                )}{" "}
                <br></br>
                {singleData.universityInfo.start && (
                  <span className='duration'> {singleData.universityInfo.start}</span>
                )}{" "}
                {singleData.universityInfo.end && (
                  <span className='duration'>- {singleData.universityInfo.end}</span>
                )}
              </div>
            </div>
          ))}
      /> 
      }</div>
     
    </div>
    </div>
  </div>
  )
}
