import { A4Paper, Image } from "../components/Paper";
import React from "react";
import { PageHeader } from "../components/PageHeader";
import {
  OrderedList,
  PageColumns,
  PageSection,
  TwoColumn,
} from "../components/Layout";
import { KeyValue, YesKey } from "../components/KeyValue";
import Latex from "react-latex-next";
import "katex/dist/katex.min.css";
import { FaGithub } from "react-icons/fa";
import { ExampleH3, HowToH3, Info, InfoH3 } from "../components/QuickSymbols";
import { InfoBox, MetaBox, WarningBox } from "../components/ThemedBoxes";
import IMG_CLUST_OR_NOT from "../assets/images/clust_or_not.png";
import IMG_MULTI_ATTR_IDXING from "../assets/images/multi_attr_idxing.png";
import IMG_SEARCH_BP_TREE from "../assets/images/search_bp_tree.png";
import IMG_SEARCH_BP_TREE_2 from "../assets/images/search_bp_tree_2.png";
import IMG_DEADLOCK_DETEC from "../assets/images/deadlock_detec.png";
import IMG_S2PL from "../assets/images/s2pl.png";
import IMG_GRAPH_DB from "../assets/images/graph_db.png";
import IMG_CYPHER_COUNT_GUIDE from "../assets/images/cypher_count_guide.png";
import { CYPHER_Q1, CYPHER_Q2 } from "../assets/Code";
import { Cypher } from "../components/Code";

