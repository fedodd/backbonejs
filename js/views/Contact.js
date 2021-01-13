export default ContactView = Backbone.View.extend({
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
    console.log(this.model.validatationError);
    const isValid = this.model.validate({ name, phone }, { validate: true });
    debugger;

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
  // validateInput: function () {

  // },
  render: function (event) {
    this.$el.html(this.template(this.model.toJSON()));
    Backbone.Validation.bind(this);
    return this;
  },
  remove: function () {
    Backbone.Validation.unbind(this);
    return Backbone.View.prototype.remove.apply(this, arguments);
  },
});
