// I didn't work with backbone before, that's why i started wihout any toolkit, because don't know who's better. The project was already done, when i decided to split code on modules, but it was to late. That's why i didn't make normal structure of project, where views, models, collections - all in different folders. and i decided, if you will take me to your comand, you will show me best practices of code organization in backbone projects:)

// I used jQuery and js code here. i didn't use much css selectors, that's why somewhere it was much easier to use jQuery, for example, with use { this.$() }).

// thanks for your attention.

const Contact = Backbone.Model.extend({
  defaults: {
    name: '',
    phone: '',
  },
});

// Backbone Collection
const Contacts = Backbone.Collection.extend({
  // SERVER API
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

// i have some troubles with backbone validate from box, and created my one validate bicycle. I know, it's not good, but it's better, then nothing.

//errorNodes are jquery objects
function validate(values, errorNodes) {
  const { name, phone } = values;
  const { errorName, errorPhone } = errorNodes;
  const errors = {};

  if (!name) {
    errorName.show();
    errorName.text('Please enter name');
    errors.name = true;
  } else {
    errorName.hide();
  }

  if (!phone) {
    errorPhone.show();
    errorPhone.text('Please enter phone');
    errors.phone = true;
  } else if (!phone.match(/^[+]{0,1}[-\s\.0-9]*$/)) {
    errorPhone.show();
    errorPhone.text('Phone is invalid');
    errors.phone = true;
  } else {
    errorPhone.hide();
  }

  return errors;
}

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

    const values = {
      name,
      phone,
    };

    const errorNodes = {
      errorName: this.$('.error-name'),
      errorPhone: this.$('.error-phone'),
    };

    const errors = validate(values, errorNodes);

    if (!errors.name && !errors.phone) {
      this.model.set({ name, phone });
      // set here render for case when name and phone didn't changed, but we need to escape edit after push update button. Maybe better disable update button.
      contactsView.render();
    }

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
  render: function (event) {
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
    this.model.on('update', this.render, this);

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
    let name = document.querySelector('.name-input').value;
    let phone = document.querySelector('.phone-input').value;

    const values = {
      name,
      phone,
    };

    const errorNodes = {
      errorName: $('.error-name-add'),
      errorPhone: $('.error-phone-add'),
    };

    const errors = validate(values, errorNodes);

    if (!errors.name && !errors.phone) {
      const contact = new Contact();
      contact.set({ name, phone });
      contacts.add(contact);
      document.querySelector('.name-input').value = '';
      document.querySelector('.phone-input').value = '';
    }

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
