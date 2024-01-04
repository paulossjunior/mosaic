import type { ValidationChecks } from 'langium';
import type { MosaicAstType } from './generated/ast.js';
import type { MosaicServices } from './mosaic-module.js';

/**
 * Register custom validation checks.
 */
export function registerValidationChecks(services: MosaicServices) {
    const registry = services.validation.ValidationRegistry;
    const validator = services.validation.MosaicValidator;
    const checks: ValidationChecks<MosaicAstType> = {
       
    };
    registry.register(checks, validator);
}

/**
 * Implementation of custom validations.
 */
export class MosaicValidator {

    

}
