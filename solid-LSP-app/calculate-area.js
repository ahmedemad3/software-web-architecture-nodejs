// Shape class
class Shape {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  calculateArea() {
    // method to calculate the area of a shape
  }
}

// Rectangle class
class Rectangle extends Shape {
  constructor(width, height) {
    super(width, height);
  }

  calculateArea() {
    return this.width * this.height;
  }
}

// Square class
class Square extends Shape {
  constructor(side) {
    super(side, side);
  }

  calculateArea() {
    return this.width * this.width;
  }
}
