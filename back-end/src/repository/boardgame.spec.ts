test('adds 1 + 2 to equal 3', () => {
    const sum = (...numbers:number[]):number => {
        var total:number = 0;
        numbers.forEach(s => {
            total += s;
        })
        return total
    }
    expect(sum(3,4,5)).toBe(12);
});