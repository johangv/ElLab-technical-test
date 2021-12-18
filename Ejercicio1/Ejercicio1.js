var neighborhood = [1, 0, 0, 0, 0, 1, 0, 0];
// var neighborhood:number[] = [1, 1, 1, 0, 1, 1, 1, 1];
var newNeighborhood = [];
var days = 4;
for (var day = 0; day < days; day++) {
    neighborhood.unshift(0);
    neighborhood.push(0);
    for (var index = 1; index < neighborhood.length - 1; index++) {
        if (neighborhood[index - 1] == neighborhood[index + 1]) {
            newNeighborhood[index - 1] = 0;
        }
        else {
            newNeighborhood[index - 1] = 1;
        }
    }
    neighborhood = newNeighborhood;
    newNeighborhood = [];
}
console.log(neighborhood);
