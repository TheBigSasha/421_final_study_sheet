import { A4Paper, Image } from "../components/Paper";
import React from "react";
import { PageHeader } from "../components/PageHeader";
import { OrderedList, PageColumns, PageSection } from "../components/Layout";
import { KeyValue, NoKey, YesKey } from "../components/KeyValue";
import "katex/dist/katex.min.css";
import { FaGithub } from "react-icons/fa";

import ImgER1 from "../assets/images/er-1.png";
import { LatexSymbol } from "../components/Latex";
import {
  Example,
  ExampleH3,
  HowTo,
  HowToH3,
  Info,
  InfoH3,
} from "../components/QuickSymbols";

import ImageERRM1 from "../assets/images/er_to_rm_1.png";
import ImageERRM2 from "../assets/images/er_to_rm_2.png";
import ImageERRM3 from "../assets/images/er_to_rm_3.png";
import { SQL } from "../components/Code";
import {
  SQL_CREATE_EXAMPLE,
  SQL_DELETE_EXAMPLE,
  SQL_INSERT_EXAMPLE, SQL_PRACTFIN_Q3,
  SQL_SELECT_EXAMPLE,
  SQL_UPDATE_EXAMPLE,
} from "../assets/Code";
import { InfoBox } from "../components/ThemedBoxes";
import IMG_JBDC_CONN from "../assets/images/jbdc_conn.png";

