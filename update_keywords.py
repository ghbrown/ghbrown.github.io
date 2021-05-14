
import os
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
def make_keyword_line(keywords_path,num_spaces):
    """
    Makes the .html keyword line from adjacent text file.
    ---Inputs---
    keywords_path: path to file containing keywords, string
    ---Outputs---
    html_keywords_line: .html formatted meta keywords line, string
    """
    with open(keywords_path) as f:
        keywords=[line.strip('\n') for line in f]
    for i in range(len(keywords)-1): #add comma to end of first n-1 lines
        keywords[i]=keywords[i]+',' 
    keywords[0]='<meta name=\"keywords\" content=\"'+keywords[0] #add leading html formatting
    keywords[-1]=keywords[-1]+'\">' #add trailing html formatting
    spaces=''.join([' ']*num_spaces)
    html_keywords_line=spaces+('\n'+spaces).join(keywords)+'\n'
    print(html_keywords_line)
    return html_keywords_line
    

def update_page_keywords(page_path,keywords_path,keyword_line_signature,after_keyword_line_signature):
    """
    Updates the keywords of single webpage.
    ---Inputs---
    page_path: path to/of page which is to be modified
    keywords_path: path to file containing keywords, string
    keyword_line_signature: unique identifier for the existing html keywords line(s), string
    after_keyword_line_signature: unique identifier for the line/element after the keyword line, string
    ---Outputs---
    NONE: updates page html file in place
    """
    with open(page_path) as f:
        page_lines=f.readlines()
    num_lines=len(page_lines)
    keyword_line_indices=[index for index in range(num_lines) if
                          (keyword_line_signature in page_lines[index])] #indices of all lines containing keyword_line_signature
    after_keyword_line_indices=[index for index in range(num_lines) if (after_keyword_line_signature in page_lines[index])] #indices of all lines containing after_keyword_line_signature
    first_keyword_line_index=keyword_line_indices[0]
    after_keyword_line_index=after_keyword_line_indices[0]
    first_keyword_line=page_lines[first_keyword_line_index] #actual line corresponding to first occurence of keyword_line_signature
    prekeyword_lines=page_lines[0:first_keyword_line_index]
    postkeyword_lines=page_lines[after_keyword_line_index:]
    num_leading_spaces=len(first_keyword_line)-len(first_keyword_line.lstrip(' ')) #extract indentation/leading space amount from keyword line
    keyword_lines=make_keyword_line(keywords_path,num_leading_spaces)
    updated_page_lines=prekeyword_lines+[keyword_lines]+postkeyword_lines
    #with open(page_path,'w') as f:
    with open('testOutput.html','w') as f:
        f.writelines(updated_page_lines)
    

def update_all_keywords(keywords_path,keyword_line_signature,next_line_signature):
    """
    Updates the keywords of all *.html files adjacent to script or below in file tree.
    ---Inputs---
    keywords_path: path to file containing keywords, string
    keyword_line_signature: unique identifier for the existing html keywords line(s), string
    after_keyword_line_signature: unique identifier for the line/element after the keyword line, string
    ---Outputs---
    NONE: updates *.html file's in place
    """
    pages=[]
    for root, dirs, files in os.walk('./'):
        for file in files:
            if file.endswith('.html') and ('google' not in file):
                pages.append(os.path.join(root,file))
    print(pages)
                
    """
    keywords_formatted=make_keyword_line(keywords_path)
    for page in pages:
        update_page_keywords(page,keywords_formatted,keyword_line_signature,next_line_signature)
    #delete copy (only uncomment this line after confirmed working)
    """


keyword_line_sig='<meta name=\"keywords\"'
after_keyword_line_sig='<meta name=\"viewport\"'
#make_keyword_line(keywords_file,4)
#update_page_keywords('index.html','keywords',keyword_line_signature=keyword_line_sig,after_keyword_line_signature=after_keyword_line_sig)
update_all_keywords('keywords',keyword_line_sig,after_keyword_line_sig)



        
        
