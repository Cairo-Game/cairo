import React from "react";
import styled from "styled-components";
import { TSeparator } from "./separator.types";

export const MainSeparator = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${(props: TSeparator) => props.color};
`;
