
import shutil

"""
Simple script to update metadata tags on all pages of website.

Flow:
store desired tags in a text file
when script is run:
    make a full copy of website files and store somewhere
    read tags from file somewhere
    create full html meta-data tag line with tags
    create list of all .html files in same directory and deeper
    for each of these files:
        open file and read contents
        parse file into lines before and lines after meta tag line (saving both as variables)
        open same file with write priveleges
        write pre-tag lines
        write in formatted tag line variable
        write in post-tag lines
"""
def update_page_keywords(page_path,keyword_lines):
    with open(page_path) as f:
        page_lines=f.readlines()
    num_lines=len(page_lines)
    keyword_line_signature='<meta name=\"description\"'
    viewport_line_signature='<meta name=\"viewport\"'
    #first_keyword_line_number=get line number of line starting with keyword_line_signature
    #viewport_line_number=get line number of line matching viewport_line_signature
    #prekeyword_line_numbers=list(range(0,first_keyword_line_number))
    #postkeyword_line_numbers=list(range(viewport_line_number,num_lines))
    #keyword_line_numbers=list(range(first_keyword_line,viewport_line_number)) #list containing
    #prekeyword_lines=[page_lines[line_num] for line_num in prekeyword_line_numbers]
    #postkeyword_lines=[page_lines[line_num] for line_num in postkeyword_line_numbers]
    #with some bologna
        #write prekeyword_lines
        #write keyword_lines
        #write postkeyword_lines
    

def update_all_keywords(keywords_path):
    #make full copy of website and store in tempCopy directory
    with open(keywords_path) as f:
        keywords=f.readlines()
    #keywords_formatted=format_keywords(keywords)
    #pages=make list of all .html files in same directory and deeper
    for page in pages:
        update_page_keywords(page,keywords_formatted)
    #delete copy (only uncomment this line after confirmed working)


keywords_file='keywords.txt'


        
        
