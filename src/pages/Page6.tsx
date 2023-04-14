import { A4Paper, Image } from "../components/Paper";
import React from "react";
import { PageHeader } from "../components/PageHeader";
import {
  OrderedList,
  PageColumns,
  PageSection,
  TwoColumn,
} from "../components/Layout";
import { KeyValue, NoKey, YesKey } from "../components/KeyValue";
import Latex from "react-latex-next";
import "katex/dist/katex.min.css";
import { FaGithub } from "react-icons/fa";
import {
  Example,
  ExampleH3,
  HowToH3,
  Info,
  InfoH3,
} from "../components/QuickSymbols";
import { InfoBox, MetaBox, WarningBox } from "../components/ThemedBoxes";

import IMG_MR_EX1_MAP from "../assets/images/mr_ex1_map.png";
import IMG_MR_EX1_RED from "../assets/images/mr_ex1_red.png";
import IMG_MR_EX1_BOTH from "../assets/images/mr_ex1_both.png";
import { LatexSymbol } from "../components/Latex";

export const Page6: React.FC<{}> = () => {
  return (
    <A4Paper>
      <PageHeader>
        <span>Page 6 - Big Data</span>
        <span>
          <FaGithub />
          /TheBigSasha
        </span>
      </PageHeader>
      <PageColumns>
        <PageSection>
          <InfoH3>Scaling to big data</InfoH3>
          <NoKey>Relational DBs good enough for big data</NoKey>
          <YesKey>Diminishing returns with more nodes</YesKey>
          <KeyValue value={"speedup"}>
            Response time faster with more nodes
          </KeyValue>
          <KeyValue value={"scaleup"}>
            More concurrent users with more nodes
          </KeyValue>
          <InfoH3>Types of Parallel Execution</InfoH3>
          <KeyValue value={"Inter-query"}>
            different queries run in parallel on different processors, however,
            each query is executed sequentially.
          </KeyValue>
          <KeyValue value={"Inter-operator"}>
            different operators within the same execution tree run on different
            processors. Pipelining leads to parallelism.
          </KeyValue>
          <KeyValue value={"Intra-operator"}>
            a single operator runs on multiple processors. For example,
            different partitions of hash join being joined on different
            processors, multiple selection operators working on smaller chunks
            of data on different processors, etc.
          </KeyValue>
          <InfoH3>Data Partitioning</InfoH3>
          <KeyValue value={"Horizontal Partitioning"}>
            data is partitioned into chunks along the rows. The partition is
            done based on the values of one or more operators.
          </KeyValue>
          <KeyValue value={"Vertical Partitioning"}>
            data is partitioned into multiple column-stores. This method of
            partitioning is more suitable for data having a uniform structure,
            such as relational data (although not only restricted to relational
            data).
          </KeyValue>
          <InfoBox>
            <p>
              <h4>IO Costs with vertical partitioning</h4> Joining the different
              partitions in a column-store wouldn’t incur as much cost as a
              regular join since the DBMS internally maintains some notion of
              ordering and knows how to “stitch back” the partitions
              efficiently. For example, it may know that the{" "}
              <Latex>{"$n^{th}$"}</Latex> record of both partitions will
              definitely match together.
            </p>
          </InfoBox>
          <InfoH3>Map-Reduce</InfoH3>
          Model for processing big datasets in parallel, distributed across
          multiple machines.
          <TwoColumn>
            <div>
              <h4>Map</h4>
              <i>
                performs filtering and sorting (such as sorting students by
                first name into queues, one queue for each name)
              </i>
            </div>
            <div>
              <h4>Reduce</h4>
              <i>
                performs a summary operation (such as counting the number of
                students in each queue, yielding name frequencies)
              </i>
            </div>
          </TwoColumn>
          <YesKey>
            It can be applied to many types of queries, relational as well as
            non-relational. It’s one of the initiatives within the NoSQL
            movement.
          </YesKey>
          <KeyValue value={"systematic failure handling mechanisms"}>
            What to do when a node inevitably fails?
          </KeyValue>
          <InfoH3>Distributed File Systems</InfoH3>
          Meant for read heavy use and for files of extremely large size. Prefer
          deleting files rather than updating them.
          <KeyValue value={"64MB"}>Typical chunk size in HDFS</KeyValue>
          <KeyValue value={"4KB"}>Typical chunk size in DBMS</KeyValue>
          <HowToH3>Running Map-Reduce</HowToH3>
          <ul>
            <li>
              <strong>Step 1</strong>: distribute data into several partitions
              and read input chunks of records (<strong>key-value pairs</strong>
              ).
            </li>
            <li>
              <strong>Step 2</strong>: <strong>map task</strong> — extract
              something interesting from the records and output a new set of
              data records (key-value pairs). Note that multiple output records
              may have the same key.
            </li>
            <li>
              <p>
                <strong>Step 3</strong>: <strong>shuffle and sort</strong> or{" "}
                <strong>group and shuffle</strong> — merges different values
                having the same key into one big record of the form{" "}
                <code>(k, [val_list])</code>. Ensures that all records having
                the same key are sent to the same reduce task instead of being
                scattered around.
              </p>
              <p>
                {" "}
                Once the data is grouped like this, several partitions are
                created and fed to the reduce tasks.
              </p>
            </li>
            <li>
              <p>
                <strong>Step 4</strong>: <strong>reduce task</strong> — perform
                aggregate, summarize, filter, etc. operations.
              </p>
            </li>
            <li>
              <strong>Step 5</strong>: output the results.
            </li>
          </ul>
          <InfoBox>
            <p>
            <h4>Map Reduce Overall Timeline (full)</h4>
            The net process can be described as: Record reader → map function →
              (possibly) <strong>combine</strong> function → write to local file → Group keys and
            aggregate value lists → copy from map location to reduce location →
            Reduce function → write to output DFS
            </p>
          </InfoBox>
          <InfoBox>
            <p>
              <h4>Important notes on Map-Reduce</h4>
              <ul>
                <li>
                  Input and output are considered key-value pairs in order to be
                  able to compose several map/reduce instances.
                </li>
                <li>
                  Both the keys and values can themselves be complex objects
                  such as serialized objects or tuples.
                </li>
                <li>
                  Map and reduce functions are written by programmers and can be
                  executed in parallel.
                </li>
                <li>
                  Reduce workers implement the group and shuffle operation,
                  followed by executing the reduce task itself. In other words,
                  shuffle and sort is a part of reading data output by the map
                  operation (which is stored in the local DFS).
                </li>
              </ul>
            </p>
          </InfoBox>
          <ExampleH3>Word Count using Map-Reduce</ExampleH3>- Given: a document
          set `DS(K, docText)`. - Output: for each word `w` occurring at least
          in one document of `DS`, indicate the number of occurrences of `w` in
          `DS`.
          <TwoColumn>
            <div>
              <h4>Map</h4>
              <Image src={IMG_MR_EX1_MAP} />
            </div>
            <div>
              <h4>Reduce</h4>
              <Image src={IMG_MR_EX1_RED} />
            </div>
          </TwoColumn>
        </PageSection>
        <PageSection>
          <Image src={IMG_MR_EX1_BOTH} />
          <InfoBox>
            <p>
              <h4>I/O of Map Reduce</h4>
              Note that the output of one map-reduce job can be used as an input
              to another map-reduce job. It can be thought of as similar to
              pipelining.
            </p>
          </InfoBox>
          <InfoH3>Optimizations & Tricks of Map Reduce</InfoH3>
          <ul>
            <li>
              Combine operation: optimizes map-reduce{" "}
              <ul>
                <li>Similar to aggregation and reduce</li>
                <li>Reduces data transfer</li>
              </ul>
            </li>
            <li>
              Master node: oversees execution
              <ul>
                <li>Partitions input, handles failures</li>
                <li>Manages map, reduce tasks</li>
              </ul>
            </li>
            <li>
              Failure handling: anticipates failures
              <ul>
                <li>Map/reduce task failures: assign new worker</li>
                <li>Straggler: use faster node, discard slow output</li>
              </ul>
            </li>
          </ul>

          <ExampleH3>Relational Operations in Map-Reduce</ExampleH3>
          <h4 id="-selection-sigma-">
            <strong>
              Selection <Latex>($\sigma$)</Latex>
            </strong>
          </h4>
          <ul>
            <li>
              Assume a relation <code>R(A, B, C)</code> with no duplicates.
            </li>
            <li>
              For a selection operation with condition <code>c</code> on{" "}
              <code>R</code>:
              <ul>
                <li>
                  Map: for each tuple <code>t</code> of <code>R</code> for which
                  condition <code>c</code> holds, output{" "}
                  <code>(a, (b, c))</code>.
                </li>
                <li>
                  Reduce: identity i.e., output <code>(a, (b, c))</code>.
                </li>
              </ul>
            </li>
          </ul>
          <h4 id="-projection-pi-">
            <strong>
              Projection <Latex>($\pi$)</Latex>
            </strong>
          </h4>
          <ul>
            <li>
              Assume a relation <code>R(A, B, C)</code>.
            </li>
            <li>
              For projection on attributes <code>(B, C)</code> of <code>R</code>
              :
              <ul>
                <li>
                  Map: for each tuple <code>(a, (b, c))</code> of <code>R</code>
                  , let <code>t = (b, c)</code>. Output <code>(t, 0)</code>.
                </li>
                <li>
                  There might now be duplicates i.e., several{" "}
                  <code>(t, 0)</code> records in the output. The group and
                  shuffle operation will aggregate them into{" "}
                  <code>(t, (0, 0, ...))</code>.
                </li>
                <li>
                  Reduce: for each tuple <code>(t, (0, 0, ...))</code>, output{" "}
                  <code>(t, 0)</code>.
                </li>
              </ul>
            </li>
          </ul>
          <InfoBox>
            <p>
              <h4>Dummy Values when no useful key</h4>
              Note that in order to maintain the data in the form of key-value
              pairs (which is essential for map-reduce framework), we have to
              put some dummy value in places where we don’t require any value.
              In the above example, we use <code>0</code> as a dummy value since
              we don’t really require any value corresponding to the key.
            </p>
          </InfoBox>

          <h4 id="-join-">
            <strong>Join</strong>
          </h4>
          <ul>
            <li>
              Assume two relations <code>R(A, B, C)</code> and{" "}
              <code>Q(C, D, E)</code>.
            </li>
            <li>
              <p>
                For a natural join on these relations (i.e., join on attribute{" "}
                <code>C</code>):
              </p>
              <ul>
                <li>
                  <p>Map:</p>
                  <ul>
                    <li>
                      For each tuple <code>(a, b, c)</code> of <code>R</code>,
                      output <code>(c, (R, (a, b)))</code>.
                    </li>
                    <li>
                      <p>
                        For each tuple <code>(c, d, e)</code> of <code>Q</code>,
                        output <code>(c, (Q, (d, e)))</code>.
                      </p>
                      <InfoBox>
                        <p>
                          <h4>Clarification of example</h4>
                          Note that the <code>R</code> and <code>Q</code> in the
                          output are just indicator values (could be just a{" "}
                          <code>CHAR</code> value or something small like that)
                          to indicate which relation the tuple belongs to. This
                          distinction would be used later in the map-reduce
                          algorithm to perform the join operation.
                        </p>
                      </InfoBox>
                    </li>
                  </ul>
                </li>
                <li>
                  <p>
                    Group and shuffle will aggregate all key-value pairs with
                    the same value of attribute <code>C</code>.
                  </p>
                </li>
                <li>
                  <p>Reduce:</p>
                  <ul>
                    <li>
                      For each tuple <code>(c, val_list)</code> (note that{" "}
                      <code>val_list</code> consists of elements of the form{" "}
                      <code>(rel_identifier, (other_attr))</code>):
                      <ul>
                        <li>
                          Initialize <code>Rt = []</code> and{" "}
                          <code>Qt = []</code> as empty lists.
                        </li>
                        <li>
                          For each <code>v in value_list</code>:
                          <ul>
                            <li>
                              If <code>v.rel_identifier == R</code>: insert{" "}
                              <code>other_attr</code> into <code>Rt</code>.
                            </li>
                            <li>
                              Else insert <code>other_attr</code> into{" "}
                              <code>Qt</code>.
                            </li>
                          </ul>
                        </li>
                        <li>
                          For each <code>v1 in Rt</code>:
                          <ul>
                            <li>
                              For each <code>v2 in Qt</code>:
                              <ul>
                                <li>
                                  Output <code>(c, (v1, v2))</code>
                                </li>
                              </ul>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </li>
                  </ul>
                  <p>
                    The net result consists of all combinations{" "}
                    <code>(c, (a_i, b_i, d_j, e_j))</code> i.e., a natural join
                    between <code>R</code> and <code>Q</code> over the attribute{" "}
                    <code>C</code>.
                  </p>
                </li>
              </ul>
            </li>
          </ul>
          <h4 id="-group-by-">
            <strong>Group by</strong>
          </h4>
          <ul>
            <li>
              Assume a relation <code>R(A, B, C)</code>.
            </li>
            <li>
              For some query requiring grouping on attribute <code>B</code> of{" "}
              <code>R</code> (such as{" "}
              <code>SELECT b, MAX(c) ... GROUP BY b</code>):
              <ul>
                <li>
                  Map: for each tuple <code>(a, (b, c))</code> of <code>R</code>
                  , output <code>(b, c)</code>.
                </li>
                <li>
                  Group and shuffle will aggregate all key-value pairs having
                  the same value of attribute <code>B</code>.
                </li>
                <li>
                  Reduce: for each tuple <code>(b, (c1, c2, c3, ...))</code>,
                  perform aggregation to get the maximum value of attribute{" "}
                  <code>C</code>. Output <code>(b, MAX(c1, c2, c3, ...))</code>.
                </li>
              </ul>
            </li>
          </ul>
        </PageSection>
        <PageSection>
          <InfoH3>Declarative Langs for Map-Reduce</InfoH3>
          <strong>
            This is where Pig Latin (lang) and Pig (engine) come in.
          </strong>
          <InfoBox>
            <p>
              <h4>No Auto-Optimization with M/R Langs</h4>Unlike relational
              DBMS, map-reduce framework doesn’t automatically create an
              optimized execution graph given the query. Hence writing scripts
              for map-reduce is like figuring out a sensible execution flow and
              programming it accordingly.
            </p>
          </InfoBox>
          <InfoH3>Pig Latin commands</InfoH3>
          <ul>
            <li>
              <strong>Load</strong>: read information from a file into an
              intermediate relation.
              <ul>
                <li>
                  Usually user-defined to translate file format into a
                  relational format.
                </li>
                <li>
                  <code>R = load &#39;users&#39; as (name, age);</code>
                </li>
              </ul>
            </li>
            <li>
              <strong>Store</strong>: write a relation into a file.
              <ul>
                <li>
                  As before, the translation from relational format to the file
                  format is usually defined by the user.
                </li>
                <li>
                  <code>store R into &#39;filename&#39;;</code>
                </li>
              </ul>
            </li>
            <li>
              <strong>Dump</strong>: display a relation to the screen.
              <ul>
                <li>
                  <code>dump R;</code>
                </li>
              </ul>
            </li>
          </ul>
          <InfoBox>
            <p>
              {" "}
              Note that the Pig Latin statements don’t start executing until the
              interpreter encounters a <code>store</code> or <code>dump</code>{" "}
              command.
            </p>
          </InfoBox>

          <ul>
            <li>
              <strong>Limit</strong>: limits the number of records in the
              output.
              <ul>
                <li>
                  <code>res = limit R &lt;num_records&gt;;</code>
                </li>
              </ul>
            </li>
            <li>
              <strong>Describe</strong>: describes the schema of a relation. It
              is quite handy to observe the structure of intermediate relations
              while working with them.
              <ul>
                <li>
                  <code>describe R;</code>
                </li>
              </ul>
            </li>
            <li>
              <strong>Filter</strong>: performs the selection operation on a
              relation.
              <ul>
                <li>
                  <code>Res = filter R by &lt;conditions&gt;;</code>
                </li>
                <li>
                  <code>&lt;conditions&gt;</code> can include any conditions on
                  the attributes of the relation <code>R</code>, such as{" "}
                  <code>age &gt;= 18</code>, etc.
                </li>
                <li>
                  Multiple conditions can be combined using logical operators
                  like <code>and</code> and <code>or</code>.
                </li>
              </ul>
            </li>
            <li>
              <strong>Join</strong>: performs a join operation on two relations
              by joining them by the specified attributes.
              <ul>
                <li>
                  <code>Res = join R1 by attr1, R2 by attr2;</code>
                </li>
                <li>
                  The above command translates to SQL as:{" "}
                  <code>SELECT * FROM R1, R2 WHERE R1.attr1 = R2.attr2;</code>
                </li>
              </ul>
            </li>
            <li>
              <strong>Order by</strong>: orders a relation on the specified
              attribute.
              <ul>
                <li>
                  <code>Res = order R by attr desc;</code>
                </li>
                <li>
                  Orders in ascending order by default (can use <code>asc</code>{" "}
                  explicitly), but can specify <code>desc</code> at the end to
                  order in descending order.
                </li>
                <li>
                  The above command translates to SQL as:{" "}
                  <code>SELECT * FROM R ORDER BY attr DESC;</code>
                </li>
              </ul>
            </li>
            <li>
              <p>
                <strong>Group by</strong>: aggregates records of a relation
                having equal value for the specified attribute.
              </p>
              <ul>
                <li>
                  <code>Res = group R by A;</code>
                </li>
                <li>
                  Given a relation <code>R(A, B, C)</code> with three tuples{" "}
                  <code>(a1, b1, c1)</code>, <code>(a1, b2, c2)</code>,{" "}
                  <code>(a3, b3, c3)</code>.
                </li>
                <li>
                  The <code>Res</code> relation has tuples{" "}
                  <code>{`(a1, {(b1, c1), (b2, c2)})`}</code>,{" "}
                  <code>(a3, (b3, c3))</code>.
                </li>
                <li>
                  <p>
                    The resulting relation <code>Res</code> is always of the
                    form <code>Res(group, R)</code> where <code>R</code> is the
                    name of the original relation. It is possible to access the
                    attributes of the resulting relation using those names.
                  </p>
                  <InfoBox>
                    It is similar to the group and sort operation in map-reduce.
                  </InfoBox>
                </li>
              </ul>
            </li>
            <li>
              <p>
                <strong>For each</strong>: performs the projection operation on
                the resulting relation obtained from the group by command. Can
                also apply aggregate operations such as <code>COUNT()</code>,{" "}
                <code>MAX()</code>, etc.
              </p>
              <ul>
                <li>
                  <code>
                    Res = foreach groupByRes generate ($0), COUNT($1) as count;
                  </code>
                </li>
                <li>
                  Since the attributes of the resulting relation from a group by
                  command have special name, the above command can also be
                  written as:{" "}
                  <code>
                    Res = foreach groupByRes generate group, COUNT(groupByRes)
                    as count;
                  </code>
                </li>
                <li>
                  The resulting relation after the foreach command would be of
                  the form <code>Res(group, count)</code>.
                </li>
                <li>
                  <p>
                    The <code>foreach</code> command can also be used to apply
                    projection to a relation. Assume a relation{" "}
                    <code>R(A, B, C)</code>. We can project on attributes{" "}
                    <code>A</code> and <code>C</code> using{" "}
                    <code>Res = foreach R generate A, C;</code> or{" "}
                    <code>Res = foreach R generate ($0), ($2);</code>
                  </p>
                  <InfoBox>
                    <p>
                      💡 Note that an attribute from a tuple can be selected as{" "}
                      <code>($0)</code>, <code>($1)</code>, etc.
                    </p>
                  </InfoBox>
                </li>
              </ul>
            </li>
            <li>
              <p>
                <strong>Co-group</strong>: works similarly to group by command,
                but is used in statements involving two or more relations.
              </p>
              <ul>
                <li>
                  <code>Res = cogroup R1 by attr, R2 by attr, ...;</code>
                </li>
                <li>
                  Results in a nested result (whereas group by produces a flat
                  result).
                </li>
              </ul>
            </li>
            <li>
              <strong>Flattening</strong>: the nested result from the co-group
              (or any other command) can be difficult to comprehend. It is
              possible to unwind the result to produce a flattened result using
              the flatten function.
              <ul>
                <li>
                  <code>Res = foreach R generate ($0), flatten($1);</code>
                </li>
              </ul>
            </li>
          </ul>

          <strong>Pig Latin will continue on the next page</strong>
        </PageSection>
      </PageColumns>
    </A4Paper>
  );
};
