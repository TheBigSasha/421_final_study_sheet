import { A4Paper, Image } from "../components/Paper";
import React from "react";
import { PageHeader } from "../components/PageHeader";
import { Java, SQL, TypeScript } from "../components/Code";
import {
    Callout,
    LeftRight,
    PageColumns,
    PageSection, PageTwoColumn,
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
import {Example, ExampleH3, HowTo, HowToH3, Info, InfoH3} from "../components/QuickSymbols";
import {InfoBox, WarningBox} from "../components/ThemedBoxes";
import IMG_CYPHER_EX1 from "../assets/images/cypher_ex1.png";
import IMG_QUERY_OPT1 from "../assets/images/query_opt1.png";
import IMG_QUERY_OPT2 from "../assets/images/query_opt2.png";
import IMG_2PL_EXTRA_1 from "../assets/images/2pl_extra_1.png";
export const ExtraExamples1: React.FC<{}> = () => {
    return (
        <A4Paper>
            <PageHeader>
        <span>
          Page 9 - Extra Examples 1
        </span>
                <span>
          <FaGithub />
          /TheBigSasha
        </span>
            </PageHeader>
            <PageTwoColumn>
                <PageSection>
                    <ExampleH3>
                        Query in Cypher
                    </ExampleH3>
                    <Image src={IMG_CYPHER_EX1} />
                    <HowToH3>Query Optimization (Slides)</HowToH3>
                    <Image src={IMG_QUERY_OPT1} />
                    <Image src={IMG_QUERY_OPT2} />
                </PageSection>
                <PageSection>
                    <InfoH3>Concurrency: 2 Phase Locking Extra Example</InfoH3>
                    <Image src={IMG_2PL_EXTRA_1} />
                </PageSection>

            </PageTwoColumn>
        </A4Paper>
    );
};
