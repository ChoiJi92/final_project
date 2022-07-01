export const SampleNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block",marginRight:"25px", opacity:0.7}}
        onClick={onClick}
      />
    );
  };
  
  export const SamplePrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", marginLeft:"25px", zIndex:1 ,opacity:0.7}}
        onClick={onClick}
      />
    );
  };

 export const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrow:true,
    nextArrow: <SampleNextArrow/>,
    prevArrow: <SamplePrevArrow/>
};