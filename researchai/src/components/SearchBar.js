import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

function SearchBar (){
    const [formData, setFormData] = useState({
        searchQuery: '',
      });

    const [responseData, setResponseData] = useState([]);

    const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
        ...formData,
        [name]: value,
    });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submitted")
        try {
          // Make an API request here using formData.searchQuery
          const response = await fetch(`http://127.0.0.1:8000/search?query=${encodeURIComponent(formData.searchQuery)}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (response.ok) {
            // Handle success
            const responseData = await response.json();
      
            // Handle success and use responseData
            console.log('Data received:', responseData);
            setResponseData(responseData);

            setFormData({
                searchQuery: '',
            });
          } else {
            // Handle errors
            console.error('Failed to send data');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };

      const handleFindSimilar = async (url) => {
        // e.preventDefault();
        console.log("Submitted")
        try {
          // Make an API request here using formData.searchQuery
          console.log(url)
          const response = await fetch(`http://127.0.0.1:8000/find_similar?link=${encodeURIComponent(url)}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (response.ok) {
            // Handle success
            const responseData = await response.json();
      
            // Handle success and use responseData
            console.log('Data received for similar:', responseData);
            setResponseData(responseData);

            setFormData({
                searchQuery: '',
            });
          } else {
            // Handle errors
            console.error('Failed to send data');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };
    

    return (

        <div>
            <Container fluid>
                <Row className="mt-5">
                    <Col md={{ span: 6, offset: 3 }}>
                        <Form>
                            <Row>
                                <Col xs={8}>
                                    <Form.Group>
                                        <Form.Control type="text" placeholder="Search..." name="searchQuery" value={formData.searchQuery} onChange={handleChange} />
                                    </Form.Group>
                                </Col>
                                <Col xs={1}>
                                    <Button type="submit" onClick={handleSubmit}>Search</Button>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                </Row>
            </Container>

            {/* Display the response data */}
            <div className="card-container">
            {responseData.results && Array.isArray(responseData.results) && responseData.results.map((item, index) => (
                <div key={index}>

                    <Card className="m-4">
                        <Card.Body>
                            <Card.Title>{item.title}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted"><b>Authors: </b>{item.author}</Card.Subtitle>
                            <Card.Text>
                                <b>Summary:</b> {item.extract}
                            </Card.Text>
                            <Card.Text>
                                <b>PublishedDate:</b> {item.publishedDate}
                            </Card.Text>
                            <Card.Link href={item.url}>Download PDF</Card.Link>
                            <Card.Link href = "#" onClick={() => handleFindSimilar(item.url)}>Find Similar</Card.Link>
                            <p>
                                <Link to={`/pdf/${encodeURIComponent(item.url)}`}>
                                    Learn More
                                </Link>
                            </p>


                        </Card.Body>
                    </Card>
                </div>
            ))}
            </div>
        </div>

    
    )
}
  
export default SearchBar;