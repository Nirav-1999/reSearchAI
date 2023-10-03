import React from 'react';
import NavBar from './NavBar'
import PDFViewer from './PdfViewer';
import { useParams } from 'react-router-dom';


function Learn (){
    
    const { encodedUrl } = useParams();
    const decodedUrl = decodeURIComponent(encodedUrl);
    console.log("Learn.js");
    console.log(encodedUrl);
    console.log(decodedUrl);

    return (

        <div>
            <NavBar />  
            <PDFViewer url={decodedUrl} />

        </div>
            

    
    )
}
  
export default Learn;