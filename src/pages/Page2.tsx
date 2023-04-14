import { A4Paper, Image } from "../components/Paper";
import React from "react";
import { PageHeader } from "../components/PageHeader";
import { Java, SQL, TypeScript } from "../components/Code";
import { OrderedList, PageColumns, PageSection } from "../components/Layout";
import {
  BASIC_JAVA_EXAMPLE,
  BASIC_SQL_EXAMPLE,
  SQL_AGGREGATION,
  SQL_IC,
  SQL_NESTED,
  SQL_VIEW,
} from "../assets/Code";
import { KeyValue, NoKey, YesKey } from "../components/KeyValue";
import Latex from "react-latex-next";
import "katex/dist/katex.min.css";
import { FaGithub } from "react-icons/fa";
import { LatexSymbol } from "../components/Latex";
import {
  Example,
  ExampleH3,
  HowToH3,
  Info,
  InfoH3,
} from "../components/QuickSymbols";
import { InfoBox, WarningBox } from "../components/ThemedBoxes";
import IMG_EQUI_JOIN from "../assets/images/equi-join.png";
import IMG_RA_MC_EXAMPLE from "../assets/images/ra-mc-example.png";
import IMG_RA_SA_TABLES from "../assets/images/ra-sa-tables.png";
import IMG_JOIN_TYPES from "../assets/images/join_types.png";

