import generateName from "sillyname";
import superheroes from "superheroes";
let newName = generateName();
let newHero = superheroes.random();

console.log(`${newName} is very stupid name`);
console.log(`My super hero name is ${newHero}!`);