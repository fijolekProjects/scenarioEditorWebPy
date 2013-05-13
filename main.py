'''
Created on Apr 9, 2013

@author: mihas
'''
import web

from urlparse import parse_qsl
from generate import ScenarioGenerator

urls = (
    '/', 'Index', '/generateScenario', 'generateScenario')

render = web.template.render('templates/', base='base')



app = web.application(urls, globals())

                   
class Index:
    def GET(self):
        return render.appMenu()
    
    def POST(self):
        form = web.data()
        formList = parse_qsl(form)      
        gen = ScenarioGenerator()
        gen.cutFormList(formList)
        gen.xmlFinish()
        gen.FILE.close()
        
        return formList

if __name__ == '__main__':
    app.run()
