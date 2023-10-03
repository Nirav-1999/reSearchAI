from django.http import JsonResponse, HttpResponse
from metaphor_python import Metaphor
from collections import defaultdict
from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_exempt
import openai
import requests
import PyPDF2
import io
import pdfreader
import fitz
import re

openai_api_key = "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"
client = Metaphor(api_key="50eb20df-3cf8-498d-a0c7-7404e7328f5a")
openai.api_key = openai_api_key

# Create your views here.
@csrf_exempt
def search(request):
    response = defaultdict(list)
    if request.method == "GET":
        prefix = "Find Research Paper on the topic "
        print(prefix + request.GET["query"])
        response_search = client.search(prefix + request.GET["query"],
            num_results=20,
            use_autoprompt=True,
        )
        
        prefix2 = "Find Research Paper in pdf format on the topic"
        valid_results = remove_duplicates_by_sentence(response_search.results)
        for result in valid_results:
            if "pdf" not in result.url:
                response_search_pdf = client.search(prefix2 + result.title,
                    num_results=1,
                    use_autoprompt=True,
                )

                if "pdf" in response_search_pdf.results[0].url:
                    response_search_content = client.get_contents(result.id)
                    extract = summarize_with_gpt(response_search_content.contents[0].extract)
                    response["results"].append({"title": result.title, "url": response_search_pdf.results[0].url, "publishedDate": result.published_date, "author": result.author, "id": result.id, "extract": extract})



        return JsonResponse(response)

def find_similar(request):
    response = defaultdict(list)
    if request.method == "GET":
        response_search = client.find_similar(request.GET["link"],
            num_results=20,
        )
        valid_results = remove_duplicates_by_sentence(response_search.results)

        for result in valid_results:
            if "pdf" not in result.url:
                prefix2 = "Find Research Paper in pdf format on the topic"

                # print(result.url)
                response_search_pdf = client.search(prefix2 + result.title,
                    num_results=1,
                    use_autoprompt=True,
                )
                if "pdf" in response_search_pdf.results[0].url:
                    response_search_content = client.get_contents(result.id)
                    extract = summarize_with_gpt(response_search_content.contents[0].extract)
                    response["results"].append({"title": result.title, "url": response_search_pdf.results[0].url, "publishedDate": result.published_date, "author": result.author, "id": result.id, "extract": extract})

                response["results"].append({"title": result.title, "url": result.url, "publishedDate": result.published_date, "author": result.author, "id": result.id})

        return JsonResponse(response)

def askGPT(request):
    response = defaultdict(list)
    if request.method == "GET":
        pdf_link = request.GET["url"]
        response_pdf = requests.get(pdf_link)
        pdf_text = ''
        if response_pdf.status_code == 200:
            # Open the PDF content as a binary stream
            pdf_document = fitz.open(stream=response_pdf.content, filetype='pdf')

            # Iterate through all pages and extract text
            for page_num in range(pdf_document.page_count):
                page = pdf_document.load_page(page_num)
                page_text = page.get_text()

                # Remove unwanted characters, multiple spaces, and newlines
                cleaned_page_text = re.sub(r'[^A-Za-z0-9\s.,]', '', page_text)
                cleaned_page_text = re.sub(r'\s+', ' ', cleaned_page_text).strip()

                # Append cleaned text to the result
                pdf_text += cleaned_page_text + '\n'

            # Print or use the cleaned text as needed
            # print(pdf_text)


        query_prefix = "Consider the following paper \n "
        query = query_prefix + pdf_text[:2000] + "\n Answer the question: " + request.GET["query"]
        print(query)
        answer = chat_with_gpt3(query)
        response["results"].append({"answer": answer})

        return JsonResponse(response)


def chat_with_gpt3(prompt):
    response = openai.Completion.create(
        model="text-davinci-003",
        # engine="davinci",
        prompt=prompt,
        max_tokens=100,  # You can adjust this value as needed
        temperature=0.7  # You can adjust this value for response randomness
    )
    return response.choices[0].text

def summarize_with_gpt(content):
    conversation = ""
    prefix = "Summarize the main content from the following: \n "
    all_content = prefix + content
    conversation += f"You: {all_content}\n"
    response = chat_with_gpt3(conversation)
    return response

def remove_duplicates_by_sentence(input_list):
    seen_sentences = set()  # To keep track of unique sentences
    unique_dicts = []  # To store unique dictionaries

    for d in input_list:
        sentence = d.title.lower()
        if sentence not in seen_sentences:
            seen_sentences.add(sentence)
            unique_dicts.append(d)

    return unique_dicts 