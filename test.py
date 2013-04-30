
import re
from lxml import etree

def fillXml(xmlData):
    
    input = str(xmlData)
      
       
    root = etree.Element('Scenario')
    
    pattern = "\((.*?)\)"
    regex = re.compile(pattern)
    
    for matches in regex.finditer(input):
       
       attributeFlag = 1
       
       data = str(matches.group(1))
       inPattern = "\'(.*?)\'"
       inRegex = re.compile(inPattern)
       
       for match in inRegex.finditer(data):
            if attributeFlag == 1:
                    name = str(match.group(1))
                    attribute = etree.Element(name)
                    attributeFlag = 0
            else:
                    attribute.text = match.group(1)
                    root.append(attribute)
    
    
    
    s = etree.tostring(root, pretty_print=True)
    
    filename = "scenario.xml"
    FILE = open(filename,"w")
    FILE.writelines(etree.tostring(root, pretty_print=True))
    FILE.close()

    return 0
    
    