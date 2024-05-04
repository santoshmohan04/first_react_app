import React, { useEffect, useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";

function NewsData() {
  const [newsdata, setNewsData] = useState([]);
  const [state, setState] = useState({ category: "general" });
  let api_key = "cd65e7e17a4b40638ea3ffbf9b09e124";
  async function getNewsData() {
    const data = await fetch(
      `https://newsapi.org/v2/top-headlines?country=in&category=${state.category}&apiKey=${api_key}`
    )
      .then((res) => res.json())
      .then((data) => data);
    setNewsData(data.articles);
  }

  let handleTagChange = (e) => {
    setState({ category: e.target.value });
  };

  // This function will called only once
  useEffect(() => {
    getNewsData();
  }, [state]);

  const listItems = newsdata.map((item) => (
    <Card
      style={{ width: "28rem", marginRight: "5px", marginTop: "10px" }}
      key={item.publishedAt}
    >
      <Card.Img variant="top" src={item.urlToImage} />
      <Card.Body>
        <Card.Title>{item.title}</Card.Title>
        <Card.Text>{item.description}</Card.Text>
        <a href={item.url}>View more</a>
      </Card.Body>
    </Card>
  ));
  return (
    <div className="container-fluid mt-2">
      <div className="d-flex justify-content-end">
        <FloatingLabel controlId="floatingSelectGrid">
          <Form.Select onChange={handleTagChange} value={state.category}>
            <option>Open this select menu</option>
            <option value="general">General</option>
            <option value="business">Business</option>
            <option value="sports">Sports</option>
            <option value="entertainment">Entertainment</option>
            <option value="technology">Technology</option>
            <option value="science">Science</option>
            <option value="health">Health</option>
          </Form.Select>
        </FloatingLabel>
      </div>
      <div className="row">{listItems}</div>
    </div>
  );
}

export default NewsData;
