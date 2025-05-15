import React from 'react'
import "./Faq.css"
import FaqBox from '../../ui/FaqBox'
import Navbar from '../../common/Navbar';
import Footer from '../../common/Footer';

function Faq() {
   

    const faqData=[
    {question:"What types of properties are available?" , answer:"We offer a variety of properties, including flats, houses, shops, and office spaces, tailored to meet your needs."},
    {question:"Is this platform available only for Gujarat properties?" , answer:"Yes, our platform specializes in property listings exclusively within Gujarat. We focus on providing the best real estate opportunities in this region."},
    {question:"Which cities are covered on this platform?" , answer:"Currently, we offer property listings in **Surat, Ahmedabad, Bhavnagar, Rajkot, and Vadodara**. More cities will be added in the future."},
    {question:"How can I list my property on your website? " , answer:"You can list your property by creating an account, clicking on the 'Post Property' button, and filling in the required details."},
    {question:"Can I edit or remove my property listing? " , answer:"Yes, you can manage your listings from your account dashboard or my listing, where you can edit or remove your properties at any time."},
    {question:"How do I search for a property? " , answer:"You can use our search tool on the filter serch page to filter properties by type, location, and price range."},
    {question:"How do I contact a property owner?" , answer:"You can contact the property owner directly through the contact details provided on each listing."},
    {question:"Is there a fee for property listings?" , answer:"No, listing properties on our platform is absolutely free of charge."},
    {question:"Do I need to pay any commission?" , answer:"No, we do not charge any commission for property transactions. You can buy, sell, or rent properties without extra fees."},
    {question:"Are the properties verified?" , answer:"Yes, we verify all property listings to ensure accuracy and reliability before making them available to users."},
    {question:"Can I schedule a property visit?" , answer:"Yes, you can contact the property owner directly to schedule a visit. Contact details are available on each listing."},
    {question:"Is my personal information secure on your platform?" , answer:"Yes, we prioritize user privacy and use encryption methods to protect your personal and transaction data."},
    ];


  return (
    <>
    <Navbar/>
    <div className="faq-container">
    <h2>Frequently Asked Questions</h2>
    {
        faqData && faqData.length >0 ?
        faqData.map((item,index)=>{
          return <FaqBox  faqitem={item}  key={index}/>
        })
       :null
    }
  </div>
  <Footer/>
    </>
  )
}

export default Faq