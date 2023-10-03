import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';


function PDFViewer({ url }) {
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
    const pdf_url = url;
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submitted")
        try {
            // Make an API request here using formData.searchQuery
            const queryParams = {
                query: encodeURIComponent(formData.searchQuery),
                url: pdf_url, // Add additional parameters as needed
              };
              console.log("Here")
            console.log(queryParams);
            const queryString = Object.keys(queryParams)
            .map((key) => `${key}=${queryParams[key]}`)
            .join('&');
            
            const url = `http://127.0.0.1:8000/ask?${queryString}`;

            const response = await fetch(url, {
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

    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        <iframe
                            src={`https://docs.google.com/gview?url=${url}&embedded=true`}
                            width="100%" // Set the width to 50% to make it span the left half
                            height="700px" // Set the height to 100% to fill the entire height of the parent container
                            frameBorder="0"
                            scrolling="auto">
                        </iframe>
                    </Col>
                    <Col>
                        <Row className="mt-5">
                            <Col>
                                <Form>
                                    <Row className='mx-2'>
                                        Ask your doubts here...
                                    </Row>
                                    <Row>
                                        <Col >
                                            <Form.Group>
                                                <Form.Control as="textarea" rows={7} placeholder="Search..." name="searchQuery" value={formData.searchQuery} onChange={handleChange} />
                                            </Form.Group>
                                        </Col>
                                        <Col xs={1}>
                                            <Button type="submit" onClick={handleSubmit}>Ask</Button>
                                        </Col>
                                    </Row>
                                    <Row>
                                        {responseData.results && Array.isArray(responseData.results) && responseData.results.map((item, index) => (
                                            <div key={index}>
                                                <Card className="m-4">
                                                    <Card.Body>
                                                        <Card.Text>
                                                            <b>Answer:</b> {item.answer}
                                                        </Card.Text>
                                                    </Card.Body>
                                                </Card>
                                            </div>
                                        ))}

                                    </Row>
                                </Form>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
            
        </div>
    );
  }
  

export default PDFViewer;
