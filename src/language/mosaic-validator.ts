import type { ValidationAcceptor, ValidationChecks } from 'langium';
import type { MosaicAstType, Person } from './generated/ast.js';
import type { MosaicServices } from './mosaic-module.js';

/**
 * Register custom validation checks.
 */
export function registerValidationChecks(services: MosaicServices) {
    const registry = services.validation.ValidationRegistry;
    const validator = services.validation.MosaicValidator;
    const checks: ValidationChecks<MosaicAstType> = {
        Person: validator.checkPersonStartsWithCapital
    };
    registry.register(checks, validator);
}

/**
 * Implementation of custom validations.
 */
export class MosaicValidator {

    checkPersonStartsWithCapital(person: Person, accept: ValidationAcceptor): void {
        if (person.name) {
            const firstChar = person.name.substring(0, 1);
            if (firstChar.toUpperCase() !== firstChar) {
                accept('warning', 'Person name should start with a capital.', { node: person, property: 'name' });
            }
        }
    }

}