//TODO: Candidate key, better glossary of ER diagram symbols
export const Page1: React.FC<{}> = () => {
  return (
    <A4Paper>
      <PageHeader>
        <span>Page 1 - Intro, ER Modeling, Relational Model</span>
        <span>
          <FaGithub />
          /TheBigSasha
        </span>
      </PageHeader>
      <PageColumns>
        <PageSection>
          <InfoH3>Entities & Relationships</InfoH3>
          <YesKey>Entity Set == Class == Table</YesKey>
          <YesKey>Entity == Instance == Table Row</YesKey>
          <YesKey>Relationship == Association == Foreign Key</YesKey>
          <p>Constraints</p>
          <KeyValue value={"Overlap"}>
            1 entity belong to 2+ subclasses
          </KeyValue>
          <KeyValue value={"Covering"}>
            Must an entity belong to a subclass?
          </KeyValue>
          <InfoH3>Relationships</InfoH3>
          <KeyValue value={"ISA / is a"}>
            Subclass == Child Class == Child Table
          </KeyValue>
          <KeyValue value={"Many:Many"}>
            Relationship identified by primary keys of constituents, in a join
            table.
          </KeyValue>
          <YesKey>Many to many bidirectional</YesKey>
          <KeyValue value={"One:Many"}>
            Like many to many, but includes a key constraint preventing one of
            the sides from having many mapping. Example: politicians in
            political parties.
          </KeyValue>
          <NoKey>One to many bidirectional</NoKey>
          <KeyValue value={"One:One"}>
            Like one to many, but the key constraint applies to both sides.
            Example: a person has one passport.
          </KeyValue>
          <YesKey>One to one bidirectional</YesKey>
          <InfoBox>
            <p>
              <h4>Symbols Summary</h4>
              In a nutshell, key constraint (arrow) ⇒ at most one; participation
              constraint (thick line) ⇒ at least once. The affected entity set
              is joined to the relationship by the appropriate notation.
            </p>
          </InfoBox>
          <Image src={ImgER1} alt={"ER Diagram"} />
          <InfoH3>Symbol Glossary</InfoH3>
          <KeyValue value={"Rectangle ▭"}>Entity</KeyValue>
          <KeyValue value={"Diamond ♢"}>Relationship</KeyValue>
          <KeyValue value={"Triangle △"}>ISA</KeyValue>
          <KeyValue value={"Dashed Line"}>Key of weak entity (defined only as an aspect of anothe entity)</KeyValue>

          <KeyValue value={"Thin Line"}>
            Relationship is a key constraint. @ManyToMany
            </KeyValue>
            <KeyValue value={"Thick Line"}>
                Relationship is a participation constraint. @ManyToMany @NotNull
            </KeyValue>

          <KeyValue value={"Thin Arrow"}>
              Only ONE of the arrowed entities in the relation per related entity. @OneToMany or @ManyToOne
          </KeyValue>
          <KeyValue value={"Thicc Arrow"}>
            Total participation constraint.   @OneToOne @NotNull
          </KeyValue>
          <KeyValue value={"Dotted Underline"}>
            Partial key of weak entity (defined only as an aspect of another entity)
          </KeyValue>
          <InfoBox>
            <p>
              <h4>Artificial key</h4>
              This term does not refer to anything technical, just that the key has no meaning and is auto generated.
            </p>
          </InfoBox>
          <InfoBox>
            relation = table; instances = rows; columns = attributes
          </InfoBox>
          <InfoBox>
            A schema can be considered an entity set, while an instance is
            comparable to an entity.
          </InfoBox>
          <InfoH3>Schemas & Relation</InfoH3>- **Schema**: specifies the name of
          the relation, plus a set of attributes along with their domain/data
          type. - Example: `Students(sid: int, name: string, login:string,
          faculty: string, major:string)`.
          <KeyValue value={"defines the schema of a relational database."}>
            Data Definition Language (DDL)
          </KeyValue>
          <KeyValue
            value={
              "manipulates the data i.e., the rows of the relation. (CURD)"
            }
          >
            Data Manipulation Language (DML)
          </KeyValue>
          <InfoBox>
            <p>
              <h4>On Abstraction</h4>
              Being a data-centric language means that it is independent of the
              physical/file format the data is stored in. The querying syntax
              remains the same. It’s like an abstraction.
            </p>
          </InfoBox>
          <InfoH3>Constraints</InfoH3>
          <h4>Integrity Constraints (IC)</h4>
          <KeyValue value={"NOT NULL"}>
            A column cannot contain NULL values.
          </KeyValue>
          <KeyValue value={"UNIQUE / PRIMARY KEY"}>
            A column cannot contain duplicate values.
          </KeyValue>
          <KeyValue value={"DEFAULT"}>
            A column is assigned a default value if no value is specified.
          </KeyValue>
          <KeyValue value={"FOREIGN KEY"}>
            Must correspond to the primary key of the relation it refers to.
          </KeyValue>
          <YesKey>A foreign key can be a primary key</YesKey>
        </PageSection>
        <PageSection>
          <HowToH3>ER Diagram {"->"} Relational Schema </HowToH3>
          <OrderedList>
            <li>
              Entity set → relation: Convert each entity set into a table and
              its attributes as columns.
            </li>
            <li>
              Many-many relationship set → relation: Create an individual table
              for the many-to-many relationship set. Include primary keys for
              each participating entity set as foreign keys and all other
              descriptive attributes of the relationship set.
            </li>
            <li>
              Relationship set with key constraint → relation: Choose one of two
              options:
              <ol>
                <li>
                  Map the relationship set to a new table with the primary key
                  of the entity set with key constraint as the primary key of
                  the new table.
                </li>
                <li>
                  Include the relationship set in the table of the entity set
                  with key constraint as a foreign key attribute.
                </li>
              </ol>
            </li>
            <li>
              Relationship set with key and participation constraint → relation:
              Include the relationship set in a table of the entity set (as a
              foreign key attribute) with key and participation constraints. Set
              the foreign key to NOT NULL.
            </li>
            <li>
              Relationship set with participation constraint → relation: Create
              a schema similar to a many-to-many relationship set, but handle
              the participation constraint on the application level.
            </li>
            <li>
              Renaming attributes/foreign keys: Rename attributes or foreign
              keys if the attributes of participating entity sets have the same
              name.
            </li>
            <li>
              Weak entity set → relation: Combine the weak entity set and the
              supporting relationship set into a single table.
            </li>
            <li>
              ISA hierarchy → relation: Distribute information among relations,
              with the superclass relation storing general attributes, including
              the primary key, and subclass relations having the primary key of
              the superclass as a foreign key and any additional attributes.
            </li>
          </OrderedList>
          <InfoH3>Additional ER Tips N Tricks</InfoH3>
          <InfoBox>
            <p>
              <h4>Keys & Inheritance in ER Models ISA</h4>
              Note that in ER models, subclasses don’t have a key attribute of
              their own since that would be redundant. However, in relational
              models, sub-tables have primary key attributes, which represent a
              reference to the parent table. This is NOT redundant but rather
              the encoding of ISA symbol.
            </p>
          </InfoBox>
          <InfoBox>
            <p>
              <h4>Weak Entity Sets</h4>
              <strong>
                Definition: Weak entry set has no primary key and is defined
                only in terms of other entities
              </strong>
              Another approach to translating ISA hierarchies would be to have
              one big relation with all the possible attributes in various
              subclasses. It would make querying simpler, however, the
              disadvantage is that it would have a lot of `NULL` values that
              waste storage space. Moreover, it would no longer be possible to
              have relationships that can occur selectively only with certain
              subclasses
            </p>
          </InfoBox>
          <ExampleH3>Converting ER to Relational</ExampleH3>
          <Image src={ImageERRM1} alt={"ER Diagram"} />
          <Image src={ImageERRM2} alt={"ER Diagram"} />
          <Image src={ImageERRM3} alt={"ER Diagram"} />
          <InfoBox>
            <p>
              <h4>Cascade</h4>
              There is an option to cascade delete the rows in all foreign
              tables, in case the row is deleted from the parent table. For
              example, if a row is deleted from Students, it would also be
              deleted from Enrolled.
            </p>
          </InfoBox>
          <Image src={IMG_JBDC_CONN} />
          <InfoBox>
            <p>
              <h4>SQL in PLs - Two vs 3 Tier</h4> Two-tier model has direct
              communication between application and database, offering
              flexibility but potential security issues and upgrade problems.
              Three-tier model separates client, middleware, and backend,
              improving security and organization. Web servers handle network
              protocols, application servers implement business logic, and
              connection pooling optimizes database connections.
            </p>
          </InfoBox>
        </PageSection>

        <PageSection>
          <InfoH3>SQL Types</InfoH3>
          <KeyValue value={"CHAR(n)"}>
            Fixed-length string of length n. Example: `CHAR(5)` can store a
            string of length 5.
          </KeyValue>
          <KeyValue value={"VARCHAR(n)"}>
            Variable-length string of length n. Example: `VARCHAR(5)` can store
            a string of length 5.
          </KeyValue>
          <KeyValue value={"INTEGER"}>Integer.</KeyValue>
          <KeyValue value={"SHORTINT"}>Short integer (2 bytes).</KeyValue>
          <KeyValue value={"FLOAT or REAL"}>Floating point number.</KeyValue>
          <KeyValue value={"DOUBLE PRECISION"}>
            Double precision floating point number (8 bytes).
          </KeyValue>
          <KeyValue value={"DECIMAL(p, s)"}>
            Decimal number with p digits and s digits after the decimal point.
          </KeyValue>
          <KeyValue value={"DATE"}>
            Date in the format <code>YYYY-MM-DD</code>.
          </KeyValue>
          <KeyValue value={"TIME"}>
            Time in the format <code>HH:MM:SS</code>.
          </KeyValue>
          <KeyValue value={"BITSTRING / BLOB"}>
            Bit string or a BLOB, i.e., a binary large object. Raw bits.
          </KeyValue>
          <YesKey>User Defined Custom Types (uncommon)</YesKey>
          <ExampleH3>Basic SQL</ExampleH3>
          <h4>Create Table</h4>
          <SQL code={SQL_CREATE_EXAMPLE} />
          <h4>Insert tuple into table</h4>
          <SQL code={SQL_INSERT_EXAMPLE} />
          <h4>Select tuple(s) from table</h4>
          <SQL code={SQL_SELECT_EXAMPLE} />
          <h4>Update tuple(s) in table</h4>
          <SQL code={SQL_UPDATE_EXAMPLE} />
          <h4>Delete tuple(s) from table</h4>
          <SQL code={SQL_DELETE_EXAMPLE} />
          <InfoH3> SQL Keywords</InfoH3>
          <KeyValue value={"LIMIT n"}>
            Limits the number of rows returned by the query to n.
          </KeyValue>
          <KeyValue value={"ORDER BY"}>
            Sorts the rows returned by the query in ascending order.
          </KeyValue>
          <KeyValue value={"ORDER BY DESC"}>
            Sorts the rows returned by the query in descending order.
          </KeyValue>
          <KeyValue value={"WHERE"}>
            Filters the rows returned by the query.
          </KeyValue>
          <KeyValue value={"GROUP BY"}>
            Groups the rows returned by the query.
          </KeyValue>
          <KeyValue value={"DISTINCT"}>Returns only distinct rows.</KeyValue>
          <KeyValue value={"||"}>
            <p>
              Concatenates two strings. IE{" "}
              <code>firstName {`|| ',' ||`} lastName</code> returns{" "}
              <code>John,Doe</code>
            </p>
          </KeyValue>
          <KeyValue value={"AND"}>
            <p>
              Logical AND. IE{" "}
              <code>firstName = 'John' {`AND`} lastName = 'Doe'</code> returns{" "}
              <code>John,Doe</code>
            </p>
          </KeyValue>
          <KeyValue value={"BETWEEN"}>
            <p>
              Get tuples between two inclusive values. IE{" "}
              <code>
                age {`BETWEEN`} 18 {`AND`} 25
              </code>{" "}
              returns all 18-25yo. Works on Date & all too not just numbers.
            </p>
          </KeyValue>
          <InfoBox>
            <p>
              To use a cross product, list off relations after the FROM clause
              like <code>SELECT * FROM skaters, participants;</code>
            </p>
          </InfoBox>
          <InfoBox>
            <p>All the different joins fall under the JOIN keyword.</p>
          </InfoBox>
          <ExampleH3>SQL Query (from practice final)</ExampleH3>
          <i> Find the psid of parents who have more than one child, of which at least one of them is a
            female child.</i>
            <SQL code={SQL_PRACTFIN_Q3} />
        </PageSection>
      </PageColumns>
    </A4Paper>
  );
};
