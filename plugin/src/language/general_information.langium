import 'terminals'

GeneralInformation:
    'Meeting' '{'
        (Subject & Resume & MeetDate & Stakeholders)
    '}'
;

fragment Subject:
    'subject:' about=STRING 
;

fragment Resume:
    'resume:' resume=STRING
;

fragment MeetDate:
    'date:' date=DATE
;

fragment Stakeholders:
    'stakeholders' '{' 
     (stakeholders+=Stakeholder)*
     '}'
;

Stakeholder:
    'name:' name=STRING ',' 'email:' email=STRING
;
