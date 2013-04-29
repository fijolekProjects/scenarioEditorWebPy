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
        form = web.data()
        print 'input oryginalny'
        print form
        
        print ''
        
        print 'input po usunieciu znaku &'
        formList1 = form.split('&')
        print formList1
        
        resultList =[]
        for i in formList1:
            pair = i.split('=')
            if (pair[1] != "" and pair[1] != "No"):
                resultList.append(pair)
        print ''
        print 'input po zmagazynowaniu w liste ktorej elementami sa dwuelementowe listy'
        
        print resultList
        
        print ''
        print 'a tak sie dobrac do poszczegolnych skladowych'
        
        for i in xrange(len(resultList)):
            print resultList[i][0] + '====' +  resultList[i][1]
        
        return resultList

if __name__ == '__main__':
    app.run()