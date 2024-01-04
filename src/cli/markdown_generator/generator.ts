import { GeneralInformation, Model } from "../../language/generated/ast.js";
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
        fs.writeFileSync(path.join(DOCUMENATION_PATH, 'README.md'),createMeetingtReadme(model))
    }
}

function createMeetingtReadme(model: Model): string {
    return expandToStringWithNL`

    ${model.general_information? createGeneralInformation(model.general_information): "General Information Not Informed"}

    `
}

function createGeneralInformation(general_information: GeneralInformation): String{
    return expandToStringWithNL`

    # Meeting ${general_information?.about} - ${general_information?.date}

    ${general_information?.resume}

    ## Partipants:
    ${general_information?.stakeholders.map(stakeholder=> `* **[${stakeholder.name}](./${stakeholder.email}/)**}`).join("\n")}


    `
}