import RankedChoiceVoting from '../RankedChoiceVoting';
describe('Ranked choice voting test', () => {
    it('basic winner test', () => {
        const rankedChoice = new RankedChoiceVoting(['apple', 'marshmallow', 'banana', 'lollipop'], [
            ['apple', 'marshmallow', 'banana', 'lollipop'],
            ['marshmallow', 'apple', 'lollipop', 'banana'],
            ['marshmallow', 'lollipop', 'banana', 'apple'],
            ['marshmallow', 'lollipop', 'banana', 'apple'],
        ])

        rankedChoice.calculateVotes();

        expect(rankedChoice.candidates).toEqual(['apple', 'marshmallow', 'banana', 'lollipop']);
        expect(rankedChoice.winners).toEqual(['marshmallow']);
    });

    it('missing data test', () => {
        const rankedChoice = new RankedChoiceVoting(['apple', 'marshmallow', 'banana', 'lollipop'], [
            ['', 'marshmallow', 'banana', 'lollipop'],
            ['marshmallow', 'apple', '', 'banana'],
            ['marshmallow', 'lollipop', 'banana', 'apple'],
            ['marshmallow', 'lollipop', '', 'apple'],
        ])

        rankedChoice.calculateVotes();
        expect(rankedChoice.winners).toEqual(['marshmallow']);
    });
});