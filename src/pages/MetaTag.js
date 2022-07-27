import React from "react";
import { Helmet } from "react-helmet-async";
import ogImage from '../../public/ogImage.webp'
const MetaTag = () => {
  return (
    <Helmet>
      <title>멘도롱 제주</title>
      <meta name="description" content="" />
      <meta name="keywords" content="멘도롱,제주,한달살기" />

      <meta property="og:type" content="website" />
      <meta property="og:title" content="멘도롱 제주" />
      <meta property="og:description" content=""/>
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content="https://mendorong-jeju.co.kr" />

      <meta name="twitter:title" content="" />
      <meta name="twitter:description" content="" />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:url" content="https://mendorong-jeju.co.kr" />
    </Helmet>
  );
};

export default MetaTag;
