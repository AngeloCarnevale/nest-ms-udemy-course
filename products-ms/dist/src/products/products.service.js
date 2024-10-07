"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const microservices_1 = require("@nestjs/microservices");
let ProductsService = class ProductsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createProductDto) {
        const product = await this.prisma.product.create({
            data: createProductDto,
        });
        return product;
    }
    async findAll(paginationDto) {
        const { limit, page } = paginationDto;
        const totalPages = await this.prisma.product.count({
            where: { available: true },
        });
        const lastPage = Math.ceil(totalPages / limit);
        const result = await this.prisma.product.findMany({
            where: {
                available: true,
            },
            take: limit,
            skip: (page - 1) * limit,
        });
        return {
            data: result,
            meta: {
                total: totalPages,
                page: page,
                lastPage: lastPage,
            },
        };
    }
    async findOne(id) {
        const product = await this.prisma.product.findUnique({
            where: {
                id,
                available: true,
            },
        });
        if (!product) {
            throw new microservices_1.RpcException(`Product with id #${id} not found`);
        }
        return product;
    }
    async update(id, updateProductDto) {
        const { id: __, ...data } = updateProductDto;
        await this.findOne(id);
        const updatedProduct = await this.prisma.product.update({
            where: { id },
            data: data,
        });
        return updatedProduct;
    }
    async remove(id) {
        await this.findOne(id);
        const product = await this.prisma.product.update({
            where: { id },
            data: { available: false },
        });
        return product;
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductsService);
//# sourceMappingURL=products.service.js.map