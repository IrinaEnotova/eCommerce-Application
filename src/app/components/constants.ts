import { ValidTemplates } from '../types/types';

export const countries = { '': '', 'United States': 'US', Kazakhstan: 'KZ' };

export const salutation = { '': '', Mr: 'Mr', Mrs: 'Mrs' };

export const validTemplates: ValidTemplates = {
  firstName: [/^[a-zA-Z]+$/, 'Must contain at least one character (use a-z, A-Z) and no special characters or numbers'],
  lastName: [/^[a-zA-Z]+$/, 'Must contain at least one character (use a-z, A-Z) and no special characters or numbers'],
  streetName: [/^[a-zA-Z0-9-]+$/, 'Must contain at least one character (use a-z, A-Z, 0-9, -)'],
  city: [/^[a-zA-Z]+$/, 'Must contain at least one character (use a-z, A-Z, -) and no special characters or numbers'],
};

export const emailRequirements: [RegExp, string][] = [
  [/.{6,}/, 'Email address must be at least 6 characters long.'],
  [/@/, '<p>Email address must contain an "@" symbol separating local part and domain name.</p>'],
  [/@((\w){2,10}\.)?(\w){2,10}\.(\w){2,4}$/, '<p>Email address must contain a domain name (e.g., example.com).</p>'],
  [/^[^ ]*$/, '<p>Email address must not contain whitespace.</p>'],
  [/^[a-zA-Z0-9.@_-]*$/, 'Email address contains incorrect symbol (use a-z, A-Z, 0-9, ._-@).'],
];

export const passwordRequirements: [RegExp, string][] = [
  [/.{8,}/, 'Password must be at least 8 characters long.'],
  [/^[a-zA-Z0-9!@$%^&*_+.,~:;-]*$/, 'Password contains incorrect symbol (use a-z, A-Z, 0-9, !@$%^&*_+.,~:;-).'],
  [/[a-z]/, '<p>Password must contain at least one lowercase letter (use a-z).</p>'],
  [/[A-Z]/, '<p>Password must contain at least one uppercase letter (use A-Z).</p>'],
  [/[0-9]/, '<p>Password must contain at least one digit (0-9).</p>'],
  [/[!@$%^&*_+.,~:;-]/, '<p>Password must contain at least one special character (use !@$%^&*_+.,~:;-).</p>'],
  [/^[^ ]*$/, '<p>Password must not contain whitespace.</p>'],
];

export const sorterParametrs = {
  '': 'Sort by ',
  'name-asc': 'Products: A to Z',
  'name-desc': 'Products: Z to A',
  'price-asc': 'Price: Low to High',
  'price-desc': 'Price: High to Low',
};

export const promoCodes: { [key: string]: string }[] = [
  { discount: '25%', promocode: 'BABY', discountID: '73449353-776a-41c3-965b-830320d60836' },
  { discount: '10%', promocode: 'FALL', discountID: 'f9e37b1a-182f-4f4d-aaeb-65fcc6cd3477' },
];

export const teammates: { [key: string]: string }[] = [
  {
    name: 'Kristina Morozova',
    role: 'Developer',
    bio: `Novice frontend-developer with technical education. I became interested in programming by writing small scripts to automate routine operations and creating extensions for engineering software in Python. And one day I participated in the development of a small web application and from that moment I understood that I want to become web developer. I am constantly striving to learn new technologies and look to ways to better myself in the field of web development.`,
    github: 'https://github.com/kris-vadi',
    telegram: 'https://t.me/@kristinavadi',
  },
  {
    name: 'Natalia Lebedeva',
    role: 'Developer',
    bio: `Novice frontend-developer with technical education. I became interested in programming by writing small scripts to automate routine operations and creating extensions for engineering software in Python. And one day I participated in the development of a small web application and from that moment I understood that I want to become web developer. I am constantly striving to learn new technologies and look to ways to better myself in the field of web development.`,
    github: 'https://github.com/natanchik',
    telegram: 'https://t.me/@natanchik1',
  },
  {
    name: 'Irina Akhanteva',
    role: 'Developer',
    bio: `Novice frontend-developer with technical education. I became interested in programming by writing small scripts to automate routine operations and creating extensions for engineering software in Python. And one day I participated in the development of a small web application and from that moment I understood that I want to become web developer. I am constantly striving to learn new technologies and look to ways to better myself in the field of web development.`,
    github: 'https://github.com/IrinaEnotova',
    telegram: 'https://t.me/irinaenotova',
  },
];
