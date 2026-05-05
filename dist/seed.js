"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("./app/config"));
const car_model_1 = require("./app/modules/Car/car.model");
const carData = [
    {
        name: 'Tesla Model S',
        description: 'A premium electric sedan with long range and high performance.',
        color: 'Red',
        isElectric: true,
        status: 'available',
        features: ['Autopilot', 'Panoramic Sunroof', 'Ludicrous Mode'],
        pricePerHour: 50,
        isDeleted: false,
        images: ['https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&q=80&w=1000'],
        featured: true,
        year: '2023',
        type: 'Sedan',
    },
    {
        name: 'BMW M4 Competition',
        description: 'High-performance coupe with aggressive styling and precision handling.',
        color: 'Isle of Man Green',
        isElectric: false,
        status: 'available',
        features: ['M Dynamic Mode', 'Carbon Fiber Interior', 'Harman Kardon Sound'],
        pricePerHour: 75,
        isDeleted: false,
        images: ['https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&q=80&w=1000'],
        featured: true,
        year: '2024',
        type: 'Coupe',
    },
    {
        name: 'Audi R8 V10',
        description: 'The ultimate supercar with a naturally aspirated V10 engine.',
        color: 'Mythos Black',
        isElectric: false,
        status: 'available',
        features: ['Quattro AWD', 'Virtual Cockpit', 'Laser Lights'],
        pricePerHour: 150,
        isDeleted: false,
        images: ['https://images.unsplash.com/photo-1603553323144-481bc336c8bd?auto=format&fit=crop&q=80&w=1000'],
        featured: true,
        year: '2022',
        type: 'Supercar',
    },
    {
        name: 'Mercedes-Benz G63 AMG',
        description: 'The iconic G-Wagon with unmatched presence and off-road capability.',
        color: 'Matte Grey',
        isElectric: false,
        status: 'available',
        features: ['Burmester Surround Sound', 'Nappa Leather', 'Active Lane Keeping'],
        pricePerHour: 120,
        isDeleted: false,
        images: ['https://images.unsplash.com/photo-1520031441872-265e4ff70366?auto=format&fit=crop&q=80&w=1000'],
        featured: false,
        year: '2023',
        type: 'SUV',
    },
    {
        name: 'Porsche 911 GT3',
        description: 'A track-focused sports car that delivers pure driving emotion.',
        color: 'Shark Blue',
        isElectric: false,
        status: 'available',
        features: ['Rear-axle Steering', 'Chrono Package', 'Sport Exhaust'],
        pricePerHour: 200,
        isDeleted: false,
        images: ['https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=1000'],
        featured: true,
        year: '2024',
        type: 'Sports Car',
    }
];
const seedData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(config_1.default.db_url);
        console.log('Connected to MongoDB');
        // Clear existing cars
        yield car_model_1.Car.deleteMany({});
        console.log('Cleared existing car data');
        // Insert new cars
        yield car_model_1.Car.insertMany(carData);
        console.log('Seeded car data successfully');
        process.exit(0);
    }
    catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
});
seedData();
