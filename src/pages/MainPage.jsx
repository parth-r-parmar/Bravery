import React from "react";
import Header from "../Components/Header/Header";
import SiteContainer from "../Components/Header/SiteContainer";
import {mainPageRoutes} from "../NavRoutes/mainPageRoutes";

const MainPage = () => {
  return (
    <>
      <Header routes={mainPageRoutes} />
      <SiteContainer
        logo={{
          url: "Bravery.jpg",
          isStatic: true,
        }}
        heading='Bravery'
      >
        <div>
          <p className='masthead-subheading font-weight-light mb-0'>BE AWARE</p>
          <p className='masthead-subheading font-weight-light mb-0'>BE SAFE</p>
        </div>
      </SiteContainer>

      <SiteContainer heading='About'>
        <div className='container d-flex align-items-center flex-column'>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Expedita explicabo unde modi
          illum laboriosam facere est totam praesentium possimus animi, porro dolorem! Facilis illo
          nulla corrupti pariatur nostrum illum quia. Lorem ipsum dolor sit amet consectetur,
          adipisicing elit. Placeat natus a hic, quaerat minus adipisci, harum consequuntur culpa ea
          nulla repudiandae deleniti alias velit. Animi provident quidem explicabo architecto
          officia? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maiores natus eaque ea
          alias, dolor eum totam at amet deserunt explicabo facere. Rerum porro pariatur in suscipit
          dolor quidem voluptas optio?
        </div>
      </SiteContainer>

      {/* <div className='site-container' id='about'>
        <div className='bg-white rounded p-5 shadow-lg text-center'>
          <h1 className='text-uppercase mb-0'>About</h1>
          <div className='divider-custom'>
            <div className='divider-custom-line'></div>
            <div className='divider-custom-icon'>
              <i className='fas fa-star'></i>
            </div>
            <div className='divider-custom-line'></div>
          </div>
          
        </div>
      </div> */}
    </>
  );
};

export default MainPage;
