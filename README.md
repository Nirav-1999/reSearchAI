# reSearchAI

For the requested task I have built a simple research paper finder website that’ll help people to efficiently find resources for their thesis/research.

## Tech stack used –

Backend – Python – Django

Frontend – React.js

## Metaphor API’s used :
Search

Find Similar

Get Contents

## Other API’s used

ChatGPT API

## Project Flow:
*	As shown in the video demo, the user first queries his area of interest.
*	This query is then sent to the backend, where the Metaphor API is queried at the search endpoint with a predefined prefix (“Find Research Paper on the topic”) for the prompt  which helps in obtaining better results.
*	The results are then used to obtain the contents on the page by querying the get contents api. The extracted content is then used to query the chatgpt API which summarizes the obtained content into a few lines.
*	The results are also used one by one to find the corresponding pdfs, with the prefix (“Find Research Paper in pdf format on the topic”) used for the prompt, to obtain the corresponding correct pdfs with the highest score. (This step is necessary as I wasn’t able to query the getContents API for URLs that ended in .pdf | P.S. I wasn’t able to query these URLs on the Metaphor playground either). This links are used to provide the download links to the user.
*	All the details are then sent to the React Frontend, which displays it.
*	If the user likes any of the displayed results, they can click on the Find Similar link, which then queries the Metaphor Find Similar API to find similar results and sends it back to the user.
*	I have also added another feature, wherein when a user clicks on the Learn More button, they can view the PDF as well as ask questions regarding the same which are then again send to the Django backend. The backend queries the ChatGPT API and sends the results back to the Frontend where the answer is displayed.
 

## Conclusion
I have tried to create a minimalistic version of the idea because of which the results might not be perfect. As seen in the screenshot the results can be repetitive but it can be improved by using a metric like cosine similarity on the obtained results and filter out duplicate results. 

![image](https://github.com/Nirav-1999/reSearchAI/assets/37542504/966fd16e-a68c-416b-bd31-ffebeb3cb19e)
