import styled from "styled-components";
import { HEADER_HEIGHT } from "./PageHeader";

export const PageColumns = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  font-size: 60%;
  grid-gap: 2mm;
  margin-top: ${HEADER_HEIGHT};
`;

export const PageTwoColumn = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 2mm;
    margin-top: ${HEADER_HEIGHT};
`;


export const TwoColumn = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 2mm;
`;

export const PageSection = styled.section`
  margin-bottom: 2em;
`;

export const LeftRight = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const CompactCard = styled.div`
  class: with-background;
  padding: 1mm;
  box-shadow: 0 0 0.5mm rgba(0, 0, 0, 0.2);
  line-height: 0.9;
  font-weight: 500;
  min-height: 10px;
  height: min-content;
  margin: 0.5mm 0 0.55mm;

  & > code {
    margin: 0;
  }
`;

export const TrueCard = styled(CompactCard)`
  box-shadow: 0 0 0.5mm rgba(0, 130, 0, 0.8);
`;

export const FalseCard = styled(CompactCard)`
  box-shadow: 0 0 0.5mm rgba(130, 0, 0, 0.8);
`;

export const Callout = styled.aside`
  padding: 1mm;
  background: white;
  font-weight: 300;
  border-radius: 1mm;
  box-shadow: 0 0 0.5mm rgba(0, 0, 0, 0.2);
  line-height: 0.9;
  min-height: 10px;
  height: min-content;
  margin-bottom: 0.5mm;
`;

export const Footer = styled.footer`
  position: static;
  margin-top: 2em;

  height: ${HEADER_HEIGHT};
  padding: 0 1em;

  align-content: center;

  display: flex;
  justify-content: space-between;
  align-items: center;

  // draw lines between items inside
  & > * {
    display: inline-block;
    margin-right: 1em;
    border-right: 1px solid rgba(130, 130, 130, 0.5);
    padding-right: 1em;
    text-align: center;
    width: 100%;
    font-size: 90%;
    color: unset;

    &:last-child {
      border-right: none;
      padding-right: 0;
    }
  }
`;

export const OrderedList = styled.ol`
  list-style: decimal;
  padding: 0 0 0 1em;
  margin: 1em 0;
  font-size: 90%;
  line-height: 1.2;
  font-weight: 300;

  & > li {
    border-bottom: 1px solid rgba(130, 130, 130, 0.5);
    margin-bottom: 0.5em;

    & :last-child {
      margin-bottom: 0;
      border-bottom: none;
    }

    & > :first-child {
      margin-top: 0;
    }
  }

  & > li > p {
    margin: 0;
  }

  & > li > p > code {
    margin: 0;
  }

  & :last-child {
    margin-bottom: 0;
    border-bottom: none;
  }
`;

export const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  font-size: 90%;
  line-height: 1.2;
  font-weight: 300;
  margin: 1em 0;
  & th {
    text-align: left;
    padding: 0.5em;
    border-bottom: 1px solid rgba(130, 130, 130, 0.5);
    background-color: rgba(130, 130, 130, 0.1);
  }
  & td {
    font-family: "Roboto Condensed", sans-serif;
    padding: 0.5em;
    border-bottom: 1px solid rgba(130, 130, 130, 0.5);
    border-right: 1px solid rgba(130, 130, 130, 0.1);
  }

  & tr:last-child td {
    border-bottom: none;
  }

  & tr td:last-child {
    border-right: none;
  }
`;
