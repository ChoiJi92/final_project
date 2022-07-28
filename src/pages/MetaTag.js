import React from "react";
import { Helmet } from "react-helmet-async";
import ogImage from '../assests/css/ogImage.webp'
const MetaTag = ({title}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content="멘도롱제주에서 한달 살기를 계획해 보세요 :)"/>
      <meta name="keywords" content="멘도롱,제주,한달살기,제주도,여행,jeju"/>

      <meta property="og:type" content="website" />
      <meta property="og:title" content="멘도롱 제주" />
      <meta property="og:description" content=""/>
      <meta property="og:image" content={ogImage}/>
      <meta property="og:url" content="https://mendorong-jeju.co.kr" />

      <meta name="twitter:title" content="멘도롱 제주" />
      <meta name="twitter:description" content="멘도롱제주에서 한달 살기를 계획해 보세요 :)" />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:url" content="https://mendorong-jeju.co.kr" />
    </Helmet>
  );
};

export default MetaTag;
