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
        (content=STRING
        | activities+=Activity
        )*
    '}'
;

Activity: 
    'Activity' ':' name=STRING ('stakeholder'':' stakeholder=[Stakeholder:STRING])?  ( 'description' ':' description= STRING)? ('deadline' ':' deadline= DATE)?
//    // (',' 'stakeholder' ':' stakeholder=[Stakeholder:QualifiedName])? 
;
