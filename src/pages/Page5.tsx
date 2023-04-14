import { A4Paper, Image } from "../components/Paper";
import React from "react";
import { PageHeader } from "../components/PageHeader";
import {
  OrderedList,
  PageColumns,
  PageSection,
  Table,
  TwoColumn,
} from "../components/Layout";
import { KeyValue, YesKey } from "../components/KeyValue";
import Latex from "react-latex-next";
import "katex/dist/katex.min.css";
import { FaGithub } from "react-icons/fa";
import {Example, ExampleH3, HowToH3, Info, InfoH3} from "../components/QuickSymbols";
import { InfoBox, MetaBox, WarningBox } from "../components/ThemedBoxes";
import IMG_CLUST_OR_NOT from "../assets/images/clust_or_not.png";
import IMG_MULTI_ATTR_IDXING from "../assets/images/multi_attr_idxing.png";
import IMG_SEARCH_BP_TREE from "../assets/images/search_bp_tree.png";
import IMG_SEARCH_BP_TREE_2 from "../assets/images/search_bp_tree_2.png";
import IMG_STATIC_HASH from "../assets/images/static_hash.png";
import IMG_SELECT_COST_CALC_EX1 from "../assets/images/select_cost_calc_ex1.png";
import IMG_SELECT_COST_CALC_EX2 from "../assets/images/select_cost_calc_ex2.png";
import IMG_SELECT_COST_CALC_EX3 from "../assets/images/select_cost_calc_ex3.png";
import IMG_PRACTFIN_QE from "../assets/images/practfin_qe.png";
import {SQL_PRACTFIN_Q4_1} from "../assets/Code";
import {SQL} from "../components/Code";

