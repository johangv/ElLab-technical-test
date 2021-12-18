var neighborhood:number[] = [1, 0, 0, 0, 0, 1, 0, 0];

// var neighborhood:number[] = [1, 1, 1, 0, 1, 1, 1, 1];

var newNeighborhood:number[] = [];

var days:number = 4;

for (let day:number = 0; day < days; day++) {

    neighborhood.unshift(0);
    neighborhood.push(0);

        for (let index:number = 1; index < neighborhood.length-1; index++) {

            if (neighborhood[index-1] == neighborhood[index+1]) {
                newNeighborhood[index-1] = 0; 
            } else {
                newNeighborhood[index-1] = 1;
            }
        }

    neighborhood = newNeighborhood;
    newNeighborhood = [];
}

console.log(neighborhood);


