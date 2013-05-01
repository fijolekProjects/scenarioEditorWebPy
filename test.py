
import re
from lxml import etree

def singleton(cls):
    instances = {}
    def getinstance():
        if cls not in instances:
            instances[cls] = cls()
        return instances[cls]
    return getinstance

@singleton
class ScenarioGenerator(object):
    filledFormCounter = 0
    filename = "scenario.xml"
    FILE = open(filename, "w")
    
    def fillXml(self, xmlData):
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
        
        
        
        tempXml = etree.tostring(root, pretty_print=True)
        
        self.FILE.writelines(tempXml)
        self.filledFormCounter += 1
        
#         if (self.filledFormCounter == 2):
#             self.FILE.close()
    
        return 0
    
    
