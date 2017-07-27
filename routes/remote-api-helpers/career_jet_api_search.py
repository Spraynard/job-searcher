# Summary: This script will handle getting all of the information from
# 	the careerjet API.
# 
# Input: Command Line Arguments coming from node.js.
# ---------------------REQUIRED----------------------------
# 	First Argument: 'IP' - The IP address of the user
# 	Second Argument: 'USER_AGENT' - The User Agent of the user's browser
# 						e.x.: 'Mozilla/5.0 (X11; Linux x86_64; rv:31.0) Gecko/20100101 Firefox/31.0'
# 						IMPORTANT ----- Due to how command line works, we replace '(' and ')' with '*'	
#							and ';' with '^'. Need to change that in this program.
# 	Third Argument: 'URL' - The URL that this information gained will be displaying on.
# 						I'm guessing during test it will be 'http://localhost/search?example=true'
# ---------------------NOT REQUIRED 
#	Fourth Argument: 'Keywords' - Keywords to match the title, content, or company name of a job
#
# Returns: This will return an object to stdout.
from careerjet_api_client import CareerjetAPIClient
import sys
import re
import json

cj = CareerjetAPIClient("en_US")
IP = sys.argv[1]
USER_AGENT = (" ").join(sys.argv[2].replace('*', '(').replace('+', ')').replace('^', ';').split('-'))
AFFILIATE_ID = sys.argv[5] #'12675a3a68f21b112085faa208e88b9d'
URL = sys.argv[3]
KEYWORDS = sys.argv[4]

# print IP, USER_AGENT, URL, keywords

result = cj.search({
	'keywords'	: KEYWORDS,
	'affid'		: AFFILIATE_ID,
	'user_ip'	: IP,
	'url'		: URL,
	'user_agent': USER_AGENT
	})

print json.dumps(result);