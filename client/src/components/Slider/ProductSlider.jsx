import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './slider.css'

const ProductSlider = (props) => {
    const settings = {
        dots: false,
        arrows: true,
        infinite: true,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1
      };
  return (
        <Slider {...settings}>
            {
                props.images.map(item => {
                    return(
                        <img key={item._id} id="prod_img" src={`http://localhost:5000/uploads/product/${item.url}`} alt="" />
                    )
                })
            }
        </Slider>
  )
}

export default ProductSlider