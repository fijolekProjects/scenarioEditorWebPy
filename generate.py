
import re
from lxml import etree
from iteratorWrapper import iteratorWrapper
import constants


def singleton(cls):
    instances = {}
    def getinstance():
        if cls not in instances:
            instances[cls] = cls()
        return instances[cls]
    return getinstance


@singleton
class ScenarioGenerator(object):
   
    root = etree.Element(constants.rootName) 
    filename = "scenario.xml"
    FILE = open(filename, "w")
    
    
    def cutFormList(self,inputList):
        
        questList = []    
        tempQuestMark = 0;
                
        for index,item in enumerate(inputList):
            if item[0] == constants.endOfStringMark:
                
                questList.append(inputList[tempQuestMark:index])
                tempQuestMark = index+1
              
             
        return questList
            

        
    
  
    def fillQuest(self, xmlData):
        
        eventType = xmlData[0][1]
        quest = etree.Element(eventType, id = xmlData[1][1])
        
       
        
        i = iter(xmlData)    
        
        item = i.next()
        item = i.next()
        
        questWrapper = iteratorWrapper(None,i,item)
        
      
        
        for questWrapper.item in questWrapper.iterator:         
  
            questWrapper.attribute = etree.Element(questWrapper.item[0])           
            questWrapper.attribute.text = questWrapper.item[1] 
                     
            attribute = self.addIndentation(questWrapper)
    
            quest.append(attribute)
        self.root.append(quest)
        
        return 0
  

        
    def xmlFinish(self):
        
        tempXml = etree.tostring(self.root, pretty_print=True)
        self.FILE.writelines(tempXml)
        
        return 0

   
   
   
    def addMultiChild(self, prefix, wrapper,section):
        
        if re.match(section,wrapper.item[0]):
            wrapper.item = wrapper.iterator.next()
        
        localRoot = etree.Element(prefix[0:len(prefix)-2])
        topicTest = 0
        
        while re.match(prefix, wrapper.item[0]):
                            
                    topicTest = 1
                    
                    task = self.createSingleTask(prefix, wrapper) 
                    
                    
                    localRoot.append(task)    
                          
                    try:                          
                        wrapper.item = wrapper.iterator.next()
                    except StopIteration:
                        break
        
        if topicTest==1:
            wrapper.attribute.append(localRoot)
            
        return wrapper.item
    

    
    def addComplexChild(self, indentList, wrapper):
        if re.match(indentList[0], wrapper.item[0]):
                
                wrapper.attribute = etree.Element(indentList[0][0:len(indentList[0])-2])
                wrapper.attribute.text = ''    
               
                if not indentList[1]:
              
                    wrapper.item = self.addChild(indentList[0], wrapper)
      
                        
                else:
                      wrapper.item = wrapper.iterator.next()
                      for k in range (0,len(indentList[1])):
                       
                          wrapper.item = (self.addMultiChild(indentList[1][k], wrapper, indentList[0]))
                          
            
        return wrapper.attribute
    
    
    
    def addIndentation(self, wrapper):
        tempAttribute = wrapper.attribute
        
        for k in range(0,len(constants.indentationList)):
        
            if re.match(constants.indentationList[k][0], wrapper.item[0]):    
                          
                 tempAttribute = None
                 
                 tempAttribute = self.addComplexChild(constants.indentationList[k], wrapper)  
                 break
 
        return tempAttribute

 
    def addChild(self, prefix, wrapper):
         
         
         while re.match(prefix,wrapper.item[0]):
                           
            task = self.createSingleTask(prefix, wrapper)  
                
            wrapper.attribute.append(task)    
                         
            try:                          
                wrapper.item = wrapper.iterator.next()
            except StopIteration:
                break
        
                 
         return wrapper.item    
     
       
    def createSingleTask(self, prefix, wrapper): 
        
        temp = wrapper.item[0]                  
        temp = temp[len(prefix)-1:]
        
        if re.match(constants.valueSuffix,temp):
                            
            temp = temp[:len(temp)-len(constants.valueSuffix)+2]
            task = etree.Element(temp)
            task.text = wrapper.item[1]
            wrapper.item = wrapper.iterator.next()              
            task.set(wrapper.item[0],wrapper.item[1])
            
        else:
            
            task = etree.Element(temp)
            task.text = wrapper.item[1]
        
        return task
    
    
    def fillXml(self,questList):
        
        for item in questList:
            self.fillQuest(item)
            
            
            