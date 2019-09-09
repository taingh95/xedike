//load model
const { Driver } = require("../../models/driver.model");
const { User } = require("../../models/user.model");
const { Car } = require("../../models/car.model");

module.exports.createProfile = (req, res) => {
  const userId = req.user.payload._id;
  User.findById(userId)
    .then(user => {
      if (!user) return Promise.reject({ errors: "User does not exists" });
      const driver = { ...req.body, isActive: true ,userId };
      const newDriver = new Driver(driver);
      return newDriver.save();
    })
    .then(driver => res.status(200).json(driver))
    .catch(err => res.status(400).json({ err }));
};

module.exports.getDriverInfo = (req, res) => {
  const id = req.params.userId;
  Driver.findOne({userId : id})
    .then(user => {
      if (!user) return Promise.reject({ errors: "Driver does not exists" });
      return res.status(200).json(user);
    })
    .catch(err => res.status(400).json(err));
};

module.exports.getDriverInfoByDriverId = (req,res) => {
  const id = req.params.driverId;
  Driver.findById(id)
        .then(driver => {
          if(!driver) return Promise.reject({errors: "Driver does not exists"});
          return res.status(200).json(driver)
        })
        .catch(err => res.status(400).json(err))
}


module.exports.updateDriverInfo = async (req, res) => {
  const { address, passportId, mainJob } = req.body;
  const driver = await Driver.findOne({ userId: req.user.payload._id });
  if (!driver) {
    return Promise.reject({ errors: "Driver does not exists" });
  } else {
    try {
      driver.address = address;
      driver.passportId = passportId;
      driver.mainJob = mainJob;
      await driver.save();
      res.status(200).json(driver);
      return driver;
    } catch (error) {
      return res.status(400).json({ errors: error.message });
    }
  }
};

module.exports.createNewCar = async (req, res) => {
  const { brand, model, lisencePlate, numberOfSeats } = req.body;
  const driver = await Driver.findById(req.params.driverId);
  if (!driver) {
    return Promise.reject({ errors: "Driver does not exists" });
  } else {
    try {
      const images = [];
      req.files.map(img => {
        return images.push(img.path);
      });
      const newCar = new Car({ brand, model, lisencePlate, numberOfSeats, carImages: images });
      await newCar.save();
      driver.carInfo.push(newCar);
      return driver
        .save()
        .then(driver => res.status(200).json(driver))
        .catch(err => res.status(400).json(err));
    } catch (error) {
      return res.status(400).json({ errors: error.message });
    }
  }
};


module.exports.editCar = async (req, res) => {
  const driver =  await Driver.findOne({userId: req.user.payload._id})
  const car = await Car.findByIdAndUpdate({ _id: req.params.carId})

  if(!driver || !car) {
    return Promise.reject({ errors: "Car or Driver does not exists"})
  } else {
    try {
      const images = [];
      req.files.map(img => {
        return images.push(img.path);
      });
       driver.carInfo.map( async (el,i) => {
        if(el._id.equals(car._id)) {
          car.brand = req.body.brand;
          car.model = req.body.model;
          car.lisencePlate = req.body.lisencePlate;
          numberOfSeats = req.body.numberOfSeats;
          if(images.length > 0) {
            car.carImages = images;
          }
          await car.save().then(car => console.log(car, "car"))
        } else {
           res.status(400).json({errors: "Can not find the car"})
        }
        driver.carInfo.splice(i, 1, car);
        return await driver.save()
                      .then(driver => res.status(200).json(driver))
                      .catch(err => res.status(400).json(err))
      })
    }
    catch (error) {
      return res.status(400).json({errors: error.message})
    }
  }

  // Driver.findOne({ userId: req.user.payload._id })
  //   .then(driver => {
  //     if (!driver) return Promise.reject({ errors: "Driver does not exists" });
  //     const images = [];
  //     req.files.map(img => {
  //       return images.push(img.path);
  //     });
  //     Car.findOne({ _id: req.params.carId })
  //       .then(car => {
  //         return driver.carInfo.map((el) => {
  //           if (el._id.equals(car._id)) {
  //             car.brand = req.body.brand;
  //             car.model = req.body.model;
  //             car.lisencePlate = req.body.lisencePlate;
  //             numberOfSeats = req.body.numberOfSeats;
  //             car.carImages = images;
  //             car.save()
  //           } else {
  //             return res.status(400).json({ errors: "Can not find the car" });
  //           }
  //         });
  //       })
  //       .then(result => {

  //         res.status(200).json(driver);
  //         return  driver.save();
  //       })
  //       .catch(err => res.status(400).json(err));
  //   })
  //   .catch(err => res.status(400).json(err));
};

module.exports.deleteCar = async (req,res) => {
    const driver = await Driver.findOne({userId: req.user.payload.id})
    if(!driver) return Promise.reject({errors: "Driver does not exists"})
    try {
        const deletedCar = driver.carInfo.filter(el => {
            return !el._id.equals(req.params.carId)
        })
        driver.carInfo = deletedCar;
        res.status(200).json({driver})
        return driver.save()
    } catch(error) {
       return res.status(400).json({errors: error.message})
    }
}