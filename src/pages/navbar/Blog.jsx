import React from 'react';
import ebc from '../../Assets/ebc.jpg';
import fewa from '../../Assets/fewa2.jpg';
import manaslu from '../../Assets/manaslu.jpg';
import rara from '../../Assets/rara.jpg';
import Footer from '../../components/Footer';
import '../../CSS/Blog.css';

function Blog() {
  return (
    <>
      <section id="page-header" className="blog-header">
        <h2>#readmore</h2>
        <p>Read all case studies about popular destinations!</p>
      </section>

      <section id="blog">
        <div className="blog-box">
          <div className="blog-img">
            <img src={fewa} alt="Pokhara" />
          </div>
          <div className="blog-details">
            <h4>Pokhara</h4>
            <p>Pokhara is a metropolitan city in central Nepal, which serves as the capital of Gandaki Province and the ...</p>
            <a href="https://en.wikipedia.org/wiki/Pokhara">CONTINUE READING</a>
          </div>
          <h1>12/05</h1>
        </div>
        <div className="blog-box">
          <div className="blog-img">
            <img src={manaslu} alt="Manaslu" />
          </div>
          <div className="blog-details">
            <h4>Manaslu Circuit</h4>
            <p>Manaslu Circuit Trek is a picturesque and undoubtedly off-beaten journey in Nepal. It is probably the most underrated trekking ...</p>
            <a href="https://en.wikipedia.org/wiki/Manaslu">CONTINUE READING</a>
          </div>
          <h1>13/01</h1>
        </div>
        <div className="blog-box">
          <div className="blog-img">
            <img src={rara} alt="Rara Lake" />
          </div>
          <div className="blog-details">
            <h4>Rara Lake</h4>
            <p>Rara Lake, also known as Mahendra Lake, is the largest freshwater lake in the Nepalese Himalayas. It is the main feature of Rara National Park, located in ...</p>
            <a href="https://en.wikipedia.org/wiki/Rara_Lake">CONTINUE READING</a>
          </div>
          <h1>17/07</h1>
        </div>
        <div className="blog-box">
          <div className="blog-img">
            <img src={ebc} alt="Mount Everest" />
          </div>
          <div className="blog-details">
            <h4>Mount Everest</h4>
            <p>Mount Everest is Earth's highest mountain above sea level, located in the Mahalangur Himal sub-range of the Himalayas. The China ...</p>
            <a href="https://en.wikipedia.org/wiki/Mount_Everest">CONTINUE READING</a>
          </div>
          <h1>19/04</h1>
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
    </>
  );
}

export default Blog;
