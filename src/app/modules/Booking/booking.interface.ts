import { Types } from "mongoose";

export interface IBooking {
    car: Types.ObjectId;
    driver?: Types.ObjectId;
    email: string;
    date: string;
    pickUpLocation: string;
    coordinates?: {
        lat: number;
        lng: number;
    };
    costWithFeature: number;
    startTime: string;
    endTime?: string;
    customerDetails: {
        name: string;
        email: string;
        nid: string;
        drivingLicense: string;
    };
    additationalFeatures: {
        childSeat: boolean;
        gps: boolean;
        mobileWifi: boolean;
    };
    status: 'pending' | 'confirmed' | 'ongoing' | 'completed' | 'cancelled';
    isDeleted: boolean;
}
