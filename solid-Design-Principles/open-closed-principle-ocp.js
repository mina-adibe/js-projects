// with functions

// do not
// if i want to add a new discount i shoud modify the calculatePrice function  > thats violate the ocp principle
function calculatePrice(price, discount) {
  if (discount === "10%") {
    return price * 0.9;
  } else if (discount === "20%") {
    return price * 0.8;
  } else if (discount === "30%") {
    return price * 0.7;
  } else {
    throw new Error("Invalid discount");
  }
}

const discountedPriceA = calculatePrice(100, "10%");
console.log(`Your discounted price is ${discountedPriceA}`); //  The discount you get is 90

// do
// with this i can add discounts without touch  the calculatePrice function
const discounts = {
  "10%": 0.9,
  "20%": 0.8,
  "30%": 0.7,
};

function calculatePrice(price, discountType) {
  const discount = discounts[discountType];
  if (discount === undefined) {
    throw new Error("Invalid discount");
  }
  return price * discount;
}

const discountedPriceB = calculatePrice(100, "30%");
console.log(`Your discounted price is $${discountedPriceB}`);

//-----------------------------------

// do not :
class Square {
  constructor(size) {
    this.size = size;
    this.type = "square";
  }
}

class Circle {
  constructor(radius) {
    this.radius = radius;
    this.type = "circle";
  }
}

class Rectangle {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.type = "Rectangle";
  }
}

function getTotalAreas(shapes) {
  return shapes.reduce((total, shape) => {
    if (shape.type === "square") {
      total += shape.size * shape.size;
    } else if (shape.type === "circle") {
      total += Math.PI * shape.radius;
    } else if (shape.type === "circle") {
      total += shape.width * shape.height;
    }
    return total;
  }, 0);
}

const myShapes = [new Square(4), new Circle(4), new Rectangle(3, 5)];
getTotalAreas(myShapes);

// do

class Square {
  constructor(size) {
    this.size = size;
  }
  getArea() {
    return this.size * this.size;
  }
}

class Circle {
  constructor(radius) {
    this.radius = radius;
  }
  getArea() {
    return Math.PI * (this.radius * this.radius);
  }
}

class Rectangle {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }
  getArea() {
    return this.width * this.height;
  }
}

function getTotalAreas(shapes) {
  return shapes.reduce((total, shape) => {
    return total + shape.getArea();
  }, 0);
}

const myShapesB = [new Square(4), new Circle(4), new Rectangle(3, 5)];

getTotalAreas(myShapesB);
