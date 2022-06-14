# Ranked choice voting algorithm written in TypeScript 4

For a short explanation of what is Ranked choice voting watch this video: https://www.youtube.com/watch?v=a8p69jKtDIY

## Usage
```typescript
const candidates: string[] = ['apple', 'marshmallow', 'banana', 'lollipop'];
const votes: string[][] = [
    ['apple', 'marshmallow', 'banana', 'lollipop'],
    ['marshmallow', 'apple', 'lollipop', 'banana'],
    ['marshmallow', 'lollipop', 'banana', 'apple'],
    ['marshmallow', 'lollipop', 'banana', 'apple'],
];

const rankedChoice = new RankedChoiceVoting(candidates, votes)
rankedChoice.calculateVotes();

// available params
rankedChoice.winners // string[]
rankedChoice.candidates // string[]
rankedChoice.dataPerRound // VotesData[]
```
