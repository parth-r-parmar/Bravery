import Header from "../Components/Header/Header";
import {landingPageRoutes} from "../Routes/MenuLists/landingPageRoutes";
import {LayoutContainer, SectionWrapper, SiteContainer} from "../Layout/Layout";

const LandingPage = () => {
  return (
    <LayoutContainer>
      <Header routes={landingPageRoutes} />
      <SectionWrapper>
        <SiteContainer
          logo={{
            url: "Bravery.jpg",
            isStatic: true,
          }}
          heading='Bravery'
          id='home'
        >
          <div>
            <p className='masthead-subheading mb-0'>BE AWARE</p>
            <p className='masthead-subheading mb-0'>BE SAFE</p>
          </div>
        </SiteContainer>

        <SiteContainer heading='About' id='about'>
          <div className='container flex items-center flex-col'>
            Our aim is to provide a smart and easy way to register a complaint through our web
            application. It will convert the existing manual compliant management system into an
            automated system. It will help people to register municipal, police and emergency
            complaints.By this system the public can save his time and eradicate corruption in
            government offices
          </div>
        </SiteContainer>
      </SectionWrapper>
    </LayoutContainer>
  );
};

export default LandingPage;
