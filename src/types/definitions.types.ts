export type Tallies = {
    roundWinners: string[];
    roundWinnersPercentage: number;
    roundLosers: string[];
    roundLosersPercentage: number;
};

export type VotesData = {
    tallies: Tallies;
    roundVotes: string[][];
};
