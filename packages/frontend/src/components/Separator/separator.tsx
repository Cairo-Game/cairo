import React from "react";
import { TSeparator } from "./separator.types";
import { MainSeparator } from "./styles";

export const Separator = ({ color }: TSeparator) => {
  return <MainSeparator color={color} />;
};
