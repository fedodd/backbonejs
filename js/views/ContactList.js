import ContactView from './Contact';
import ContactsCollection from '../collections/contactList';
import ContactModel from '../models/contact';
import contactsData from './contactsData';

let contacts = new ContactsCollection(contactsData);

export default ContactListView = Backbone.View.extend({
  model: contacts,
  el: document.querySelector('.contacts-list'),
  initialize: function () {
    Backbone.Validation.bind(this);
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
