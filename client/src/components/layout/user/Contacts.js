import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram
} from "@fortawesome/free-brands-svg-icons";


const Contacts = () => {
  return (
    <section className="bg">
      <div>
      <div className="dark-overlay-top">
        <div className="landing-top">
          <h1 className="large">Siga a gente nas redes sociais!</h1>
          <p className="lead">

            <div class="social-container">
                <div class="social-container">
                <a href="https://www.instagram.com/docesesaboresdamaria/"
                className="social">
                <FontAwesomeIcon icon={faFacebook} size="4x" />
                </a>
                <a href="https://www.instagram.com/docesesaboresdamaria/"
                className="social">
                <FontAwesomeIcon icon={faInstagram} size="4x" />
                </a>
                </div>
            </div>

          </p>
        </div>
      </div>
      </div>
    </section>
  )
}

export default Contacts;