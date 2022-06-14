import IRankedChoiceVoting from './IRankedChoiceVoting';
import { Tallies, VotesData } from './types/definitions.types';

export default class RankedChoiceVoting implements IRankedChoiceVoting {
    private _winners: string[] = [];
    private _dataPerRound: VotesData[] = [];

    public constructor(private _candidates: string[], private _votes: string[][]) {}

    public get winners(): string[] {
        return this._winners;
    }

    public get dataPerRound(): VotesData[] {
        return this._dataPerRound;
    }

    public get candidates(): string[] {
        return this._candidates;
    }

    public calculateVotes() {
        let votes = this._votes;

        let votesData: VotesData = {
            tallies: {} as Tallies,
            roundVotes: [],
        };

        while (votes.length) {
            votesData.tallies = this.calculateTallies(votes);
            votesData.roundVotes = votes;

            if (
                votesData.tallies.roundWinnersPercentage >= 0.51 ||
                votesData.tallies.roundLosersPercentage === votesData.tallies.roundWinnersPercentage
            ) {
                this._dataPerRound.push(votesData);
                this._winners = votesData.tallies.roundWinners;
                return;
            }

            votes = this.removeCandidates(votes, votesData.tallies.roundLosers);
            this._dataPerRound.push(votesData);
        }
    }

    private calculateTallies(votes: string[][]): Tallies {
        let tallies: { [k: string]: number } = {};
        let topVote = '';

        votes.forEach(candidates => {
            if (candidates.length) {
                topVote = candidates[0];

                if (!tallies[topVote]) {
                    tallies[topVote] = 0;
                }

                tallies[topVote]++;
            }
        });

        let highScore: number;
        let roundWinners: string[] = [];
        let loserScore: number;
        let roundLosers: string[] = [];

        for (let candidate in tallies) {
            const score = tallies[candidate];

            if (!highScore || highScore < score) {
                highScore = score;
                roundWinners = [candidate];
            } else if (highScore === score) {
                roundWinners.push(candidate);
            }

            if (!loserScore || loserScore > score) {
                loserScore = score;
                roundLosers = [candidate];
            } else if (loserScore === score) {
                roundLosers.push(candidate);
            }
        }

        return {
            roundWinners: roundWinners,
            roundWinnersPercentage: highScore / votes.length,
            roundLosers: roundLosers,
            roundLosersPercentage: loserScore / votes.length,
        };
    }

    private removeCandidates(votes: string[][], roundLosers: string[]): string[][] {
        let newVotesData: string[][] = [];
        let newVotes: string[];
        votes.forEach(vote => {
            newVotes = [];

            vote.forEach(candidate => {
                if (!roundLosers.includes(candidate)) {
                    newVotes.push(candidate);
                }
            });

            newVotesData.push(newVotes);
        });

        return newVotesData;
    }
}
