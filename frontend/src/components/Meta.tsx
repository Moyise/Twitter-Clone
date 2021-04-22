import React, { FunctionComponent } from "react";
import { Helmet } from "react-helmet";

interface IMeta {
  title: string;
  description?: string;
  keywords?: string;
}

const Meta: FunctionComponent<IMeta> = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title} /Twitter</title>
    </Helmet>
  );
};

export default Meta;
