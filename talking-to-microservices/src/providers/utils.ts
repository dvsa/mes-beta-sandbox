
function getRandomInt(max: number): number {
  return Math.floor(Math.random() * Math.floor(max));
}

export function shouldFail(): boolean {
  const randomNumber = getRandomInt(2);
  return randomNumber === 1;
}
  