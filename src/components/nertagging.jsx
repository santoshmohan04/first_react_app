import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import $ from "jquery";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { TextAnnotator } from "react-text-annotate";

function NerTagging() {
  const [characterLength, setcharacterLength] = useState(0);
  const [taggedData, settaggedData] = useState([]);
  const [taggedValue, setTaggedValue] = useState("");
  const [state, setState] = useState({ value: [], tag: "PERSON" });
  const TAG_COLORS = {
    ORG: "#00ffa2",
    PERSON: "#84d2ff",
    HARD: "RED",
  };

  let handleTagChange = (e) => {
    setState({ tag: e.target.value });
  };

  let handleTaggedChange = (value) => {
    console.log(value);
    setState(state.value.push(value));
  };

  let handleChange = (event) => {
    setcharacterLength(event.target.value.length);
    setTaggedValue(event.target.value);
  };

  let addTaggedData = (event) => {
    const min = 1;
    const max = 100;
    const rand = Math.floor(Math.random() * (max - min + 1)) + min;
    settaggedData([...taggedData, { id: rand, value: taggedValue }]);
  };

  let clearData = (event) => {
    setcharacterLength(0);
    settaggedData([]);
    setTaggedValue("");
  };

  let selectText = (value) => {
    const selection = window.getSelection();
    let sI = $("#nerUtterance").prop("selectionStart");
    let eI = $("#nerUtterance").prop("selectionEnd");

    //To get start index
    let startIndex = sI; //selection.anchorOffset;
    // To get end index
    let endIndex = eI; //selection.focusOffset;
    let selectedText = selection.toString();

    console.log("selectedText >> ", selectedText);
    console.log("stylePosition >>> ", startIndex, endIndex);
  };

  return (
    <React.Fragment>
      <div className="container-fluid mt-5">
        <Card>
          <Card.Body>
            <Row>
              <Col>
                <textarea
                  className="form-control"
                  placeholder="Enter here ..."
                  rows="6"
                  maxLength="1000"
                  id="nerUtterance"
                  onChange={handleChange}
                  onMouseUp={(value) => selectText("nerUtterance")}
                  value={taggedValue}
                  name="nerUtterance"
                ></textarea>
                <p>No of Characters: {characterLength}</p>
                <button
                  type="button"
                  className="btn btn-danger float-end mx-3"
                  onClick={clearData}
                >
                  Clear
                </button>
                <button
                  type="button"
                  className="btn btn-primary float-end"
                  onClick={addTaggedData}
                >
                  Create
                </button>
              </Col>
              <Col>
                <select onChange={handleTagChange} value={state.tag}>
                  <option value="ORG">ORG</option>
                  <option value="PERSON">PERSON</option>
                </select>
                <TextAnnotator
                  style={{
                    maxWidth: 500,
                    lineHeight: 1.5,
                  }}
                  content={taggedValue}
                  value={state.value}
                  onChange={(value) => handleTaggedChange(value)}
                  getSpan={(span) => ({
                    ...span,
                    tag: state.tag,
                    color: TAG_COLORS[state.tag],
                  })}
                />
                <pre style={{ fontSize: 12, lineHeight: 1.2 }}>
                  {JSON.stringify(state, null, 2)}
                </pre>
              </Col>
            </Row>
          </Card.Body>

          {taggedData &&
            taggedData.map((t) => (
              <ListGroup className="mt-3" key={t.id}>
                <ListGroup.Item>{t.value}</ListGroup.Item>
              </ListGroup>
            ))}
        </Card>
      </div>
    </React.Fragment>
  );
}

export default NerTagging;
