import { A4Paper, Image } from "../components/Paper";
import React from "react";
import { PageHeader } from "../components/PageHeader";
import { Java, SQL, TypeScript } from "../components/Code";
import {
  Callout,
  LeftRight,
  PageColumns,
  PageSection,
} from "../components/Layout";
import {
  BASIC_JAVA_EXAMPLE,
  BASIC_SQL_EXAMPLE,
  QUICK_SYMBOLS_USAGE_EXAMPLE,
} from "../assets/Code";
import {Falsehood, KeyValue, NoKey, Sach, YesKey} from "../components/KeyValue";
import Latex from "react-latex-next";
import "katex/dist/katex.min.css";
import { FaGithub } from "react-icons/fa";
import { LatexSymbol } from "../components/Latex";

import ImgER1 from "../assets/images/er-1.png";
import {Example, HowTo, HowToH3, Info, InfoH3} from "../components/QuickSymbols";
import {InfoBox, WarningBox} from "../components/ThemedBoxes";

export const TestPage: React.FC<{}> = () => {
  return (
    <A4Paper className={"no-print"}>
      <PageHeader>
        <span>
          Page <LatexSymbol symbol={"aleph_0"} /> - Test Page
        </span>
        <span>
          <FaGithub />
          /TheBigSasha
        </span>
      </PageHeader>
      <PageColumns>
        <PageSection>
          <h2>Tech Testing</h2>
          <h3>
            <LatexSymbol symbol={"LaTeX"} />
          </h3>
          <Latex>{`\$\\frac{1}{2}\$ look it's \$\\LaTeX\$ can we render cool math? Sure hope so cause we need to. \$\\text{Red}\\mid\\sigma_{\\text{condition}}(R)\\mid = \\dfrac{\\mid\\sigma_{\\text{condition}}(R)\\mid}{\\mid R \\mid}\$`}</Latex>
          <h3>SQL (syntax highlighting)</h3>
          <SQL code={BASIC_SQL_EXAMPLE} />
          <h3>Java (syntax highlighting)</h3>
          <Java code={BASIC_JAVA_EXAMPLE} />
          <h3>Long Text</h3>
          <p>
            SQL is a standard language for accessing and manipulating databases.
            SQL stands for Structured Query Language. SQL lets you access and
            manipulate databases. SQL became a standard of the American National
            Standards Institute (ANSI) in 1986, and of the International
            Organization for Standardization (ISO) in 1987.
          </p>
          <h3>Key Value / True False</h3>
          <KeyValue value={"SQL"}> Structured Query Language.</KeyValue>
          <YesKey>Java is object oriented</YesKey>
          <NoKey>Haskell is object oritented</NoKey>
          <h3>Callout</h3>
          <Callout>
            SQL is a standard language for accessing and manipulating databases.
            SQL stands for Structured Query Language. SQL lets you access and
            manipulate databases. SQL became a standard of the American National
          </Callout>
          <h3>Images & Captions</h3>
          <Image src={ImgER1} alt={"ER Diagram"} />
          <caption>
            The image above depicts a relationship between a class and itself,
            including the constraint that a company may only spin off from one
            parent company, but one parent may have many spinoffs.
          </caption>
        </PageSection>
        <PageSection>
          <h2>QuickSymbols</h2>
          <h3>
            <Example /> Worked Example
          </h3>
          <p>
            SQL is a standard language for accessing and manipulating databases.
            SQL stands for Structured Query Language. SQL lets you access and
            manipulate databases. SQL became a standard of the American National
          </p>
          <h3>
            <Info /> Information
          </h3>
          <p>
            SQL is a standard language for accessing and manipulating databases.
            SQL stands for Structured Query Language. SQL lets you access and
            manipulate databases. SQL became a standard of the American National
          </p>
          <h3>
            <HowTo /> How To
          </h3>
          <p>
            When writing a section of this study sheet, you can use the library
            of quick symbols to mark sections for glancability.
          </p>
          <TypeScript code={QUICK_SYMBOLS_USAGE_EXAMPLE} />
        </PageSection>
        <PageSection>
          <InfoH3>Printing</InfoH3>
          <p>
            When printing, please use the following settings to avoid errors.
          </p>
          <KeyValue value={"Letter (8.5in x 11in)"}>Page Size</KeyValue>
          <KeyValue key={"Margins"} value={"None (0px)"}>
            Margins
          </KeyValue>
          <KeyValue key={"Orientation"} value={"Portrait"}>
            Orientation
          </KeyValue>
          <KeyValue key={"Scaling"} value={"None (100%)"}>
            Scaling
          </KeyValue>
          <NoKey key={"Headers and Footers"}>Headers & Footers</NoKey>
          <YesKey key={"Background Graphics"}>Background Graphics</YesKey>
          <WarningBox>
            <p>
              This site is only tested in <i>Google Chrome</i>. Other browsers may
              work, but you are likely to experience problems.{" "}
              <strong>
                When printing correctly, the header IE "Page 1..." should be at
                the top of each page, and fill its width entirely.
              </strong>
            </p>
          </WarningBox>
          <hr/>
          <HowToH3>Using the Crib Sheet</HowToH3>
          <ol>
            <li>Find your topic on the header (IE Relational Algebra)</li>
            <li>Look through headers to find the specific topic you need: <ul>
              <li><Info/> Info headers (blue) contain consise facts (for MC, true false)</li>
              <li><HowTo/> How To headers (green) contain steps to solve a problem (long answer)</li>
              <li><Example></Example> Example headers (purple) contain detailed examples. Questions are in <i>italics</i>, with answers in regular text.
              </li>
            </ul></li>
            <WarningBox>
              Be mindful of info an warning boxes. These tell you additional details which can make or break your answer.
            </WarningBox>
            <li>Make maximum use of information formatting: <ul>
              <li>
                Code is syntax highlighted, so you can tell where comments and keywords are.
              </li>
              <li>
                Key value boxes have the keyword on the right corner (see the Letter 8.5x11 above). Glance the right to find the term you need.
              </li>
              <li>
                True false boxes are color coded. If the box has a <Sach/>, the statement inside is true. If it has a <Falsehood/>, the statement is false.
              </li>

            </ul></li>
          </ol>

          <InfoBox style={{background: "rgba(130,130,130,0.3)"}}>
            <p><h4>On Info Boxes</h4>
              Info boxes look like this. They are either 1-2 lines or have a header describing what they're about. They provide more details on specific topics which may or may not come up on an exam. If they do come up, look for an info box near the topic you're looking for. <i>Key details are italicized</i>
            </p>
          </InfoBox>
        </PageSection>
      </PageColumns>
    </A4Paper>
  );
};
