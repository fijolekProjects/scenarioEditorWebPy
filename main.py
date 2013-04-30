'''
Created on Apr 9, 2013

@author: mihas
'''
import web
from urlparse import parse_qsl
from test import fillXml

urls = (
    '/', 'Index')

render = web.template.render('templates/', base='base')



app = web.application(urls, globals())


                   
class Index:
    def GET(self):
        return render.questForm("Quest Form")
    
    def POST(self):
        form = web.data()
        formList = parse_qsl(form)       
        fillXml(formList)
    
        return formList
   
if __name__ == '__main__':
    app.run()
