
import re
from lxml import etree


def fillXml(xmlData):
    inputData = str(xmlData)
    root = etree.Element('Scenario')
        
    pattern = "\((.*?)\)"
    regex = re.compile(pattern)
        
    for record in regex.finditer(inputData):
        attributeFlag = 1
        data = str(record.group(1))
        inPattern = "\'(.*?)\'"
        inRegex = re.compile(inPattern)
            
        for parameters in inRegex.finditer(data):
            if attributeFlag == 1:
                name = str(parameters.group(1))
                attribute = etree.Element(name)
                attributeFlag = 0
            else:
                attribute.text = parameters.group(1)
                root.append(attribute)
        
        
        
        oneXmlForm = etree.tostring(root, pretty_print=True)
        filename = "scenario.xml"
        FILE = open(filename, "w")
        FILE.writelines(oneXmlForm)
        FILE.close()
    
        return 0
    
    
