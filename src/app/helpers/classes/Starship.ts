export class Starship {
    name: string;
    model: string;
    cost_in_credits: number;
    starship_class: string;
    films: Array<string>;

    constructor(name: string, model: string, cost_in_credits: number, starship_class: string, films: Array<string>) {
        this.name = name;
        this.model = model;
        this.cost_in_credits = cost_in_credits;
        this.starship_class = starship_class;
        this.films = films;
    };
}