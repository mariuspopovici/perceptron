const Perceptron = () => {
  let wx = 0;
  let wy = 0;

  const train = points =>
    points.forEach(point => {
      const value = guess(point.x, point.y);
      const error = point.type - value;
      const dwx = point.x * error * 0.1;
      const dwy = point.y * error * 0.1;
      wx += dwx;
      wy += dwy;
    });

  const guess = (x, y) => (wx * x + wy * y >= 1 ? 1 : 0);

  return {
    train,
    guess
  };
};

export { Perceptron };
