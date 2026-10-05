import React from "react";
import Image from "next/image";
import "./WelzokartInterface.scss";

export function WelzokartInterface() {
  return (
    <section id="ui-ux" className="welzokart-interface-lc">
      <div className="interface-lc-container">
        
        <div className="interface-lc-header">
          <span className="lc-eyebrow">UI/UX</span>
          <h2 className="lc-headline">
            Intuitive Design, Effortless Experience
          </h2>
          <p className="lc-desc">
            We crafted a clean, user-friendly interface with smooth navigation, making finding products, scheduling deliveries, and payments simple and accessible for every user.
          </p>
        </div>

        <div className="interface-lc-grid-new">
          <div className="grid-row-split">
            <Image src="/shots/Welzokart 2.jpg" alt="UX screen 1" width={600} height={800} priority className="ui-img-half" />
            <Image src="/shots/Welzokart_ui-3.jpg" alt="UX screen 4" width={600} height={800} className="ui-img-half" />
          </div>
          <div className="grid-row-split">
            <Image src="/shots/Welzokart_ui-1.jpg" alt="UX screen 2" width={600} height={800} className="ui-img-half" />
            <Image src="/shots/Welzokart_ui-2.jpg" alt="UX screen 3" width={600} height={800} className="ui-img-half" />
          </div>
        </div>

      </div>
    </section>
  );
}
