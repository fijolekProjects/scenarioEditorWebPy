from lxml import etree
import unittest
from generate import ScenarioGenerator
from iteratorWrapper import iteratorWrapper
import constants



class TestGenerate(unittest.TestCase):
    
    def setUp(self):
        self.gen = ScenarioGenerator()
    
    def test_cutFormList(self):
        questList = self.gen.cutFormList(constants.testFormList)
        self.assertEqual(questList, constants.testQuestList)
        
        
        
    def test_addChild(self):
        i = iter(constants.testChildList)
        attribute  = etree.Element('hints')
        wrapper = iteratorWrapper(attribute,i,constants.testChildList[1])
        prefix = 'hints.*'
        for wrapper.item in wrapper.iterator:
            self.gen.addChild(prefix,wrapper)
        self.assertEquals(wrapper.item,constants.testChildList[len(constants.testChildList)-1])
        
        
        
   
if __name__ == '__main__':
    unittest.main()
    
    
        
