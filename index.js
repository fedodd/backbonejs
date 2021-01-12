const Contact = Backbone.Model.extend({
  defaults: {
    name: '',
    phone: '',
  },
});

// Backbone Collection

const Contacts = Backbone.Collection.extend({
  // SERVER APIs
  // url: '#',
});

// simulate server data:

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

    // SERVER API

    // this.model.save(null, {
    //   success: () => {
    //     console.log('success update');
    //   },
    //   error: () => {
    //     console.log('error update');
    //   },
    // });
  },
  cancel: function () {
    contactsView.render();
  },
  delete: function () {
    this.model.destroy();

    // SERVER API

    // this.model.destroy({
    //   success: () => {
    //     console.log('succesful delete!');
    //   },
    //   error: () => {
    //     console.log('failed to delete!');
    //   },
    // });
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

    // SERVER API

    // this.model.fetch({
    //   success: function (response) {
    //     console.log('failed to get contacts!');
    //   },
    //   error: () => {
    //     console.log('failed to get contacts!');
    //   },
    // });
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

    document.querySelector('.name-input').value = '';
    document.querySelector('.phone-input').value = '';
    const contact = new Contact({
      name: nameInputValue,
      phone: phoneInputValue,
    });

    contacts.add(contact);

    // SERVER API

    // contact.save(null, {
    //   success: () => {
    //     console.log('success adding');
    //   },
    //   error: () => {
    //     console.log('error adding');
    //   },
    // });
  });
});
