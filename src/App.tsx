import React, { useState } from "react";
import "./App.css";
import { Page1 } from "./pages/Page1";
import {
  FaChartLine,
  FaGithub,
  FaHeart,
  FaPrint,
  FaQuestionCircle,
  FaReact,
  FaYoutube,
} from "react-icons/fa";
import { Footer, LeftRight } from "./components/Layout";
import { SiOcaml } from "react-icons/si";
import { Modal } from "./components/Modal";
import {Falsehood, KeyValue, NoKey, Sach, YesKey} from "./components/KeyValue";
import { Page2 } from "./pages/Page2";
import { TestPage } from "./pages/TestPage";
import { Page3 } from "./pages/Page3";
import { Page4 } from "./pages/Page4";
import { Page5 } from "./pages/Page5";
import { Page6 } from "./pages/Page6";
import { Page7 } from "./pages/Page7";
import { Page8 } from "./pages/Page8";
import {Example, HowTo, HowToH3, Info, InfoH3} from "./components/QuickSymbols";
import {InfoBox, WarningBox} from "./components/ThemedBoxes";
import {ExtraExamples1} from "./pages/ExtraExamples1";

function App() {
  const [showHelp, setShowHelp] = useState(false);

  return (
    <div className="App">
      {showHelp && (
        <Modal
          onClose={() => {
            setShowHelp(false);
          }}
          title={"Help"}
        >
            <div style={{lineHeight: 1.3}}>
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
            </InfoBox></div>
        </Modal>
      )}
      <LeftRight className={"no-print"}>
        <h2>COMP421 Final Exam Cheat Sheet</h2>
        <span>
          <FaQuestionCircle
            onClick={() => {
              setShowHelp(!showHelp);
            }}
            title={"Help & Info about printing"}
            style={{ cursor: "pointer", marginRight: 10 }}
          ></FaQuestionCircle>
          <button
            onClick={() => {
              // print as Letter, no margin, portrait
              window.print();
            }}
          >
            <FaPrint></FaPrint> Print
          </button>
        </span>
      </LeftRight>

      <p>
        Built with <FaHeart /> by <a href="https://sasharesume.com">Sasha</a>.
        Contributions welcome on{" "}
        <a href="https://github.com/TheBigSasha/421_final_study_sheet">
          <FaGithub /> GitHub{" "}
        </a>
        .
      </p>
      <div style={{ height: 25 }}></div>
      <h1>Page 1</h1>
      <Page1 />
      <h1>Page 2</h1>
      <Page2 />
      <h1>Page 3</h1>
      <Page3 />
      <h1>Page 4</h1>
      <Page4 />
      <h1>Page 5</h1>
      <Page5 />
      <h1>Page 6</h1>
      <Page6 />
      <h1>Page 7</h1>
      <Page7 />
      <h1>Page 8</h1>
      <Page8 />
        <h1>Extra Examples 1</h1>
        <ExtraExamples1/>
      <h1>Test Page</h1>
      <TestPage  />

      <div style={{ height: 25 }}></div>
      <p style={{ maxWidth: "8.5in" }}>
        {" "}
        Including infromation from{" "}
        <a
          href={
            "https://sarvasvarora.notion.site/0ded2d57df4d49dcb06e2fc4a834df56?v=0fb12fd38b684150991d4f565bb19a4a"
          }
        >
          notes by Sarvasv Arora
        </a>
        , content from McGill University's COMP421, and contributions made on
        GitHub.
      </p>

      <Footer className={"no-print"}>
        <a href="https://thebigsasha.github.io/COMP302StudySheet/">
          <SiOcaml /> COMP302 Exam
        </a>{" "}
        <a href={"https://github.com/TheBigSasha/RuntimeTester"}>
          <FaChartLine /> Runtime Tester
        </a>{" "}
        <a href={"https://www.youtube.com/@CS250"}>
          {" "}
          <FaYoutube> </FaYoutube> COMP 250
        </a>{" "}
        <a href={"https://www.npmjs.com/package/tbsui"}>
          <FaReact /> React Components
        </a>
      </Footer>
    </div>
  );
}

export default App;
