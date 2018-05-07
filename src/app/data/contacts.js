var uuid = require('node-uuid');
export const contactsData = [
    {
        id: uuid.v4(),
        firstname: 'Giampiero',
        lastname: 'Bonifazi',
        email: 'gpbonifazi@gmail.com',
        country: 'Italy',
        updating: false,
        deleting: false
    },
    {
        id: uuid.v4(),
        firstname: 'Mark',
        lastname: 'Spencer',
        email: 'markspencer@test.com',
        country: 'USA',
        updating: false,
        deleting: false
    },
    {
        id: uuid.v4(),
        firstname: 'Sarah',
        lastname: 'Mendoza',
        email: 'sara@test.com',
        country: 'Mexico',
        updating: false,
        deleting: false
    }
]
