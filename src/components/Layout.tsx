import styled from "styled-components";
import {HEADER_HEIGHT} from "./PageHeader";

export const PageColumns = styled.div`
display: grid;
grid-template-columns: 1fr 1fr 1fr;
  font-size: 60%;
grid-gap: 2mm;
margin-top: ${HEADER_HEIGHT};
`;


export const TwoColumn = styled.div`
display: grid;
grid-template-columns: 1fr 1fr;
grid-gap: 2mm;`;

export const PageSection = styled.section`
margin-bottom: 2em;
`;

export const LeftRight = styled.div`
display: flex;
justify-content: space-between;
`;

export const CompactCard = styled.div`
padding: 1mm;
margin: 0;
background: white;
  color: #242424;
box-shadow: 0 0 1mm rgba(0, 0, 0, 0.5);
  line-height: 0.9;
  font-size: 65%;
  font-weight: 500;
  min-height: 10px;
  max-height: 25px;
  height: min-content;
  
  & > code {
    margin: 0;
  }
  
`;

export const Callout = styled.aside`
padding: 1mm;
margin: 0;
background: white;
  font-weight: 300;
box-shadow: 0 0 1mm rgba(0, 0, 0, 0.5);
    line-height: 0.9;
    font-size: 65%;
    min-height: 10px;
    height: min-content;
`;
