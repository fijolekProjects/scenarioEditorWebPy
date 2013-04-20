'''
Created on Apr 9, 2013

@author: mihas
'''
import web

urls = (
    '/', 'Index')

render = web.template.render('templates/', base='base')

app = web.application(urls, globals())


                   
class Index:
    def GET(self):
        return render.questForm("Quest Form")
    def POST(self):
        inputFromForm = web.input()
        return inputFromForm
        
    
    
        

if __name__ == '__main__':
    app.run()