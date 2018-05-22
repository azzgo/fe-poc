jQuery(function($) {
  var Login = {
    formData: {
      username: '',
      password: '',
      remembered: false,
    },
    userNameInputRef: null,
    passwordInputRef: null,
    submitButtonRef: null,
    rememberMeRef: null,
    init: function() {
      this.userNameInputRef = $('#login-form .username');
      this.passwordInputRef = $('#login-form .password');
      this.submitButtonRef = $('#login-form .submit');
      this.rememberMeRef = $('#remember_me');
      this.bindView();
      this.bindEvent();
    },
    bindView: function() {
      this.userNameInputRef.val(this.formData.username);
      this.passwordInputRef.val(this.formData.password);
      this.rememberMeRef.prop('checked', this.formData.remembered);
    },
    bindEvent: function() {
      this.userNameInputRef.on('change', this.updateUserName.bind(this));
      this.passwordInputRef.on('change', this.updatePassword.bind(this));
      this.submitButtonRef.on('click', this.submit.bind(this));
      this.rememberMeRef.on('change', this.update)
    },
    updateUserName: function(event) {
      this.formData.username = event.target.value;
      this.bindView();
    },
    updatePassword: function(event) {
      this.formData.password = event.target.value;
      this.bindView();
    },
    updateRembemberMe: function() {
      this.formData.remembered = !this.formData.remembered;
      this.bindView();
    },
    submit: function(event) {
      event.stopPropagation();
      if(!this.formData.username || !this.formData.password) {
        alert('Username or Password can not be empty!');
        return;
      }

      if(this.formData.remembered) {
        localStorage.isLogin = true;
      } else {
        sessionStorage.isLogin = true;
      }
      location.href = '/';
    }
  };

  Login.init()
})
