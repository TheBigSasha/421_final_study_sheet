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
import IMG_STATIC_HASH from "../assets/images/static_hash.png";
import IMG_EXEC_TREE_EXMPL from "../assets/images/exec_tree_exmpl.png";

export const Page4: React.FC<{}> = () => {
  return (
    <A4Paper>
      <PageHeader>
        <span>Page 4 - Indexing (2/2), Query Evaluation (1/2)</span>
        <span>
          <FaGithub />
          /TheBigSasha
        </span>
      </PageHeader>
      <PageColumns>
        <PageSection>
          <MetaBox>
            Previous page: B+ trees, indexing types (indirect1/2, direct),
            indexing definitions, etc.
          </MetaBox>
          <InfoH3>Indexing: Additional Attributes</InfoH3>
          <InfoBox>
            <p>
              {" "}
              It’s possible to store{" "}
              <strong>
                additional attributes along with the record’s <code>rid</code>{" "}
                on the leaf page
              </strong>
              . It can be seen as a{" "}
              <strong>
                middle ground between direct and indirect indexing
              </strong>
              .
            </p>
            <p>
              Additional attributes are helpful for storing the most commonly
              accessed attributes (for example, name, etc.).{" "}
            </p>
          </InfoBox>
          <YesKey>No additional I/O to fecth the additional attributes</YesKey>
          <YesKey>Tradeoff: Fewer records per page Thus taller B+ tree</YesKey>

          <InfoH3>Indexing: Clustered vs !Clustered</InfoH3>
          <Image src={IMG_CLUST_OR_NOT} />
          <TwoColumn>
            <div>
              <h4>Clustered</h4>
              <i>
                The relation stored on the file is sorted by the search key
                attribute of the index.
              </i>
              The advantage of having a clustered index is that the intermediate
              and leaf nodes, as well as the actual data, are sorted on the same
              attribute, making it easier to access successive data. Since the
              actual data is also sorted, we can quickly access the next N
              records without looking back at the index, for example.
            </div>
            <div>
              <h4>Unclustered</h4>
              <i>
                The relation is stored on a heap file or a file sorted by
                different attribute(s) than the search key.
              </i>
              However, if the actual data were not sorted in the same way as the
              leaf nodes were, we would have to refer back to the leaf nodes to
              get the location of the next record in the sorted order of that
              attribute. Have to access more data pages for ranged searches.
            </div>
          </TwoColumn>
          <WarningBox>
            <p>
              <h4>ONLY ONE clustered index for any relation.</h4> It’s a design
              choice to decide which attribute to use to sort the actual data in
              so as to get the maximum I/O efficiency.
            </p>
          </WarningBox>
          <InfoH3>Indexing: Multiple Attributes</InfoH3>
          <strong>
            Just like sorting by multiple attributes IE age, then height
          </strong>

          <Image src={IMG_MULTI_ATTR_IDXING} />
          <p>
            It is possible to create an index with more than one attribute.
            However, the order of indexing matters. The data is first ordered by
            attribute 1, followed by attribute 2, which is used in cases of ties
            when comparing by attribute 1, and so on.
          </p>
          <InfoBox>
            <p>
              The performance benefit from multi-attribute indexing can be
              leveraged only when the query contains at least attribute 1.{" "}
            </p>
          </InfoBox>
          <ExampleH3>Searching B+ Tree</ExampleH3>
          <Image src={IMG_SEARCH_BP_TREE} />
          <Image src={IMG_SEARCH_BP_TREE_2} />
        </PageSection>
        <PageSection>
          <HowToH3>Insert Into B+ Tree</HowToH3>
          <ul>
            <li>
              <p>
                Inserting a data entry into a leaf page requires the following
                steps:
              </p>
              <ul>
                <li>
                  Find the correct leaf page <code>L</code>.
                </li>
                <li>
                  <p>
                    Put data entry into <code>L</code>.
                  </p>
                  <ul>
                    <li>
                      If <code>L</code> has enough space, we’re done!
                    </li>
                    <li>
                      <p>
                        Else, split <code>L</code> into <code>L</code> and a new
                        leaf page <code>L2</code>, followed by redistributing
                        the data entries evenly. <strong>Copy up</strong> the
                        middle key. This is known as a{" "}
                        <strong>leaf node split</strong>.
                      </p>
                      <p>
                        {" "}
                        Insert the index entry pointing to <code>L2</code> into
                        the parent of <code>L</code>.{" "}
                      </p>
                      <p> This can happen recursively:</p>
                      <ul>
                        <li>
                          To split an index node, redistribute entries evenly,
                          but <strong>push up</strong> the middle key (unlike
                          with leaf splits). This is known as{" "}
                          <strong>index node split</strong>.
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
          <InfoBox>
            <p>
              <h4>On splitting</h4>Note that splitting <em>grows</em> the B+
              tree. If there are no index splits (only leaf splits), the tree
              grows <strong>wider</strong>. In case there are index splits as
              well, there’s a chance that they may propagate all the way up to
              the root and grow the tree{" "}
              <strong>one level taller at the top</strong>.
            </p>
          </InfoBox>
          <InfoBox>
            <p>
              <h4>Avoid splitting</h4>
              It’s possible to avoid splitting by redistributing entries.
              However, it’s not implemented in practice because it’s beneficial
              to have some extra space in nodes available for future insertions.
            </p>
          </InfoBox>
          <HowToH3>Calculate Costs of B+ Tree Operations</HowToH3>
          <OrderedList>
            <li>
              Determine the attributes of the relation, their data types, and
              the number of tuples.
            </li>
            <li>
              Calculate the size of each tuple, considering the data types and
              sizes of its attributes.
            </li>
            <li>
              Determine the type of file being used (heap file or sorted file)
              and its properties (page size, fill factor).
            </li>
            <li>
              Determine the size of an rid (record ID) and the properties of the
              index to be built (page size, fill factor, pointer size in
              intermediate pages).
            </li>
            <li>
              Calculate the number of data pages in the heap file:
              <ul>
                <li>
                  Divide the product of page size and fill factor by the size of
                  a tuple.
                </li>
                <li>
                  Divide the total number of tuples by the number of tuples per
                  page, and round up to the nearest whole number.
                </li>
              </ul>
            </li>
            <li>
              Calculate the number of distinct values for the attribute being
              indexed.
            </li>
            <li>
              Calculate the number of rid per data entry:{" "}
              <ul>
                <li>
                  Divide the total number of records in the database by the
                  number of data entries.
                </li>
              </ul>
            </li>
            <li>
              Calculate the size of each data entry, considering the size of the
              attribute data type, the size of additional attributes, and the
              size of rid.
            </li>
            <li>
              Calculate the number of leaf pages:
              <ul>
                {" "}
                <li>
                  Divide the product of index page size and fill factor by the
                  size of a data entry.
                </li>
                <li>
                  Divide the total number of distinct values by the number of
                  data entries per page, and round up to the nearest whole
                  number.
                </li>
              </ul>
            </li>
            <li>
              Calculate the height of the tree:{" "}
              <ul>
                {" "}
                <li>
                  Determine the number of intermediate nodes required to manage
                  the leaf pages.
                </li>
                <li>Add one more level for the root.</li>
              </ul>
            </li>
            <li>
              Analyze the properties of the B+ tree, such as the typical order
              of inner nodes, fill factor, average fanout, and capacity.
            </li>
            <li>
              Estimate the I/O cost for various operations, such as range
              searches and accessing data pages.
            </li>
          </OrderedList>
          <InfoBox>
            <p>
              <h4>Extra Tips - Cost Calculation</h4>
              For specific queries, you will need to analyze the conditions in
              the query and the available indices. Compute the I/O cost for
              different scenarios, such as using a single index, multiple
              indices, or no index, and compare the results to determine the
              most efficient strategy. Consider factors such as clustered vs.
              unclustered index and the type of join being used.
            </p>
          </InfoBox>
          <ExampleH3>Data Page RID, index related Calculations</ExampleH3>
          <i>
            How many data pages does the relation Samples require, assuming that
            data pages are filled up to around 75%.
          </i>
          <p>
            4 Byte + 10 Byte + 10 Byte + 4 Byte + 50 Byte = 78 Byte 78 * 10,000
            / 3000 = 260 or 3000/78 = 38.46 (can be rounded up or down in the
            calculations or kept as is – both ok). For instance, 10,000 / 38 =
            263 or 262, or 10,000/39=256 or 257
          </p>
          <i>
            Assume an indirect index alternative II on region of Sequences. How
            many leaf pages does the index have?
          </i>
          <p>
            There are 500 data entries (one for each possible value). On average
            each entry has 50,000 / 500 = 100 rids. Size of a data entry is thus
            (3 + 100 * 10) = 1003. With leaf pages on average full 75%, there
            are 3 entries per leaf page, and thus 500/3 = 167 leaf pages.
            Calculating 500*1003/3000=167 or 168 also ok. Also ok to say 2 fit
            on each leaf page (although that’s stretching it because there was a
            lot of discussion on Ed, but then it would be 500/2=250 leaf pages.
            If people indicate 250 there must be some explanation together with
            the number.
          </p>
          <InfoBox>
            <p>
              <h4>How long does it take to find on average?</h4>
              For a unique field with no indexing or sorting, avg n/2. For any field, avg n. Sorted, avg log n. Index, avg log n.
            </p>
          </InfoBox>
        </PageSection>
        <PageSection>
          <InfoH3>Static Hash Indexes</InfoH3>
          <Image src={IMG_STATIC_HASH} />
          <strong>Static hashing</strong> is similar to standard hashing, but{" "}
          <strong>with pages as the unit of storage</strong> instead of
          array-based main memory implementation.
          <ul>
            <li>Static hashing: pages as storage unit</li>
            <li>M buckets: primary page per bucket</li>
            <li>Buckets contain data entries</li>
            <li>h(k) % M = bucket for key k</li>
            <li>
              <Latex>{"$h($k$) = (a \\times $k$+ b)$"}</Latex> where $a$ and $b$
              are constants usually works well.{" "}
            </li>
            <li>Good for search, insert, delete/update</li>
            <li>Poor for ranged queries</li>
            <li>Long overflow chains possible</li>
            <li>Optimizations: extensible, linear hashing</li>
          </ul>
          <InfoH3>Hashed Files</InfoH3>
          <ul>
            <li>
              A hashed file represents a relation as a{" "}
              <strong>collection of buckets</strong>. A bucket consists of a{" "}
              <strong>primary page</strong> and zero or more{" "}
              <strong>overflow pages</strong>.
            </li>
            <li>
              The hashing function <Latex>$h($</Latex>
              <code>r</code>
              <Latex>$) =$</Latex> bucket in which record <code>r</code>{" "}
              belongs. <Latex>$h$</Latex> looks at only some of the fields of{" "}
              <code>r</code>, called the <strong>search fields</strong>.
            </li>
            <li>
              Best for equality search (only one page access and maybe access to
              overflow pages).
            </li>
            <li>No advantage for ranged queries.</li>
            <li>Fast insert operation.</li>
            <li>
              The cost of delete/update operations depends on the cost for the{" "}
              <code>WHERE</code> clause.
            </li>
          </ul>
          <InfoH3>Query Evaluation: Basic Steps</InfoH3>
          <OrderedList>
            <li>
              Parsing:
              <ul>
                <li>Parse the query into an internal representation.</li>
                <li>Check the syntax and semantics of the query.</li>
                <li>Replace views with their definitions</li>
              </ul>
            </li>
            <li>
              Optimization:
              <ul>
                <li>Choose the best execution plan based on costs.</li>
              </ul>
            </li>
            <li>
              Execution:
              <ul>
                <li>Execute the query.</li>
                <li>Deliver data to client</li>
              </ul>
            </li>
          </OrderedList>
          <KeyValue value={"Access Path"}>
            The method used to retrieve tuples from a relation.
          </KeyValue>
          <KeyValue value={"Cost model"}>
            It's how we compare different access paths. Considers: the query,
            database statistics (distribution of values, etc), and resource
            availability (CPU, I/O, memory...)
          </KeyValue>
          <KeyValue value={"Execution tree"}>
            depicts the execution flow of a query. The execution flow starts at
            the leaves of the tree and moves upward toward the root.{" "}
            <ul>
              <li>Leaf nodes are base relations.</li>
              <li>Inner nodes are operators.</li>
              <li>
                Tuples from base relations (leaves) flow into the parent
                operator node(s).
              </li>
              <li>
                The output of an operator node flows into the parent node.
              </li>
              <li>
                The output of the root node flows as a result to the client.
              </li>
            </ul>
          </KeyValue>
          <ExampleH3>Execution Tree for SQL Query</ExampleH3>
          <Image src={IMG_EXEC_TREE_EXMPL} />
          <InfoH3>Operators & Calculations</InfoH3>
          <h4>Selection</h4>
          <KeyValue value={"Selectivity or reduction factor"}>
            <Latex>{`$\\text{Red}\\mid\\sigma_{\\text{condition}}(R)\\mid = \\dfrac{\\mid\\sigma_{\\text{condition}}(R)\\mid}{\\mid R \\mid}$`}</Latex>{" "}
            (refers to the number of records from a given relation that would
            qualify if the selection condition is applied to the relation.)
          </KeyValue>
          <InfoBox>
            <p>
              <h4>Handling Unknwon Selectivity - Assume Uniform Random</h4>
              The database might not always know the exact number of records
              that qualify the selection condition. In such cases, it uses an
              approximate guess by assuming that the records are
              independently-uniformly distributed for the attributes. The
              database generally stores some statistics (such as the number of
              different values, how many of a certain value exist, max, min,
              etc.) regarding the data it stores. These statistics, along with
              any indexes available, help in getting approximations that are
              used in creating an execution plan.
              <i>
                If the reduction factor is known, we can compute the result size
                after applying a particular condition. This approximation is
                used in creating execution plans.
              </i>
            </p>
          </InfoBox>
        </PageSection>
      </PageColumns>
    </A4Paper>
  );
};
