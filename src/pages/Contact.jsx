import React, { useState } from 'react';
// import './Contact.css'; // Assuming you will add custom CSS for styling

const Contact = () => {


  const [data,setData] = useState({
    email:'',
    message:''
  })

  const handlechange = (e) => {
     let name = e.target.name;
     let value = e.target.value;

     setData({
      ...data,
      [name]:value,
     })
  }

  const handleSubmit = async(e) => {
     e.preventDefault()

     
    try {
      const response = await fetch(
        `http://localhost:5000/api/contact`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
           
          },
          body: JSON.stringify(data),
        }
      );
      const res_data = await response.json();
      if (response.ok) {
        setData({
          email: "",
          message: "",
        
        });
       alert("Message Sent Successfully");
       
      }    } catch (error) {
      console.log(" Error while contacting", error);
    }
  }

  return (
    <div className="contact-container mt-20 border-l-neutral-600 border-x-2 border-y-2  shadow-xl shadow-slate-500">
      <h2>Get in Touch with Us</h2>
      
      <div className="contact-section">
        {/* <h3>Reach Us on Social Media</h3> */}
        {/* <div className="social-buttons">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-btn twitter">
            Twitter
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-btn instagram">
            Instagram
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-btn linkedin">
            LinkedIn
          </a>
        </div> */}
      </div>

      <div className="contact-section">
        {/* <h3>Email Us</h3> */}
        <form className="email-form" onSubmit={handleSubmit}>
          <input type="email" value={data.email} name='email' placeholder="Your Email" onChange={handlechange} required />
          <textarea placeholder="Your Message" value={data.message} name='message' onChange={handlechange} required></textarea>
          <button type="submit">Send</button>
        </form>
      </div>

      <div className="contact-section">
        <h3>Useful Links</h3>
        <ul className='flex gap-5 content-center justify-center'>
          <li><a href="/job-page">Job Page</a></li>
          <li><a href="/admit-card">Admit Card</a></li>
          <li><a href="/result-page">Result Page</a></li>
          <li><a href="https://yourwebsite.com" target="_blank" rel="noopener noreferrer">Visit Our Website</a></li>
        </ul>
      </div>
    </div>
  );
};

export default Contact;
