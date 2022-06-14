import { VotesData } from './types/definitions.types';
export default interface IRankedChoiceVoting {
    winners: string[];
    dataPerRound: VotesData[];
    candidates: string[];
    calculateVotes: () => void;
}
