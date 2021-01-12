const Contact = Backbone.Model.extend({
  defaults: {
    name: '',
    phone: '',
  },
});

// Backbone Collection

const Contacts = Backbone.Collection.extend({});

// instantiate four Contacts

const contact1 = new Contact({
  name: 'Fedor',
  phone: '+7-999-999-99-99',
});

const contact2 = new Contact({
  name: 'Ivan',
  phone: '+7-999-999-99-11',
});

const contact3 = new Contact({
  name: 'Luidmila',
  phone: '+7-999-999-99-22',
});

const contact4 = new Contact({
  name: 'Uliana',
  phone: '+7-999-999-99-55',
});

// instantiate a Collection

let contacts = new Contacts([contact1, contact2, contact3, contact4]);

//Backbone View for one contact

const ContactView = Backbone.View.extend({
  model: new Contact(),
  tagName: 'tr',
  initialize: function () {
    this.template = _.template($('.contacts-list-template').html());
  },
  events: {
    'click .edit-contact': 'edit',
    'click .update-contact': 'update',
    'click .cancel-contact': 'cancel',
    'click .delete-contact': 'delete',
  },
  edit: function () {
    $('.delete-contact').hide();
    $('.edit-contact').hide();
    this.$('.cancel-contact').show();
    this.$('.update-contact').show();

    const currentName = this.$('.name').html();
    const currentPhone = this.$('.phone').html();
    this.$('.name').html(
      `<input class="form-control name-update" value="${currentName}" />`
    );
    this.$('.phone').html(
      `<input class="form-control phone-update" value="${currentPhone}" />`
    );
  },
  update: function () {
    const name = document.querySelector('.name-update').value;
    const phone = document.querySelector('.phone-update').value;
    this.model.set({ name, phone });
    $('.delete-contact').show();
    $('.edit-contact').show();
    this.$('.cancel-contact').hide();
    this.$('.update-contact').hide();
    this.$('.name').html(name);
    this.$('.phone').html(phone);
  },
  cancel: function () {
    contactsView.render();
  },
  delete: function () {
    this.model.destroy();
  },
  render: function () {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  },
});

//Backbone View for contacts list
const ContactsView = Backbone.View.extend({
  model: contacts,
  el: document.querySelector('.contacts-list'),
  initialize: function () {
    this.render();
    this.model.on('add', this.render, this);
    this.model.on('change', this.render, this);
    this.model.on('remove', this.render, this);
  },
  render: function () {
    const self = this;
    this.$el.html('');
    _.each(this.model.toArray(), function (contact) {
      self.$el.append(new ContactView({ model: contact }).render().$el);
    });
    return this;
  },
});

const contactsView = new ContactsView();

document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('.add-contact').addEventListener('click', () => {
    let nameInputValue = document.querySelector('.name-input').value;
    let phoneInputValue = document.querySelector('.phone-input').value;
    const contact = new Contact({
      name: nameInputValue,
      phone: phoneInputValue,
    });
    contacts.add(contact);
    document.querySelector('.name-input').value = '';
    document.querySelector('.phone-input').value = '';

    console.log(contact.toJSON(), nameInputValue);
  });
});
