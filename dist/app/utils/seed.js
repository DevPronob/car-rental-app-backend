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
exports.seedData = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("../config"));
const car_model_1 = require("../modules/Car/car.model");
const user_model_1 = require("../modules/User/user.model");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const dummyCars = [
    {
        name: "Tesla Model S",
        description: "Premium electric sedan with Ludicrous Mode. Experience the future of driving with unparalleled performance and safety features.",
        color: "Midnight Silver",
        isElectric: true,
        status: "available",
        features: ["Autopilot", "Glass Roof", "Heated Seats", "Premium Audio"],
        pricePerHour: 1500,
        images: ["https://images.unsplash.com/photo-1617788138017-80ad42243c59?auto=format&fit=crop&q=80&w=800"],
        featured: true,
        year: "2023",
        type: "Sedan"
    },
    {
        name: "BMW M4 Competition",
        description: "High-performance sports coupe with a roar that commands attention. Perfect for those who crave speed and precision.",
        color: "Isle of Man Green",
        isElectric: false,
        status: "available",
        features: ["M-Track Mode", "Carbon Fiber Trim", "Harman Kardon", "Laser Lights"],
        pricePerHour: 2000,
        images: ["https://images.unsplash.com/photo-1607853202273-797f1c22a38e?auto=format&fit=crop&q=80&w=800"],
        featured: true,
        year: "2024",
        type: "Coupe"
    },
    {
        name: "Range Rover Sport",
        description: "The ultimate luxury SUV for all terrains. Provides a smooth ride with a commanding view of the road.",
        color: "Santorini Black",
        isElectric: false,
        status: "available",
        features: ["All-Wheel Drive", "Panoramic Sunroof", "Air Suspension", "360 Camera"],
        pricePerHour: 2500,
        images: ["https://images.unsplash.com/photo-1606611013016-969c19ba27bb?auto=format&fit=crop&q=80&w=800"],
        featured: true,
        year: "2023",
        type: "SUV"
    },
    {
        name: "Audi e-tron GT",
        description: "Elegant electric grand tourer with stunning design and sustainable materials. Pure progress on wheels.",
        color: "Kemora Gray",
        isElectric: true,
        status: "available",
        features: ["Quattro", "Matrix LED", "B&O Sound System", "E-tron Sport Sound"],
        pricePerHour: 1800,
        images: ["https://images.unsplash.com/photo-1614200187524-dc5b8ec2223a?auto=format&fit=crop&q=80&w=800"],
        featured: true,
        year: "2024",
        type: "Sedan"
    },
    {
        name: "Mercedes-Benz G63 AMG",
        description: "The iconic G-Wagon with unmatched presence and off-road capability. A legend that continues to evolve.",
        color: "Matte Black",
        isElectric: false,
        status: "available",
        features: ["Burmester Sound", "Nappa Leather", "Active Lane Keeping", "AMG Performance Exhaust"],
        pricePerHour: 3000,
        images: ["https://images.unsplash.com/photo-1520031441872-265e4ff70366?auto=format&fit=crop&q=80&w=800"],
        featured: false,
        year: "2023",
        type: "SUV"
    },
    {
        name: "Porsche 911 GT3",
        description: "A track-focused sports car that delivers pure driving emotion. Designed for the race track, born for the road.",
        color: "Shark Blue",
        isElectric: false,
        status: "available",
        features: ["Rear-axle Steering", "Chrono Package", "Sport Exhaust", "Carbon Bucket Seats"],
        pricePerHour: 3500,
        images: ["https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=800"],
        featured: true,
        year: "2024",
        type: "Sports Car"
    },
    {
        name: "Lamborghini Urus",
        description: "The world's first Super Sport Utility Vehicle. A soul of a super sports car and the functionality of an SUV.",
        color: "Giallo Auge (Yellow)",
        isElectric: false,
        status: "available",
        features: ["4.0L V8 Bi-turbo", "Carbon Ceramic Brakes", "Bang & Olufsen Sound", "Adaptive Air Suspension"],
        pricePerHour: 4500,
        images: ["https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&q=80&w=800"],
        featured: true,
        year: "2023",
        type: "SUV"
    },
    {
        name: "Ford Mustang Mach-E",
        description: "An all-electric SUV that delivers the performance and iconic style of the Mustang with zero emissions.",
        color: "Grabber Blue",
        isElectric: true,
        status: "available",
        features: ["Brembo Brakes", "Magneride Damping", "Ford Co-Pilot360", "Panoramic Fixed-Glass Roof"],
        pricePerHour: 1200,
        images: ["https://images.unsplash.com/photo-1620055375841-7667b93175c5?auto=format&fit=crop&q=80&w=800"],
        featured: false,
        year: "2024",
        type: "Electric SUV"
    },
    {
        name: "Ferrari F8 Tributo",
        description: "The highest expression of the classic two-seater Berlinetta. A tribute to the most powerful V8 engine in Ferrari history.",
        color: "Rosso Corsa",
        isElectric: false,
        status: "available",
        features: ["Side Slip Control 6.1", "F1-Trac", "Carbon Fiber Racing Seats", "Titanium Exhaust"],
        pricePerHour: 5000,
        images: ["https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&q=80&w=800"],
        featured: true,
        year: "2022",
        type: "Supercar"
    },
    {
        name: "Rolls-Royce Ghost",
        description: "The most advanced Rolls-Royce yet. A masterpiece of engineering and craftsmanship, providing the ultimate 'Magic Carpet Ride'.",
        color: "Artic White",
        isElectric: false,
        status: "available",
        features: ["Planar Suspension", "Starlight Headliner", "Whisper-quiet Cabin", "Bespoke Audio"],
        pricePerHour: 6000,
        images: ["https://images.unsplash.com/photo-1631215160565-d05909249688?auto=format&fit=crop&q=80&w=800"],
        featured: true,
        year: "2023",
        type: "Luxury"
    }
];
const seedData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // We don't need to connect here as it's already connected in server.ts
        // But we keep it as a fallback or check
        if (mongoose_1.default.connection.readyState !== 1) {
            yield mongoose_1.default.connect(config_1.default.db_url);
        }
        console.log("Seeding data...");
        // Check if data already exists
        const carCount = yield car_model_1.Car.countDocuments();
        const userCount = yield user_model_1.User.countDocuments();
        if (carCount === 0) {
            console.log("Seeding cars...");
            yield car_model_1.Car.insertMany(dummyCars);
            console.log("Cars seeded successfully!");
        }
        else {
            console.log("Cars already exist, skipping seeding.");
        }
        if (userCount === 0) {
            console.log("Seeding users...");
            const hashedPassword = yield bcryptjs_1.default.hash("password123", Number(config_1.default.salt_rounds) || 12);
            const dummyUsers = [
                {
                    name: "Admin User",
                    email: "admin@carrental.com",
                    password: hashedPassword,
                    role: "admin",
                    phone: "1234567890",
                    address: "123 Admin St, Tech City",
                    status: "ACTIVE"
                },
                {
                    name: "Regular User",
                    email: "user@carrental.com",
                    password: hashedPassword,
                    role: "user",
                    phone: "0987654321",
                    address: "456 User Lane, Green Town",
                    status: "ACTIVE"
                },
                {
                    name: "Professional Driver",
                    email: "driver@carrental.com",
                    password: hashedPassword,
                    role: "driver",
                    phone: "5556667777",
                    address: "789 Driver Blvd, Speed City",
                    status: "ACTIVE"
                }
            ];
            yield user_model_1.User.insertMany(dummyUsers);
            console.log("Users seeded successfully!");
            console.log("---------------------------------");
            console.log("Admin: admin@carrental.com / password123");
            console.log("User: user@carrental.com / password123");
            console.log("Driver: driver@carrental.com / password123");
            console.log("---------------------------------");
        }
        else {
            console.log("Users already exist, skipping seeding.");
        }
    }
    catch (error) {
        console.error("Error seeding data:", error);
    }
});
exports.seedData = seedData;
