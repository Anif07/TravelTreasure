import React, { useEffect } from "react";
import "../../styles/homePage/heroSection.css";
import db from "../../db.json";
import { useDispatch, useSelector } from "react-redux";
import {
  nextSlide,
  prevSlide,
  startAutoSlide,
  stopAutoSlide,
} from "../../redux/slices/heroSectionSlice";

const slideInterval = 3000;
function HeroSection() {
  const slide = useSelector((state) => state.heroSection.slide);
  const autoSlide = useSelector((state) => state.heroSection.autoSlide);
  const dispatch = useDispatch();

  useEffect(() => {
    let slideTimer;

    if (autoSlide) {
      slideTimer = setInterval(() => {
        dispatch(nextSlide());
      }, slideInterval);
    } else {
      clearInterval(slideTimer);
    }

    return () => clearInterval(slideTimer);
  }, [autoSlide, dispatch]);

  const leftArrowHandle = () => {
    dispatch(stopAutoSlide());
    dispatch(prevSlide());
  };
  const rightArrowHandle = () => {
    dispatch(startAutoSlide());
    dispatch(nextSlide());
  };
  return (
    <div className="HerosSectionContanier">
      <button className="arrow leftArrow" onClick={leftArrowHandle}>
        <i className="fa-solid fa-arrow-left"></i>
      </button>
      <div className="corouselInner">
        {db.images.map((obj, index) => (
          <div
            key={index}
            className={slide === index ? "slide activeSlide" : "slide"}
          >
            <img src={obj.src} alt={obj.alt} className="heroSecImg" />
            {slide === index && (
              <div className="slideContent">
                <h2>{obj.quote}</h2>
                <button className="bookInHerosection">{obj.button}</button>
              </div>
            )}
          </div>
        ))}
      </div>
      <button className="arrow rightArrow" onClick={rightArrowHandle}>
        <i className="fa-solid fa-arrow-right"></i>
      </button>
    </div>
  );
}

export default HeroSection;
