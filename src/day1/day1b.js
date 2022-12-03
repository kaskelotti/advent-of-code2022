const { readFile } = require('fs');
const { promisify } = require('util');
const { splitWhenever, equals, map, sum, addIndex, sortWith, descend, prop, take } = require('ramda');

const read = promisify(readFile);
const mapWithIndex = addIndex(map);
const sortByCaloriesDesc = sortWith([descend(prop('calories'))]);

read('./input')
    .then(String)
    .then(data => data.split(/\r?\n/))
    .then(splitWhenever(equals('')))
    .then(elfItems => {
        return mapWithIndex((items, index) => ({
            ord: index + 1,
            items,
            calories: sum(items)
        }), elfItems);
    })
    .then(sortByCaloriesDesc)
    .then(take(3))
    .then(topElves => sum(map(elf => elf.calories, topElves)))
    .then(calories => console.log(`Top 3 elves have total of ${calories} calories`))
    .catch(e => console.log('Elfs are not happy at the moment :(', e))
