import type { CombinedProductSchema } from "@project/shared"
import { randomUUID } from 'node:crypto'

export const products: CombinedProductSchema[] = [
    {
        productId: randomUUID(),
        name: "Lunar Explorer Backpack",
        price: 899,
        image: "https://res.cloudinary.com/asynlmdd/image/upload/v1790175046/ChatGPT_Image_23_sep._2026_15_54_37.png",
        amountInStock: 15
    },
    {
        productId: randomUUID(),
        name: "Mars Mission Water Bottle",
        price: 249,
        image: "https://res.cloudinary.com/asynlmdd/image/upload/v1790175046/ChatGPT_Image_23_sep._2026_15_55_45.png",
        amountInStock: 32
    },
    {
        productId: randomUUID(),
        name: "Astronaut Thermal Mug",
        price: 199,
        image: "https://res.cloudinary.com/asynlmdd/image/upload/v1790175046/ChatGPT_Image_23_sep._2026_15_56_52.png",
        amountInStock: 45
    },
    {
        productId: randomUUID(),
        name: "Cosmic Hoodie",
        price: 599,
        image: "https://res.cloudinary.com/asynlmdd/image/upload/v1790175683/ChatGPT_Image_23_sep._2026_17_00_05.png",
        amountInStock: 20
    },
    {
        productId: randomUUID(),
        name: "Zero Gravity T-Shirt",
        price: 299,
        image: "https://res.cloudinary.com/asynlmdd/image/upload/v1790175046/ChatGPT_Image_23_sep._2026_16_18_13.png",
        amountInStock: 38
    },
    {
        productId: randomUUID(),
        name: "Space Ranger Cap",
        price: 199,
        image: "https://res.cloudinary.com/asynlmdd/image/upload/v1790174843/ChatGPT_Image_23_sep._2026_16_19_43.png",
        amountInStock: 27
    },
    {
        productId: randomUUID(),
        name: "Moonwalker Sneakers",
        price: 999,
        image: "https://res.cloudinary.com/asynlmdd/image/upload/v1790175046/ChatGPT_Image_23_sep._2026_16_20_50.png",
        amountInStock: 12
    },
    {
        productId: randomUUID(),
        name: "Galaxy LED Lamp",
        price: 449,
        image: "https://res.cloudinary.com/asynlmdd/image/upload/v1790175045/ChatGPT_Image_23_sep._2026_16_21_56.png",
        amountInStock: 18
    },
    {
        productId: randomUUID(),
        name: "Mini Saturn Desk Model",
        price: 349,
        image: "https://res.cloudinary.com/asynlmdd/image/upload/v1790175045/ChatGPT_Image_23_sep._2026_16_25_25.png",
        amountInStock: 25
    },
    {
        productId: randomUUID(),
        name: "Rocket Launch Model",
        price: 499,
        image: "https://res.cloudinary.com/asynlmdd/image/upload/v1790175045/ChatGPT_Image_23_sep._2026_16_24_21.png",
        amountInStock: 17
    },
    {
        productId: randomUUID(),
        name: "Mars Rover Toy",
        price: 399,
        image: "https://res.cloudinary.com/asynlmdd/image/upload/v1790175045/ChatGPT_Image_23_sep._2026_16_25_25.png",
        amountInStock: 22
    },
    {
        productId: randomUUID(),
        name: "Lunar Base Building Kit",
        price: 699,
        image: "https://res.cloudinary.com/asynlmdd/image/upload/v1790175045/ChatGPT_Image_23_sep._2026_16_27_03.png",
        amountInStock: 14
    },
    {
        productId: randomUUID(),
        name: "Cosmic Notebook",
        price: 129,
        image: "https://res.cloudinary.com/asynlmdd/image/upload/v1790175045/ChatGPT_Image_23_sep._2026_16_29_19.png",
        amountInStock: 60
    },
    {
        productId: randomUUID(),
        name: "Mission Control Keyboard",
        price: 799,
        image: "https://res.cloudinary.com/asynlmdd/image/upload/v1790175044/ChatGPT_Image_23_sep._2026_16_30_28.png",
        amountInStock: 10
    },
    {
        productId: randomUUID(),
        name: "Astro Wireless Headphones",
        price: 899,
        image: "https://res.cloudinary.com/asynlmdd/image/upload/v1790175044/ChatGPT_Image_23_sep._2026_16_31_42.png",
        amountInStock: 16
    },
    {
        productId: randomUUID(),
        name: "Orbital Power Bank",
        price: 499,
        image: "https://res.cloudinary.com/asynlmdd/image/upload/v1790175044/ChatGPT_Image_23_sep._2026_16_33_28.png",
        amountInStock: 24
    },
    {
        productId: randomUUID(),
        name: "Space Explorer Flashlight",
        price: 299,
        image: "https://res.cloudinary.com/asynlmdd/image/upload/v1790175044/ChatGPT_Image_23_sep._2026_16_34_38.png",
        amountInStock: 30
    },
    {
        productId: randomUUID(),
        name: "Meteorite Desk Clock",
        price: 549,
        image: "https://res.cloudinary.com/asynlmdd/image/upload/v1790175044/ChatGPT_Image_23_sep._2026_16_35_51.png",
        amountInStock: 13
    },
    {
        productId: randomUUID(),
        name: "Interstellar Phone Case",
        price: 199,
        image: "https://res.cloudinary.com/asynlmdd/image/upload/v1790175043/ChatGPT_Image_23_sep._2026_16_37_47.png",
        amountInStock: 40
    },
    {
        productId: randomUUID(),
        name: "Astronaut Survival Kit",
        price: 749,
        image: "https://res.cloudinary.com/asynlmdd/image/upload/v1790175044/ChatGPT_Image_23_sep._2026_16_39_09.png",
        amountInStock: 19
    }
]