export const Page8: React.FC<{}> = () => {
  return (
    <A4Paper>
      <PageHeader>
        <span>Page 8 - Concurrency (2/2), Graph Databases</span>
        <span>
          <FaGithub />
          /TheBigSasha
        </span>
      </PageHeader>
      <PageColumns>
        <PageSection>
          <ExampleH3>Strict 2 Phase Lock Execution Schedule</ExampleH3>
          <Image src={IMG_S2PL} />
          <InfoH3>Lock Table</InfoH3>
          An entry for each object that is currently locked.
          <ul>
            <li>
              Pointer to the queue of granted locks (or simply the number of
              transactions currently holding a lock).
            </li>
            <li>Type of lock held (shared or exclusive).</li>
            <li>
              Pointer to the queue of lock requests (waiting transactions).
            </li>
            <li>
              A transaction <code>T</code> only contains one lock per object. If{" "}
              <code>T</code> has <code>S</code> on an object and requests{" "}
              <code>X</code> on the same object, then <code>S</code> can be
              upgraded to <code>X</code> (might have to wait/block for other
              transactions to release <code>S</code> on the object).
            </li>
          </ul>
          <InfoBox>
            <p>
              The transaction table contains a pointer to a list of locks held
              by each transaction T in the schedule.
            </p>
          </InfoBox>
          <InfoH3> Deadlocks </InfoH3>A cycle of transactions waiting for locks
          to be released by each other. In such a situation, none of the stuck
          transactions can execute further operations.
          <HowToH3>Detect Deadlocks</HowToH3>
          Deadlocks can be detected by detecting cycles in the{" "}
          <strong>wair-for graph</strong>, which can be{" "}
          <strong>generated for any timestamp in the execution schedule</strong>
          . In a wait-for graph:
          <ul>
            <li>Transactions are represented as nodes.</li>
            <li>
              <Latex>
                There is an edge from $\rm T_i$ to $\rm T_j$ if $\rm T_i$ is
                waiting for $\rm T_j$ to release a lock.
              </Latex>
            </li>
          </ul>
          <Image src={IMG_DEADLOCK_DETEC} />A solution to get out of a deadlock
          situation is to{" "}
          <strong>abort one of the transactions stuck in the deadlock</strong>.
          The transaction to abort can be chosen <strong>randomly</strong> or
          using some <strong>other heuristics</strong> such as the youngest
          transaction, etc.
          <InfoBox>
            <p>
            <h4>Dependency vs Wait-For Graph</h4> If there is an edge from T2 to T1 in the wait-for-graph, then T2’s operation will execute after T1’s operation (T2 waits for T1 to release the lock), hence, in the dependency graph there is an edge from T1 to T2</p>
          </InfoBox>
          <WarningBox>
            <p>
              <h4>Regarding lost update & Commit</h4>
              An update can still be considered lost if it is committed and then overwritten by another transaction.
            </p>
          </WarningBox>
          <InfoH3>Graph Databases</InfoH3>
          <KeyValue value={"Node / Vertex"}>
            Represent single entities. Can have properties.
          </KeyValue>
          <KeyValue value={"Edge / Relationship"}>
            Represent relationships between nodes. Can have properties IE visted
            on date, etc.
          </KeyValue>
          <InfoBox>
            <p>
              <h4>Graph vs Relational</h4>
              Each node can have different properties (IE some people have job
              title, others don't). <strong>sparse schema</strong> Note that
              here, nodes are equivalent to entities or instances, labels/types
              are equivalent to entity sets, edges are equivalent to
              relationships, properties are equivalent to attributes, and the
              concept of space schema is equivalent to the concept of a NULL
              value.
            </p>
          </InfoBox>
          <InfoH3>Cypher</InfoH3>
          Data types in Cypher - Standard data types: integers, floats, strings,
          boolean, etc. - Extended graph data types: nodes, relationships,
          paths, maps, lists.
          <InfoBox>
            <p>
              Neo4j is a graph database management system that is compliant with
              the ACID transactional principles and uses Cypher as its query
              language.
            </p>
          </InfoBox>
        </PageSection>
        <PageSection>
          <Image style={{ width: "100%" }} src={IMG_GRAPH_DB} />
          <HowToH3>Writing Queries in Cypher</HowToH3>
          <ol>
            <li>
              <p>Basic syntax and concepts:</p>
              <ul>
                <li>
                  Nodes: <code>()</code>, <code>(n)</code>,{" "}
                  <code>(:Ntype)</code>, <code>(n:Ntype)</code>
                </li>
                <li>
                  Relationships: <code>[]</code>, <code>[r]</code>,{" "}
                  <code>[:RTYPE]</code>, <code>[r:RTYPE]</code>
                </li>
                <li>
                  Properties:{" "}
                  <code>{`(n:Ntype {property1: "value", property2:"value", ...})`}</code>
                </li>
                <li>
                  Directional edges:{" "}
                  <code>(n:Node)-[:RELATIONSHIP]-&gt;()</code>,{" "}
                  <code>(n)&lt;-[]-(:Ntype)</code>
                </li>
                <li>
                  Non-directional edges:{" "}
                  <code>(n:Node)-[:RELATIONSHIP]-()</code>,{" "}
                  <code>(n)-[]-(:Ntype)</code>
                </li>
              </ul>
            </li>
            <li>
              <p>Select, project, and join:</p>
              <ul>
                <li>
                  <code>MATCH (n:Node)-[:RELATIONSHIP]-&gt;(m:Node)</code>
                </li>
                <li>
                  <code>RETURN n.property, m.property</code>
                </li>
                <li>
                  Multiple patterns: <code>MATCH pattern1, pattern2, ...</code>
                </li>
              </ul>
            </li>
            <li>
              <p>Set operations:</p>
              <ul>
                <li>
                  Constraints: <code>CREATE CONSTRAINT ON &lt;pattern&gt;</code>
                </li>
                <li>
                  Updating properties: <code>SET n.property = "value"</code>
                </li>
              </ul>
            </li>
            <li>
              <p>Insert:</p>
              <ul>
                <li>
                  Nodes:{" "}
                  <code>{`CREATE (n:Ntype {property1: "value", property2: "value"})`}</code>
                </li>
                <li>
                  Relationships:{" "}
                  <code>
                    {`CREATE (n1)-[r:RTYPE {property1: "value"}]`}-&gt;(n2)
                  </code>
                </li>
              </ul>
            </li>
            <li>
              <p>Delete:</p>
              <ul>
                <li>
                  Nodes:{" "}
                  <code>{`MATCH (n:Ntype {id: 101}) DETACH DELETE n`}</code>
                </li>
                <li>
                  Relationships:{" "}
                  <code>MATCH (n1:Ntype)-[r:RTYPE]-(n2:Ntype) DELETE r</code>
                </li>
              </ul>
            </li>
            <li>
              <p>WHERE conditions and filtering:</p>
              <ul>
                <li>
                  <code>
                    MATCH (n:Node)-[:RELATIONSHIP]-&gt;(m:Node) WHERE n.property
                    = "value" AND m.property &gt;= 10
                  </code>
                </li>
              </ul>
            </li>
            <li>
              <p>ORDER BY and LIMIT:</p>
              <ul>
                <li>
                  <code>
                    RETURN n.property, m.property ORDER BY n.property DESC LIMIT
                    5
                  </code>
                </li>
              </ul>
            </li>
            <li>
              <p>Patterns with traversal depth:</p>
              <ul>
                <li>
                  <code>MATCH (n:Node)-[:RELATIONSHIP*2]-(m:Node)</code>
                </li>
              </ul>
            </li>
            <Image src={IMG_CYPHER_COUNT_GUIDE}></Image>
            <li>
              <p>Shortest path algorithm:</p>
              <ul>
                <li>
                  <code>
                    MATCH p=shortestPath((n1:Node)-[*]-(n2:Node)) RETURN p
                  </code>
                </li>
              </ul>
            </li>
            <li>
              <p>Recommendations (example: co-actors):</p>
              <ul>
                <li>
                  <code>
                    MATCH
                    (n:Person)-[:ACTED_IN]-&gt;(m:Movie)&lt;-[:ACTED_IN]-(coActor:Person)
                    WHERE n.name = "Tom Hanks" RETURN DISTINCT coActor.name
                  </code>
                </li>
              </ul>
            </li>
          </ol>
          <ExampleH3>Cypher Queries</ExampleH3>
          <Cypher code={CYPHER_Q1}></Cypher>
          returns: <code>{`{keeanu.name: "Keeanu", keeanu.born: 1964}`}</code>
          <Cypher code={CYPHER_Q2}></Cypher>
          returns: a list of objects with name and born properties
        </PageSection>
      </PageColumns>
    </A4Paper>
  );
};
