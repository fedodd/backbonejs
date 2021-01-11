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
  render: function () {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  },
});

//Backbone View for contacts list
const ContactsView = Backbone.View.extend({
  model: contacts,
  el: $('.contacts-list'),
  initialize: function () {
    this.model.on('add', this.render, this);
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

$(document).ready(function () {
  $('.add-contact').on('click', function () {
    const contact = new Contact({
      name: $('.name-input').val(),
      phone: $('.phone-input').val(),
    });
    contacts.add(contact);
    console.log(contact.toJSON());
  });
});
