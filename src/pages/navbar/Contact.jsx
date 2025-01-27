import React from 'react';
import '../../CSS/Contact.css';
import me from '../../Assets/me.png'
import Footer from '../../components/Footer';


const Contact = () => {
    return (
        <>

        <div>
            <section id="page-header" className="about-header">
                <h2>#let's_talk</h2>
                <p>LEAVE A MESSAGE, We love to hear from you.</p>
            </section>

            <section id="contact-details" className="section-p1">
                <div className="details">
                    <span>GET IN TOUCH</span>
                    <h2>Visit our location or contact us today</h2>
                    <h3>Store</h3>
                    <div>
                        <li>
                            <i className="fa fa-globe" aria-hidden="true"></i>
                            <p>Newroad, Kathmandu</p>
                        </li>
                        <li>
                            <i className="fa fa-envelope-o" aria-hidden="true"></i>
                            <p>pantaanish77@gmail.com</p>
                        </li>
                        <li>
                            <i className="fa fa-phone" aria-hidden="true"></i>
                            <p>9851204941</p>
                        </li>
                        <li>
                            <i className="fa fa-clock-o" aria-hidden="true"></i>
                            <p>Sunday to Friday: 9:00am to 6pm</p>
                        </li>
                    </div>
                </div>

                <div className="map">
                    <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.077296819971!2d85.29039569999998!3d27.714899600000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb188d9b82c8ad%3A0xae31bde410797bf7!2sSwoyambhu%20Mahachaitya!5e0!3m2!1sen!2snp!4v1689772447911!5m2!1sen!2snp" 
                        width="600" 
                        height="450" 
                        style={{border: 0}} 
                        allowFullScreen="" 
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade">
                    </iframe>
                </div>
            </section>

            <section id="form-details">
                <form action="">
                    <span>LEAVE A MESSAGE</span>
                    <h2>We love to hear from you</h2>
                    <input type="text" placeholder="Your Name" />
                    <input type="text" placeholder="E-mail" />
                    <input type="text" placeholder="Subject" />
                    <textarea cols="30" rows="10" placeholder="Your Message"></textarea>
                    <button className="normal">Submit</button>
                </form>

                <div className="people">
                    <div>
                        <img src={me} alt="" />
                        <p>
                            <span>Anish Panta </span> Owner <br />
                            phone: +977 9851204941 <br />
                            Email: pantaanish77@gmail.com
                        </p>
                    </div>
                </div>
            </section>

            <section id="newsletter" className="section-p1 section-m1">
                <div className="newstext">
                    <h4>Sign Up For Newsletters</h4>
                    <p>Get E-mail updates about our latest shop and <span>special offers.</span></p>
                </div>
                <div className="form">
                    <input type="text" placeholder="Your email address" />
                    <button className="normal">Sign Up</button>
                </div>
            </section>
            <div>
              <Footer />
            </div>
        </div>
        </>
    );
};

export default Contact;