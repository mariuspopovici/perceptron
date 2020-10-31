import { Perceptron } from './src/perceptron.js';

const getData = async () => {
  const response = await fetch('data/dataset.json');
  return await response.json();
};

const draw = async (canvas, points) => {
  points.forEach(point => drawCircle(canvas, point));
};

const canvasClick = args => {
  const type = args.perceptron.guess(args.x, args.y);
  drawCircle(args.target, { x: args.x, y: args.y, type }, 10);
};

const drawCircle = (canvas, point, radius = 5) => {
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = point.type === 1 ? 'rgb(200, 0, 0)' : 'rgb(0, 0, 200)';
  ctx.beginPath();
  ctx.arc(point.x, point.y, radius, 0, 2 * Math.PI, false);
  ctx.fill();
  ctx.lineWidth = 1;
  ctx.strokeStyle = '#003300';
  ctx.stroke();
};

// MAIN
(async () => {
  const canvas = document.getElementById('canvas');
  const points = await getData();

  draw(canvas, points);

  const perceptron = Perceptron();
  perceptron.train(points);

  canvas.addEventListener('click', event => {
    canvasClick({
      target: event.currentTarget,
      x: event.pageX,
      y: event.pageY,
      perceptron
    });
  });
})();
