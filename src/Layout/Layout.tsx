import {FC, ReactNode} from "react";

interface layoutProps {
  children: ReactNode;
  className?: string;
}

export const LayoutContainer: FC<layoutProps> = (props) => {
  return (
    <div style={{height: "100vh"}} className={props.className}>
      {props.children}
    </div>
  );
};

export const SectionWrapper: FC<layoutProps> = (props) => {
  return (
    <div style={{padding: "4rem 0"}} className={`h-100 ${props.className || ""}`}>
      {props.children}
    </div>
  );
};

interface siteContainerProps {
  children: ReactNode;
  heading: string;
  logo?: any;
}

export const SiteContainer: FC<siteContainerProps> = (props) => {
  const {logo, heading = "", children} = props;
  return (
    <div className='site-container'>
      <div className='masthead bg-white rounded shadow-lg text-center'>
        <div className='container d-flex align-items-center flex-column'>
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

          {heading && <h1 className='masthead-heading text-uppercase mb-0'>{heading}</h1>}

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
