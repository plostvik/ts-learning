function minimumFuel50(
  target: Object,
  propertyKey: string,
  descriptor: PropertyDescriptor,
): any {
  // console.log("target:", target);
  // console.log("propertyKey:", propertyKey);
  // console.log("descriptor:", descriptor);

  const minFuel = 50;
  console.log("called minimumFuel50 decorator");
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    console.log("called decorated function");
    let rocket = this;
    if (rocket.fuel >= minFuel) {
      originalMethod.apply(rocket, args);
    } else {
      console.log("Not enough fuel!");
    }
  };

  return descriptor;
}

function minimumFuel(minFuel: number): any {
  console.log("called decorator factory with minFuel:", minFuel);
  return function (
    target: Object,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ): any {
    console.log("called minimumFuel decorator");
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      console.log("called decorated function");
      if (this.fuel >= minFuel) {
        originalMethod.apply(this, args);
      } else {
        console.log("Not enough fuel!");
      }
    };

    return descriptor;
  };
}

class Rocket {
  fuel = 50;

  // @minimumFuel50
  @minimumFuel(100)
  launchToMars() {
    console.log("Launching to Mars in 3... 2... 1... 🚀");
  }

  // @minimumFuel50
  @minimumFuel(200)
  launchToEarth() {
    console.log("Launching to Earth in 3... 2... 1... 🚀");
  }
}

let rocket1 = new Rocket();
rocket1.fuel = 49;
console.log("rocket created");
rocket1.launchToMars();

export {};
