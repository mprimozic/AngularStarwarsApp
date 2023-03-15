export class Film {
    title: string;
    episode_id: string;
    release_date: string;

    constructor(title: string, episode_id: string, release_date: string){
        this.title = title;
        this.episode_id = episode_id;
        this.release_date = release_date;
    }
}