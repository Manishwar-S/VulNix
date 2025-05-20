import smtplib
# import jsonify
from flask import Flask, jsonify
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime as dt
import asyncio
import aiohttp
import re
from bs4 import BeautifulSoup
from urllib.parse import quote
import csv

async def fetch(session, url):
    try:
        async with session.get(url) as response:
            return await response.text() if response.status == 200 else None
    except Exception as e:
        return None

async def main(socketio):
    date = dt.now().strftime("%m/%d/%Y")
    url = f"https://nvd.nist.gov/vuln/search/results?form_type=Advanced&results_type=overview&search_type=all&isCpeNameSearch=false&pub_start_date=01%2F01%2F2025&pub_end_date=01%2F31%2F2025"

    csv_file = '../data/vulnerabilities.csv'
    fieldnames = ['Unique ID', 'Product Name', 'OEM Name', 'Description', 'Security Score', 'Severity Level', 'Published Date']

    new_vul = []
    async with aiohttp.ClientSession() as session:
        main_page_html = await fetch(session, url)
        if main_page_html:
            soup = BeautifulSoup(main_page_html, 'html.parser')
            cve_elements = soup.find_all('a', href=re.compile(r'/vuln/detail/CVE-\d{4}-\d+'))
            cve_ids = [cve.get_text(strip=True) for cve in cve_elements]

            for cve_id in cve_ids:
                url1 = f"https://nvd.nist.gov/vuln/detail/{cve_id}"
                cve_detail_html = await fetch(session, url1)

                if cve_detail_html:
                    soup1 = BeautifulSoup(cve_detail_html, 'html.parser')

                    try:
                        source_element = soup1.find('span', {'data-testid': 'vuln-current-description-source'})
                        source = source_element.get_text(strip=True) if source_element else "N/A"

                        description_element = soup1.find('p', {'data-testid': 'vuln-description'})
                        description = description_element.get_text(strip=True) if description_element else "N/A"

                        severity_element = soup1.find('a', {'data-testid': 'vuln-cvss3-cna-panel-score'})
                        severity_vuln = severity_element.get_text(strip=True) if severity_element else "N/A"

                        publish_element = soup1.find('span', {'data-testid': 'vuln-published-on'})
                        published = publish_element.get_text(strip=True) if publish_element else "N/A"

                        new_vul.append(f"{cve_id}:{source}\nDescription :{description} \nSecurity_score: {severity_vuln} \nPublished: {published} \n\n")

                        # Send real-time update to frontend
                        socketio.emit('update', {"cve_id": cve_id, "description": description, "severity": severity_vuln})

                    except AttributeError as e:
                        print("Error extracting data:", e)

    # Send email notification
    if new_vul:
        send_email(new_vul)

def send_email(new_vul):
    sender_email = "manishwar.s27@gmail.com"
    sender_password = "ztzc yhyb ejyd bpkp"
    recipient_email = "manishwar.s27@gmail.com"
    subject = "New Vulnerability Found"
    body = "\n".join(new_vul)

    msg = MIMEMultipart()
    msg['From'] = sender_email
    msg['To'] = recipient_email
    msg['Subject'] = subject
    msg.attach(MIMEText(body, 'plain'))

    try:
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(sender_email, sender_password)
        server.send_message(msg)
        print("Email sent successfully!")
        # return jsonify({"message": "Email sent Successfully !"})

    except Exception as e:
        print(f"Failed to send email: {e}")
        #  return jsonify({"emailFailed": "Failed to send email!"})

    finally:
        server.quit()
