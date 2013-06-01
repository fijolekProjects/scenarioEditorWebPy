
rootName = 'Scenario'

taskList = ['location.*','text,*','choice.*']
hintsList = []

indentationList = [('tasks.*',taskList),('hints.*',hintsList)]

endOfStringMark = 'EOS'
valueSuffix = '.*_param'


testFormList = [('FORM_TYPE', 'quest'), ('id', '0'), ('image', '67e.jpg'), ('tasks_location', 'Yes'), ('location_latitude', '52.2248026383437'), ('location_longitude', '21.002984046936035'), ('tasks_choice', 'Yes'), ('choice_question', 'ehe'), ('choice_answer_param', 'asdgf'), ('successCode', '12'), ('hints_description', 'Yes'), ('hints_text_param', 'nooooo'), ('cost', '15'), ('EOS', ' 0'), ('FORM_TYPE', 'quest'), ('id', '1'), ('command', 'aha'), ('latitude', '52.218571841998425'), ('longitude', '21.001181602478027'), ('tasks_location', 'Yes'), ('location_latitude', '52.216284368279396'), ('location_longitude', '21.010751724243164'), ('EOS', ' 1'), ('FORM_TYPE', 'information'), ('id', '2'), ('latitude', '52.21189314033311'), ('longitude', '21.010751724243164'), ('finaldescription', 'nie'), ('EOS', ' 2')]

testQuestList = [[('FORM_TYPE', 'quest'), ('id', '0'), ('image', '67e.jpg'), ('tasks_location', 'Yes'), ('location_latitude', '52.2248026383437'), ('location_longitude', '21.002984046936035'), ('tasks_choice', 'Yes'), ('choice_question', 'ehe'), ('choice_answer_param', 'asdgf'), ('successCode', '12'), ('hints_description', 'Yes'), ('hints_text_param', 'nooooo'), ('cost', '15')], [('FORM_TYPE', 'quest'), ('id', '1'), ('command', 'aha'), ('latitude', '52.218571841998425'), ('longitude', '21.001181602478027'), ('tasks_location', 'Yes'), ('location_latitude', '52.216284368279396'), ('location_longitude', '21.010751724243164')], [('FORM_TYPE', 'information'), ('id', '2'), ('latitude', '52.21189314033311'), ('longitude', '21.010751724243164'), ('finaldescription', 'nie')]]


testChildList =  [('hints_text_param', 'asd'), ('cost', '111'), ('hints_image_param', '67e.jpg'), ('cost', '123'), ('hints_sound_param', '67e.jpg'), ('cost', '444')]