export const Page5: React.FC<{}> = () => {
  return (
    <A4Paper>
      <PageHeader>
        <span>Page 5 - Query Evaluation (2/2)</span>
        <span>
          <FaGithub />
          /TheBigSasha
        </span>
      </PageHeader>
      <PageColumns>
        <PageSection>
          <HowToH3>Calculate Cost of Selection</HowToH3>
          <ol>
            <li>
              Identify selection operator:
              <Latex>{`$\\sigma_{\\text{R.attr}\\\\,\\text{value}}(R)$`}</Latex>{" "}
            </li>
            <li>
              Check for index on specified attribute:
              <ul>
                <li>
                  No index:
                  <ul>
                    <li>Arbitrary attribute: cost = N</li>
                    <li>Primary key attribute: cost = N/2</li>
                  </ul>
                </li>
                <li>
                  Index available:
                  <ul>
                    <li>
                      Clustered B+ tree: cost = leaf pages read + data pages
                      read
                    </li>
                    <li>
                      Unclustered B+ tree:
                      <ul>
                        <li>
                          Naïve strategy: cost = leaf pages read + data pages
                          read (high I/O)
                        </li>
                        <li>
                          Improved algorithm: cost = sorted leaf pages + data
                          pages read
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
            <li>
              AND/OR operators (sorting):
              <ul>
                <li>
                  AND: use one or both indexes, or multi-attribute index (based
                  on reduction factor)
                </li>
                <li>
                  OR: use indexes on both attributes to create a union of RIDs
                  (multi-attribute index not useful)
                </li>
              </ul>
            </li>
          </ol>
          <ExampleH3>Query Cost Calculations</ExampleH3>
          <Image src={IMG_SELECT_COST_CALC_EX1} />
          <Image src={IMG_SELECT_COST_CALC_EX2} />
          <Image src={IMG_SELECT_COST_CALC_EX3} />
          <InfoH3>External Sorting</InfoH3>
          <p>
            External sorting is used when buffer size is insufficient to store
            and sort all pages in-memory. With N data pages and B buffer frames,
            Pass 0 creates ⌈N/B⌉ runs, each needing 2 I/O operations. Subsequent
            passes merge and sort pages until completion. Total passes needed: 1
            + ⌈log(B-1)⌈N/B⌉⌉, with a cost estimate of 2 × N × #passes.
            Optimization can be achieved by applying relational operators in the
            right order, reducing I/O operations.
          </p>
          <InfoH3>Pipelining</InfoH3>
          <ul>
            <li>
              Pipelining sends output directly between operators, reducing I/O
              operations and allowing parallel execution.
            </li>
            <li>Iterator operator enables pipelining.</li>
            <li>
              Iterator interface includes <code>open</code>,{" "}
              <code>getNext</code>, and <code>close</code> methods for parent
              and child operators.
            </li>
          </ul>
        </PageSection>
        <PageSection>
          <InfoH3>Join Operator</InfoH3>
          <Table>
            <thead>
              <tr>
                <th>Join Strategy</th>
                <th>Cost Calculation Equation</th>
                <th>Example</th>
                <th>Facts</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Nested Loop Join</td>
                <td>Cost = #OuterPages + |OuterTable| × #InnerPages</td>
                <td>For each record in the outer table, iterate through all records in the inner table and check for matches.</td>
                <td>Most straightforward but naive approach</td>
              </tr>
              <tr>
                <td>Page-oriented Nested Loop Join</td>
                <td>Cost = #OuterPages + #OuterPages × #InnerPages</td>
                <td>Iterate through pages of both tables and then iterate through records on each page to find matches.</td>
                <td>Improved over nested loop join, but still high cost</td>
              </tr>
              <tr>
                <td>Block Nested Loop Join</td>
                <td>
                  Cost = #OuterPages + (#OuterPages/#BufferPages) * #InnerPages
                </td>
                <td>Load multiple pages from the outer table into memory and compare them to inner table pages.</td>
                <td>Utilizes buffer space for in-memory joins</td>
              </tr>
              <tr>
                <td>Index Nested Loop Join</td>
                <td>
                  Cost = OuterPages + |OuterTable| × cost of finding tuples
                  using index
                </td>
                <td>Use an index on the inner table's join attribute to quickly find matching records.</td>
                <td>Uses index on inner table's join attribute</td>
              </tr>
              <tr>
                <td>Sort-Merge Join</td>
                <td>
                  Cost =  sorting #OuterPages (see external sorting) * sorting #InnerPages + #OuterPages + #InnerPages
                </td>
                <td>(we sort both (mulitply)) and then add sum of number of pages. Cost of sorting is 2 * N_tuples * number of passes</td>
                <td>
                  Sorts both tables based on join attribute and uses merge
                  operation
                </td>
              </tr>
              <tr>
                <td>Hash Join</td>
                <td>Depends on hashing function and partition sizes</td>
                <td>Hash records of both tables based on join attribute, then load and search partitions.</td>
                <td>Popular algorithm used in many database systems</td>
              </tr>
            </tbody>
          </Table>
          <WarningBox>
            <p>
              <h4>Cost of Sort Merge Join varies based on pipelining,etc.</h4>
              Normally it's 2 * N_tuples * number of passes. TODO: more here!
            </p>
          </WarningBox>
          <InfoH3>Projection</InfoH3>
          Projection is usually done on-the-fly with other operations i.e.,
          pipelining. In case the query requires `DISTINCT` results, it requires
          a sort to eliminate duplicates. This is usually done at the very end
          (when there may be fewer tuples due to other operations), or when the
          relation is sorted for some other reason.
          <InfoH3>Set Operations</InfoH3>
          <ul>
            <li>
              <code>INTERSECTION</code> and cross-product are special cases of
              the join operation.
            </li>
            <li>
              <code>UNION</code> (distinct) can be achieved by sorting both
              relations on the combination of all attributes and then merging
              both the relations (keeping only one of the duplicate records).
            </li>
            <li>
              <code>EXCEPT</code> can be implemented in a similar way by sorting
              both relations followed by merging and keeping out the records
              that match with those in the <em>except</em> table.
            </li>
          </ul>
          <InfoH3>Aggregation</InfoH3>
          <ul>
            <li>
              Aggregate operations like <code>AVG</code>, <code>COUNT</code>,{" "}
              <code>MIN</code>, etc. are usually performed at the very end,
              after all selections, projections, etc.
            </li>
            <li>Without grouping: requires scanning the entire relation.</li>
            <li>
              With grouping: sort on attributes specified in the{" "}
              <code>GROUP BY</code> clause, then scan the entire relation and
              compute aggregates for each group.
            </li>
          </ul>
          <InfoH3>Nested</InfoH3>
          <ul>
            <li>
              For the <code>IN</code> operator, execute the subquery first,
              followed by joining the outer relation and intermediate relation
              with any join method.
            </li>
            <li>
              For the <code>EXISTS</code> operator, we have to execute the inner
              query for each outer tuple; less optimization is possible.
            </li>
          </ul>
          <InfoH3>Optimization Types</InfoH3>
          <TwoColumn>
            <div>
              <h4>Algebraic</h4>
              Algebraic optimization focuses on reducing data flow between
              operators by pushing down selections and projections in the query
              evaluation path. It requires statistical information about the
              data.
            </div>
            <div>
              <h4>Cost Based</h4> Cost-based optimization involves determining
              and comparing the costs of using different algorithms to perform
              operations such as joins. It considers available indexes and
              operator implementation algorithms.
            </div>
          </TwoColumn>
          <HowToH3>Optimize Queries</HowToH3>
          <ol>
            <li>
              <p>
                Perform algebraic optimization: a. Reduce the amount of data
                flowing between operators to maximize data fitting in memory and
                reduce I/O costs. b. Push down selections and projections in the
                query evaluation path, ensuring no required attributes are lost.
                c. At this stage, do not consider the choice of algorithm for
                joins or other operations. d. Use statistical information about
                the data for algebraic optimization.
              </p>
            </li>
            <li>
              <p>
                Perform cost-based optimization: a. Compare alternative plans
                created by algebraic optimization. b. Consider the available
                indexes and operator implementation algorithms to determine the
                best approach.
              </p>
            </li>
            <li>
              <p>
                Apply optimization tricks: a. Be strategic in choosing
                algorithms for operations like joins and order-by clauses.
              </p>
            </li>
          </ol>
        </PageSection>
          <PageSection>
              <ExampleH3>Query Evaluation & Optimization</ExampleH3>
              <SQL code={SQL_PRACTFIN_Q4_1}/>
              <i>Given the query, find the best execution plan.</i>
              <p> Steps:
                  <ol>
                      <li> First read the 20,000 pages of babySitting, use the selection on availdate and pipeline it to projection and store only the required fields (ssid, totalhrs, addnlChildren) of the selected records in the memory buffers. The width of the output tuple is 4+4+4 = 12, and can be done into 2 frames ⇒ temp1. The number of records in temp1 will be 1,000,000 x 5/10,000 = 500 . Total IO is 20,000 reads.</li>
                      <li> Block Nested with temp1 as outer and sitter as the inner relation. Temp1 is in memory so join read cost = 20 (for sitter). Compute the amount earned for this babysitting reservation save only required fields (ssid, sname, amt), width = 4+20+8 = 32 ... takes about 4 frames (no need to write can be held in memory). Total IO = 20 reads</li>
                      <li> Do an in memory sorting based on ssid, sname. This is then grouped (in memory) - pipelined to sum - and pipeline to project - and send to client directly.</li>
                  </ol>
                  Total IO is therefore only 20,000 + 20 = 20,020
              </p>
              <hr/>
              <i>Suggest any indexes that you can add/modify in the tables to decrease the I/O cost of the
                  above query. Describe the new execution plan and compute the costs.</i>
              <p> Steps:
                    <ol>
                        <li>Create a clustered index on availDate of babySitting</li>
                        <li>For selection operator on availDate use this index and , read 1 leaf page + 10 data pages , project and store only required fields in memory (ssid, totalhrs, addnlChildren) (2 frames) {"->"} temp1 = 11 reads</li>
                    </ol>
                  Rest of the steps same as before - results in 11 + 20 = 31 I/O
              </p>
              <hr/>
              <i> Consider the following execution tree. It finds the information about male babysitters who
                  have had a 10 hour booking and the parent’s phone.</i>
              <Image src={IMG_PRACTFIN_QE}/>
              <p>N1 processes about 10,000 records (20% of the 50,000 qualified from babySitting), both entering and leaving. Incoming tuple size is either 108B or 104B, leaving tuple size is 24B
                  N2 processes about 10,000 records too (because only half of the parents will be needed), both entering and leaving. Incoming tuple size is either 60B or 56B and outgoing tuple size is 36B</p>
          </PageSection>
      </PageColumns>
    </A4Paper>
  );
};
