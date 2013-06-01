'''
Created on Apr 9, 2013

@author: mihas
'''
import web

from urlparse import parse_qsl
from generate import ScenarioGenerator

urls = (
    '/', 'Index', '/qunit', 'QUnitPage')

render = web.template.render('templates/', base='base')
                   
class Index:
    def GET(self):
        return render.appMenu()
    
    def POST(self):
        form = web.data()
        formList = parse_qsl(form)      
        gen = ScenarioGenerator()
        gen.fillXml(gen.cutFormList(formList)))
        gen.xmlFinish()
        gen.FILE.close()
        
        fileHandle = open ( 'scenario.xml', 'r' )
        scenarioXML = fileHandle.read()
        fileHandle.close()
        return scenarioXML

class QUnitPage:
    def GET(self):
        renderTest = web.template.render('templates/qunit')
        return renderTest.testSuitePage()
    
if __name__ == '__main__':
    app = web.application(urls, globals())
    app.run()
