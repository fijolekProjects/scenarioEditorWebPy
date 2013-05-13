
import re
from lxml import etree

root = etree.Element('Scenario')

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
    
    
    def cutFormList(self,inputList):
       
        questList = []    
        tempQuestMark = 0;
                
        for index,item in enumerate(inputList):
            if item[0] == 'EOS':
                
                questList.append(inputList[tempQuestMark:index])
                tempQuestMark = index+1
              
             
        for item in questList:
            self.fillXml(item)
            

        
    
  
    def fillXml(self, xmlData):
        quest = etree.Element('quest', id = xmlData[0][1])  
        taskList = ['location_.*','text_,*','choice_.*']
        
        i = iter(xmlData)    
        i.next()  
        for item in i:         
  
            attribute= etree.Element(item[0])           
            attribute.text = item[1] 
             
            attribute = self.addMultiChild('tasks.*', attribute, i, item,taskList)              
            
            quest.append(attribute)
        root.append(quest)

        return 0
  

        
    def xmlFinish(self):
        
        tempXml = etree.tostring(root, pretty_print=True)
        self.FILE.writelines(tempXml)
        
        return 0

   
   
   
    def addChild(self, prefix, attr, iter,item,section):
        if re.match(section,item[0]):
            item = iter.next()
        
        localRoot = etree.Element(prefix[0:len(prefix)-3])
        topicTest = 0
        
        while re.match(prefix,item[0]):
                            
                    topicTest = 1
                    
                    temp = item[0]
                    temp = temp[len(prefix)-2:]
                    
                    task = etree.Element(temp)
                    task.text = item[1]
                    localRoot.append(task)    
                          
                    try:                          
                        item = iter.next()
                    except StopIteration:
                        break
        
        if topicTest==1:
            attr.append(localRoot)
            
        return item
    
   
   
    
    
    def addMultiChild(self,prefix,attribute,i,item,childList):
        if re.match(prefix,item[0]):
                
                attribute = etree.Element(prefix[0:len(prefix)-2])
                attribute.text = ''    
               
                item = i.next()
                
                for k in range (0,len(childList)):
                    item = (self.addChild(childList[k],attribute,i,item,prefix))
      
               
        return attribute
    
      
      

