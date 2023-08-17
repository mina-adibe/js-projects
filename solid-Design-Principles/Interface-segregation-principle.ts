// dont

interface IVehicle {
  drive(): void;
  fly(): void;
}

class Car implements IVehicle {
  drive(): void {
    console.log("can drive");
  }

  fly(): void {
    throw new Error("Method is not implemented.");
  }
}

class Plane implements IVehicle {
  drive(): void {
    throw new Error("Method is not implemented.");
  }

  fly(): void {
    console.log("you can fly a plane");
  }
}

// do

/*
In this implementation,
Interface is small
The class that implements the interface is not forced to implement any method it does not need.
The class is not violating the Single Responsibility Principle.
*/

interface ICar {
  drive(): void;
}

interface IPlane {
  fly(): void;
}

class Car_B implements ICar {
  drive(): void {
    console.log("you can drive a car");
  }
}

class Plane_B implements IPlane {
  fly(): void {
    console.log("you can fly a plane");
  }
}

class SuperVehicle implements ICar, IPlane {
  fly(): void {
    console.log("can fly");
  }

  drive(): void {
    console.log("can drive");
  }
}
