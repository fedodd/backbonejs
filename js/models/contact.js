export default Contact = Backbone.Model.extend({
  defaults: {
    name: '',
    phone: '',
  },
  // validatation: {
  //   name: {
  //     required: true,
  //     msg: 'Please enter name',
  //   },
  //   phone: [
  //     {
  //       required: true,
  //       msg: 'Please enter phone',
  //     },
  //     {
  //       pattern: /^[+]{0,1}[-\s\.0-9]*$/,
  //       msg: 'Please enter a valid phone',
  //     },
  //   ],

  validate: function (attrs, options) {
    debugger;
    if (!attrs.name) {
      return 'Please fill name';
      errors.push({ name: 'name', message: 'Please fill name' });
    }
    if (!attrs.phone) {
      return 'Please fill phone';
      errors.push({ name: 'phone', message: 'Please fill phone' });
    }
    // if (attrs.phone) {
    //   // ^[+]{0,1}[-\s\.0-9]*$
    //   errors.push({ name: 'lastname', message: 'Please fill phone' });
    // }
  },
});
