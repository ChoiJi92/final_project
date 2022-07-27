import React from "react";
import { Helmet } from "react-helmet-async";

const MetaTag = () => {
  return (
    <Helmet>
      <title></title>
      <meta name="description" content="" />
      <meta name="keywords" content="" />

      <meta property="og:type" content="website" />
      <meta property="og:title" content="" />
      <meta property="og:site_name" content="" />
      <meta property="og:description" />
      <meta property="og:image" content="" />
      <meta property="og:url" content="" />

      <meta name="twitter:title" content="" />
      <meta name="twitter:description" content="" />
      <meta name="twitter:image" content="" />
    </Helmet>
  );
};

export default MetaTag;
