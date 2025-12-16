"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const jwt_service_1 = require("./jwt.service");
describe('JwtService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [jwt_service_1.JwtService],
        }).compile();
        service = module.get(jwt_service_1.JwtService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