export const Page2: React.FC<{}> = () => {
  return (
    <A4Paper>
      <PageHeader>
        <span>Page 2 - Relational Algebra</span>
        <span>
          <FaGithub />
          /TheBigSasha
        </span>
      </PageHeader>
      <PageColumns>
        <PageSection>
          <InfoH3> Relational Algebra Facts</InfoH3>
          <InfoBox>
            <p>
              Relational Algebra (RA) consists of a set of basic operators. The
              input consists of one or two relations, each of whose schema is
              known, and the instance can be arbitrary.{" "}
              <strong>The output is always a single relation</strong>, whose
              schema depends on the operator and input relations.
            </p>
          </InfoBox>
          <YesKey>
            Relational algebra is closed i.e., each operation has input
            relation(s) and returns a relation. Hence, operators can be
            composed.
          </YesKey>
          <NoKey>The existence of a primary key is assumed</NoKey>
          <YesKey>A relation is assumed to be a set (no duplicates)</YesKey>
          <InfoBox>
            <p>
              <h4>Mathematical QLs</h4> Mathematical QLs form the basis for
              relational QLs. They are implemented using
              <strong>Relational algebra</strong>: it’s a simple abstraction
              where a query is a sequence of operations on data. It is very
              useful for representing execution plans, for example, to describe
              how a SQL query is executed internally. Concepts from relational
              algebra are also used to optimize query processing.
              <strong>Relational calculus</strong>: it is more descriptive
              (Mathematically) and a query describes what the data to be
              retrieved looks like.
            </p>
          </InfoBox>
          <InfoH3>Meta-terms</InfoH3>
          <KeyValue value={"Relation"}>
            <Latex>{`R,S,T,\$\\cdots\$`}</Latex>
            <p>Table</p>
          </KeyValue>
          <KeyValue value={"Tuple"}>
            <Latex>{`A,B,C,\$\\cdots\$`}</Latex>
            <p>Row</p>
          </KeyValue>
          <KeyValue value={"Attribute"}>
            <Latex>{`a,b,c,\$\\cdots\$`}</Latex>
            <p>Column</p>
          </KeyValue>
          <InfoH3>Operators (one relation input)</InfoH3>
          <KeyValue value={"Selection"}>
            <LatexSymbol symbol={`sigma_{A=B}(R)`}></LatexSymbol>
            <p>Keep only rows where A = B (filter rows like TS::Filter)</p>
          </KeyValue>
          <KeyValue value={"Projection"}>
            <LatexSymbol symbol={`Pi_{a,b,c,\\cdots}(R)`}></LatexSymbol>
            <p>
              Keep only columns a, b, c, ... from R (filter cols like TS::Pick)
            </p>
          </KeyValue>
          <KeyValue value={"Renaming"}>
            <LatexSymbol symbol={`rho(A \to B)`}></LatexSymbol>
            <p>Rename column A to B</p>
          </KeyValue>
          <YesKey>Rename Tables</YesKey>
          <YesKey>Rename Columns</YesKey>
          <InfoH3>Operators (two relations input)</InfoH3>
          <KeyValue value={"Cross Product"}>
            <Latex>{`R \$\\times\$ S`}</Latex>
          </KeyValue>
          <p>
            Cartesian product of R and S (creates a superset of possible
            combinations, useful to narrow it down after){" "}
          </p>
          <InfoBox>
            <p>
              <h4>Cross Product Additional Info</h4>
              This operator essentially takes data from multiple tables and
              pushes it into one, even if it duplicates a lot of info. Example:
              with a join table, all relationships are put in the table and will
              have columns with the info of the participants repeated.
            </p>
          </InfoBox>
          <KeyValue value={"Join"}>
            <Latex>{`R \$\\bowtie\$ S`}</Latex>
          </KeyValue>
          <p>
            Cross-product, combined with a selection of attributes from both
            relations
          </p>
          <h4>Join Types</h4>
          <KeyValue value={"Condition / Theta Join"}>
            <Latex>{`For each assignment of \$t_1\$: for each assignment of \$t_2\$: if condition $c$ is true, combine all attribute values of \$t_1\$ and \$t_2\$, and put them as a single row in the output relation. \$R_\\text{out} = R_{\\text{in}_1} \\bowtie_c R_{\\text{in}_2} = \\sigma_c(R_{\\text{in}_1} \\times R_{\\text{in}_2})\$`}</Latex>
          </KeyValue>

          <KeyValue value={"Equi-join"}>
            <Latex>
              {`The schema of the output relation is similar to the schema of cross-product, however, there is only one copy of the attributes for which equality is specified in the condition. \$R_\\text{out} = R_{\\text{in}_1} \\bowtie_{R_{\\text{in}_1}.a_1 = R_{\\text{in}_2}.b_1 \\wedge \\cdots \\wedge R_{\\text{in}_1}.a_n = R_{\\text{in}_2}.b_n} R_{\\text{in}_2}\$`}
            </Latex>
          </KeyValue>
          <Image src={IMG_EQUI_JOIN} />

          <KeyValue value={"Natural Join"}>
            An equi-join on all common attributes (i.e., attributes with the
            same name in both relations)
          </KeyValue>
          <InfoH3>Set operators (two relations input)</InfoH3>
          <WarningBox>
            <p>
              To use set operators, relations must have the same number of
              attributes with the same corresponding data types (names don’t
              matter and can differ).
            </p>
          </WarningBox>
          <KeyValue value={"Union"}>
            <Latex>{`R \$\\cup\$ S`}</Latex>
            <p>All tupes in R and/or S</p>
          </KeyValue>
          <KeyValue value={"Intersection"}>
            <Latex>{`R \$\\cap\$ S`}</Latex>
            <p>Keep only tuples in both R and S</p>
          </KeyValue>
          <KeyValue value={"Difference"}>
            <Latex>{`R \$\\setminus\$ S`}</Latex>
            <p>Keep only tuples in R but not S</p>
          </KeyValue>
        </PageSection>
        <PageSection>
          <InfoH3>Rules of Combinations of Operators</InfoH3>
          <KeyValue value={"Associativity"}>
            <Latex>{`\$R_1 \\bowtie (R_2 \\bowtie R_3) = (R_1 \\bowtie R_2) \\bowtie R_3\$`}</Latex>
          </KeyValue>
          <KeyValue value={"Commutativity"}>
            <Latex>{`\$\\Pi_L(\\sigma_c(R)) = \\sigma_c(\\Pi_L(R))\$ <- if \$c\$ only contains attributes of \$L\$.`}</Latex>
          </KeyValue>
          <KeyValue value={"Commutativity"}>
            <Latex>{`\$R_1 \\bowtie R_2 = R_2 \\bowtie R_1\$`}</Latex>
          </KeyValue>
          <KeyValue value={"Idempotence"}>
            <Latex>{`\$\\Pi_{L_2}(\\Pi_{L_1}(R)) = \\Pi_{L_2}(R)\$ only if \$L_2 \\sube L_1\$`}</Latex>
          </KeyValue>

          <InfoH3>Composition of Operators</InfoH3>
          There are two main ways of doing this:
          <ul>
            <li>
              Using algebra like substitution, creating new relations and
              sending them to each next operator.
            </li>
            <li>
              Running thru the the first relation, as we go sending passing
              stuff to the next operator in parallel.
            </li>
          </ul>
          <HowToH3>Writing Relational Algebra Queries</HowToH3>
          <OrderedList>
            <li>
              Understand the problem statement and identify the tables and
              attributes required to answer the query.
            </li>
            <li>
              Refer to the schema of the tables rather than the sample data to
              write the queries.
            </li>
            <li>
              Determine the appropriate relational algebra operators needed to
              answer the query.
            </li>
            <li>
              Start with the most restrictive operation (e.g., selection) to
              minimize the number of rows in intermediate results.
            </li>
            <li>
              If you need to combine information from two or more tables,
              consider using join operators (natural join, equi-join, or
              condition join) instead of cross product, as cross product often
              results in larger intermediate relations.
            </li>
            <li>
              Use projection <LatexSymbol symbol={"Pi"} /> to extract the
              specific attributes required by the query.
            </li>
            <li>
              If needed, use set operations (union, intersection, or set
              difference) to combine the results of multiple operations.
            </li>
            <li>
              Rename tables and/or attributes using the rename operator{" "}
              <LatexSymbol symbol={"rho"} /> to avoid ambiguity or to make the
              query more readable.
            </li>
            <li>
              If possible, leverage the commutativity, associativity, and
              idempotence rules to simplify and optimize the query.
            </li>
            <li>
              Test your query with sample data to ensure that it produces the
              correct results.
            </li>
          </OrderedList>
          <ExampleH3>Multi Choice</ExampleH3>
          <p>
            Given a schema of{" "}
            <code>
              Computer(<u>maker, model</u>, category){" "}
            </code>{" "}
            maker is a string of manufacturing company’s name, model is an
            integer specifying model number, and category is a string that is
            either laptop, desktop or tablet.
          </p>
          <h4>
            Find the makers that don’t make any desktops, but make laptops.
          </h4>
          <Image src={IMG_RA_MC_EXAMPLE} />
          <strong>Answer: A</strong>
          <ExampleH3>Short Answer</ExampleH3>
          <p>
            Consider the relations <code>Skaters(sid, sname, rating, age)</code>
            , <code>Participates(sid, cid, day)</code>, and{" "}
            <code>Competition(cid, date, type)</code>. Write the queries in
            relational algebra notation for the following requirements.
          </p>
          <Image src={IMG_RA_SA_TABLES} />
          <h4>
            Find names of skaters who have participated in competition #103
            (three solutions).
          </h4>
          <InfoBox>
            <p>
              note that we don’t typically need the Competition table to solve
              this because it doesn’t provide any additional info.
            </p>
          </InfoBox>
          <ul style={{ fontSize: "84%" }}>
            <li>
              <code>project sname (select [cid = 103] (P nat join S))</code>
            </li>
            <li>
              <code>
                project sname (select [cid = 103] (S equi join [S.sid = P.sid]
                P))
              </code>
            </li>
            <li>
              <code>
                project sname (select [cid = 103] ((S nat join P) nat join C))
              </code>
            </li>
          </ul>
          <h4>
            Find names of skaters who have participated in a local competition
            (2 solutions).
          </h4>
          <ul style={{ fontSize: "84%" }}>
            <li>
              <code>
                project sname (select [type = local] (S nat join P nat join C))
              </code>
            </li>
            <li>
              <code>
                project sname (select [type = local] (C) nat join P nat join S)
              </code>
            </li>
          </ul>
          <h4>
            Find sid of skaters who have participated in a local or regional
            competition (1 solution ).
          </h4>
          <InfoBox>
            <p>
              <h4>Don't write queries based on example data.</h4>
              Note that although tempted, never write queries by just looking at
              sample data. It might miss capturing the bigger picture. Here, it
              might seem that there are only two types of competitions, hence
              it’s futile to use selection on table $C$, but that might not be
              the case outside of this small sample data.
            </p>
          </InfoBox>
          <ul style={{ fontSize: "84%" }}>
            <li>
              <code>
                project sid (select [type = local || regional] (P nat join C))
                project sid(S nat join (P nat join (select [type = local ||
                regional] (C))))
              </code>
            </li>
          </ul>
        </PageSection>
        <PageSection>
          <ExampleH3>Views in SQL</ExampleH3>
          <i>Views are just aliases for relations</i>
          <SQL code={SQL_VIEW} />
          <InfoH3>Join Types</InfoH3>
          <Image src={IMG_JOIN_TYPES} />
          <ExampleH3>SQL Nested Queries</ExampleH3>
          <SQL code={SQL_NESTED} />
          <ExampleH3>SQL Aggregation (COUNT, AVG, MAX, MIN, SUM)</ExampleH3>
          <SQL code={SQL_AGGREGATION} />
          <InfoBox>
            <p>
              <h4>Grouping & HAVING</h4>
              <p>
                HAVING a selection on groups, just as WHERE clauses are
                selections on rows. It is applied after grouping is done.
                **Example**: find the average age of skaters in *each rating
                level*. - In general, we don’t know how many rating levels exist
                and what the rating values for these levels are.
              </p>
            </p>
          </InfoBox>
          <InfoBox>
            <p>
              <h4>Null & Coalesce</h4>
              The COALESCE operator can be used instead to get some default
              value in case the original value is NULL.
            </p>
          </InfoBox>
          <InfoH3>Integrity Constraints (ICs)</InfoH3>
          ICs can be classified into tuple-level and table-level ICs.
          Tuple-level ICs are enforced on individual tuples, while table-level
          ICs are enforced on the entire table. SQL also offers attribute-based
          checks that can be enforced by using the <strong>CHECK</strong>{" "}
          operator while defining the table schema.
          <ExampleH3>ICs in SQL</ExampleH3>
          <SQL code={SQL_IC} />
        </PageSection>
      </PageColumns>
    </A4Paper>
  );
};
