import Recipe from "../interfaces/Recipe/Recipe";
import User from "../interfaces/User";

export const normalizeUser = (values: any): User => {
  return {
    name: {
      first: values.first,
      middle: values.middle,
      last: values.last,
    },
    phone: values.phone,
    email: values.email,
    password: values.password,
    image: {
      url: values.url,
      alt: values.alt,
    },
    address: {
      country: values.country,
      city: values.city,
      street: values.street,
    },
    isCook: values.isCook,
  };
};

export const normalizeRecipe = (values: any): Recipe => {
  return {
    title: values.title,
    subtitle: values.subtitle,
    description: values.description,
    web: values.web,
    image: {
      url: values.url,
      alt: values.alt,
    }
  };
};
