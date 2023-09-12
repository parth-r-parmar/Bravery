import {FC, ReactNode} from "react";

interface layoutProps {
  children: ReactNode;
  className?: string;
}

export const LayoutContainer: FC<layoutProps> = (props) => {
  return <div className={`h-screen ${props.className}`}>{props.children}</div>;
};

export const SectionWrapper: FC<layoutProps> = (props) => {
  return (
    <div style={{padding: "4rem 0"}} className={`h-full ${props.className || ""}`}>
      {props.children}
    </div>
  );
};

interface siteContainerProps {
  children: ReactNode;
  heading: string;
  id: string;
  logo?: any;
}

export const SiteContainer: FC<siteContainerProps> = (props) => {
  const {logo, heading = "", children, id} = props;
  return (
    <div className='site-container' id={id}>
      <div className='masthead bg-white rounded shadow-lg text-center'>
        <div className='container flex items-center flex-col'>
          {logo && logo.url && (
            <img
              className='masthead-avatar mb-5'
              src={`${
                logo.isStatic
                  ? require("../Assets/imgs/" + logo.url)
                  : logo.url ?? require("../Assets/imgs/User.jpg")
              }`}
              alt='Logo'
            />
          )}

          {heading && <div className='masthead-heading uppercase mb-0 text-2xl'>{heading}</div>}

          <div className='divider-custom'>
            <div className='divider-custom-line'></div>
            <div className='divider-custom-icon'>
              <i className='fas fa-star'></i>
            </div>
            <div className='divider-custom-line'></div>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
};

SiteContainer.defaultProps = {
  logo: {
    url: "",
    isStatic: false,
  },
  heading: "",
  children: "",
};
