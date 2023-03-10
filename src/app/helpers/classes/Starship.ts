export class Starship {
    name: string;
    model: string;
    cost_in_credits: number;
    starship_class: string;

    constructor(name: string, model: string, cost_in_credits: number, starship_class: string) {
        this.name = name;
        this.model = model;
        this.cost_in_credits = cost_in_credits;
        this.starship_class = starship_class;
    };
}