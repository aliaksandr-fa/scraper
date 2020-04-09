import ScraperJobInterface from "./ScraperJobInterface";

interface ScraperInputInterface {

    toJobs(): Array<ScraperJobInterface>;
}

export default ScraperInputInterface;