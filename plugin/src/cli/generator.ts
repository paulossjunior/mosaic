import type { Model } from '../language/generated/ast.js';
import * as path from 'node:path';
import { markdownGenerator } from './markdown_generator/generator.js';

export function generateJavaScript(model: Model, filePath: string, destination: string | undefined): string {
    const final_destination = extractDestination(filePath, destination)

    markdownGenerator(model, final_destination)

    return final_destination;
}

function extractDestination(filePath: string, destination?: string) : string {
    const path_ext = new RegExp(path.extname(filePath)+'$', 'g')
    filePath = filePath.replace(path_ext, '')
  
    return destination ?? path.join(path.dirname(filePath), "generated")
  }
