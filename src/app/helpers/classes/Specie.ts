export class Specie {
    name: string;
    classification: string;
    designation: string;
    language: string;
    people?: Array<string>;

    constructor(name: string, classification: string, designation: string, language: string, people?: Array<string>) {
        this.name = name;
        this.classification = classification;
        this.designation = designation;
        this.language = language;
        this.people = people;
    }
}