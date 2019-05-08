import { Field } from '../Objects/Field';

export const email: Field = {
    label: 'Email',
    placeholder: 'votre@email.com',
    name: 'email',
    type: 'email'
};

export const password: Field = {
    label: 'Mot de passe',
    placeholder: 'votremotdepasse',
    name: 'password',
    type: 'password'
};

export const oldpassword: Field = {
    label: 'Mot de passe actuel',
    placeholder: 'votremotdepasseactuel',
    name: 'oldpassword',
    type: 'password'
};

export const newpassword: Field = {
    label: 'Nouveau mot de passe',
    placeholder: 'votrenouveaumotdepasse',
    name: 'newpassword',
    type: 'password'
};

export const username: Field = {
    label: 'Email ou nom d\'utilisateur',
    placeholder: 'votre@email.com ou johndoe',
    name: 'username'
};

export const pseudo: Field = {
    label: 'Nom d\'utilisateur',
    placeholder: 'johndoe',
    name: 'username'
};
