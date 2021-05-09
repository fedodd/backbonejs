// simulate server data

const contact1 = new ContactModel({
  name: 'Fedor',
  phone: '+7-999-999-99-99',
});
const contact2 = new ContactModel({
  name: 'Ivan',
  phone: '+7-999-999-99-11',
});
const contact3 = new ContactModel({
  name: 'Luidmila',
  phone: '+7-999-999-99-22',
});
const contact4 = new ContactModel({
  name: 'Uliana',
  phone: '+7-999-999-99-55',
});

export default [contact1, contact2, contact3, contact4];
