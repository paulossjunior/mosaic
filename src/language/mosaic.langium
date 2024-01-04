grammar Mosaic

import 'helpers'
import 'terminals'
import 'general_information'

entry Model:
   (general_information=GeneralInformation)?
   (body+=Body)*

;

Body:
    Topic 
;

Topic:
    'Topic' topic=STRING '{'
        (
        content=STRING
        | tasks+=Tasks
        )*
    '}'
;
Tasks :
    'Tasks' '{'
        tasks+=Task
    '}' 
;
Task: 
    'Task' name=STRING (',' 'description' ':' description= STRING)? (',' 'stakeholder' ':' stakeholder=[Stakeholder:QualifiedName])? (',' 'deadline' ':' deadline= DATE)?
;
