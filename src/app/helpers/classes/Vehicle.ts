export class Vehicle {
    name: string;
    model: string;
    manufacturer: string;
    cost_in_credits: number;

    constructor(name: string, model: string, manufacturer: string, cost_in_credits: number) {
        this.name = name;
        this.model = model;
        this.manufacturer = manufacturer;
        this.cost_in_credits = cost_in_credits;
    }
}