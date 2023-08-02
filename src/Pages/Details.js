// screen 4
import React from "react";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import ReviewCard from "../Components/ReviewCard";
import ServiceTag from "../Components/ServiceTag";
import hub from "../Images/hub.png";
import marketplace from "../Images/marketplace.png";
import bookas from "../Images/bookas.png";
import { useSelector } from "react-redux";
import events from "../Images/events.png";
import servicetag from "../Images/servicetag.png";
import "./details.css";
import "./BookServices";
import { useNavigate } from "react-router-dom";
import "../responsive.css";
import { Link } from "react-router-dom";
import NextJsCarousel from "../Components/Carousel";
function Details() {
  const navigate = useNavigate();
  const handleRouteChange = (url,datas) => {
    navigate(url, { state: { data: datas } });
  };
  const token = useSelector((state) => state.auth.token);;

  return (
    <div className="details-page">
      <Header />
      {/* caorusel here  */}
      <NextJsCarousel/>
      {/* services */}
      <div className="our-services">
        <div className="wrapper">
          <h2 className="main-heading">Our Services</h2>
          <div className="servicetags-container">
            <Link to="/bookservices">
              <ServiceTag icon={bookas} name="Book a Service" />
            </Link>

            <Link to="/marketplace">
              {" "}
              <ServiceTag icon={marketplace} name="Marketplace" />
            </Link>
            {token ?     <Link to="/events">
              <ServiceTag icon={events} name="Events" />
            </Link>: <Link to="/guest-event">
              <ServiceTag icon={events} name="Events" />
            </Link>}
            {token ?  <Link to="/servicehub">
              <ServiceTag icon={hub} name="HUB" />
            </Link>:
            <Link to="/login">
              <ServiceTag icon={hub} name="HUB" />
            </Link>}
          </div>
        </div>
      </div>
      {/* What we do */}
      <div className="whatwedo">
        <div className="wrapper">
          <h2>What we do!</h2>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </p>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </p>
        </div>
      </div>
      {/* Our Reviews */}
      <div className="our-reviews">
        <div className="wrapper">
          <h2>Our Reviews!</h2>
          <div className="reviewers-container">
            <ReviewCard icon={servicetag} name="Kevin Mark" />
            <ReviewCard icon={servicetag} name="Preita k" />
            <ReviewCard icon={servicetag} name="John Levi" />
          </div>
        </div>
      </div>
      {/* ends here*/}
      <Footer />
    </div>
  );
}

export default Details;
