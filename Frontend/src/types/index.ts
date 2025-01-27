export interface Product {
    id: string
    name: string
    code: string
    brandName: string
    partNumber: string
    category: string
    subCategory: string
    image: string
    price: number
  }
  
  export interface Category {
    id: string
    name: string
    subCategories: SubCategory[]
  }
  
  export interface SubCategory {
    id: string
    name: string
    categoryId: string
  }
  
  export interface User {
    id: string
    email: string
    name: string
  }