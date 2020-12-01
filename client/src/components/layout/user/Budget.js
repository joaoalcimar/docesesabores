import React, { Fragment } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWhatsapp
} from "@fortawesome/free-brands-svg-icons";
const Budget = () => {

  return (
    <Fragment>
      <section className="bg">
      <section className="container">

      <h1 className='large text-primary'>Orçamento</h1>
      <h1 className='lead'>Fale conosco e faça já seu orçamento!</h1>
          <div class="social-container">
            <a href="https://web.whatsapp.com/send?phone=5584991142096" className="social">
              <FontAwesomeIcon icon={faWhatsapp} size="10x" />
            </a>
          </div>

      </section>
      </section>
    </Fragment>
  );
};


export default (Budget);