
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
    
    
    taskList = ['location.*','text,*','choice.*']
    hintsList = []
    
    indentationList = [('tasks.*',taskList),('hints.*',hintsList)]
    
    valueSuffix = '.*_param'
    
    root = etree.Element('Scenario')
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
        
        i = iter(xmlData)    
        i.next()  
        
        for item in i:         
  
            attribute= etree.Element(item[0])           
            attribute.text = item[1] 
                     
            attribute = self.addIndentation(attribute, i, item)
    
            quest.append(attribute)
        self.root.append(quest)
        
        return 0
  

        
    def xmlFinish(self):
        
        tempXml = etree.tostring(self.root, pretty_print=True)
        self.FILE.writelines(tempXml)
        
        return 0

   
   
   
    def addMultiChild(self, prefix, attr, i,item,section):
        
        if re.match(section,item[0]):
            item = i.next()
        
        localRoot = etree.Element(prefix[0:len(prefix)-2])
        topicTest = 0
        
        while re.match(prefix,item[0]):
                            
                    topicTest = 1
                    
                    task = self.createSingleTask(prefix, attr, i, item) 
                    
                    
                    localRoot.append(task)    
                          
                    try:                          
                        item = i.next()
                    except StopIteration:
                        break
        
        if topicTest==1:
            attr.append(localRoot)
            
        return item
    

    
    def addComplexChild(self ,prefix, attribute, i, item, childList):
        if re.match(prefix,item[0]):
                
                attribute = etree.Element(prefix[0:len(prefix)-2])
                attribute.text = ''    
               
                if not childList:
              
                    item = self.addChild(prefix, attribute, i, item)
      
                        
                else:
                      item = i.next()
                      for k in range (0,len(childList)):
                       
                          item = (self.addMultiChild(childList[k],attribute,i,item,prefix))
                        
            
        return attribute
    
    
    
    def addIndentation(self, attribute, i, item):
        tempAttribute = attribute
        
        for k in range(0,len(self.indentationList)):
        
            if re.match(self.indentationList[k][0],item[0]):              
                 tempAttribute = None
                 tempAttribute = self.addComplexChild(self.indentationList[k][0], attribute, i, item,self.indentationList[k][1])  
                 break
 
        return tempAttribute

 
    def addChild(self, prefix, attribute, i, item):
         
         while re.match(prefix,item[0]):
                           
            task = self.createSingleTask(prefix, attribute, i, item)  
                
            attribute.append(task)    
                         
            try:                          
                item = i.next()
            except StopIteration:
                break
        
        
         return item    
     
       
    def createSingleTask(self, prefix, attribute, i, item): 
        
        temp = item[0]                  
        temp = temp[len(prefix)-1:]
        
        if re.match(self.valueSuffix,temp):
                            
            temp = temp[:len(temp)-len(self.valueSuffix)+2]
            task = etree.Element(temp)
            task.text = item[1]
            item = i.next()              
            task.set(item[0],item[1])
        else:
            task = etree.Element(temp)
            task.text = item[1]
        
        return task