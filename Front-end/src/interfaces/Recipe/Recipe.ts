export default interface Recipe {
    _id?:string;
    title :string;
    subtitle:string;
    description:string;
    email?:string;
    web?:string;
    image:{
        url?:string;
        alt?:string;
    },
    recipeNum?: number
    likes?: string[]
    user_id?: string
    createdAt?:string
    __v?:number
}