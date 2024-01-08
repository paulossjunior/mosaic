import { GeneralInformation, Model, Topic, isTopic } from "../../language/generated/ast.js";
import fs from "fs";
import { createPath } from '../generator-utils.js'
import { expandToStringWithNL } from "langium";
import path from 'path'


export function markdownGenerator(model: Model, target_folder: string) : void {
    
    generate(model,target_folder)
}

export function generate(model: Model, target_folder: string) : void {
    fs.mkdirSync(target_folder, {recursive:true})

    const DOCUMENATION_PATH = createPath(target_folder, "meetings")

    if (model.general_information){
        const date = transformarFormatoData(model.general_information.date)
        fs.writeFileSync(path.join(DOCUMENATION_PATH, 'readme_'+date+'.md'),createMeetingtReadme(model))
    }
}

function transformarFormatoData(dataOriginal: string): string | null {
    // Verifique se a string de data está no formato esperado
    const regexData = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!regexData.test(dataOriginal)) {
        console.error("Formato de data inválido. Use o formato DD/MM/AAAA.");
        return null;
    }

    // Divida a string da data em partes
    const partesData = dataOriginal.split('/');

    // Reorganize as partes para o formato desejado: AAAAMMDD
    const dataFormatada = `${partesData[2]}${partesData[1]}${partesData[0]}`;

    return dataFormatada;
}

function createMeetingtReadme(model: Model): string {
    return expandToStringWithNL`

    ${model.general_information? createGeneralInformation(model.general_information): "General Information Not Informed"}

    ${model.body.filter(isTopic).map(topic => createTopic(topic))}
    `
}

function createTopic(topic: Topic):String{
    return expandToStringWithNL`
    
## ${topic.topic}

${topic.content}

### Activities:
${topic.activities.map(activity => `* **${activity.name} (Deadline: ${activity.deadline})**: ${activity.description}`).join("\n")}
`
}

// create head of the document
function createGeneralInformation(general_information: GeneralInformation): String{
    return expandToStringWithNL`

    # Meeting ${general_information?.about} - ${general_information?.date}

    ${general_information?.resume}

    ## Partipants:
    ${general_information?.stakeholders.map(stakeholder=> `* ${stakeholder.name}`).join("\n")}


    `
}