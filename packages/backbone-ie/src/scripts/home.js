var app = {}


app.NoteCard = Backbone.Model.extend({
  defaults: {
    title: '',
    value: ''
  }
})

app.noteList = new (Backbone.Collection.extend({
  model: app.NoteCard
}))([
  {
    title: '今天吃什么',
    value: '正新鸡排'
  },
  {
    title: '今天吃什么',
    value: '正新鸡排'
  },
  {
    title: '今天吃什么',
    value: '正新鸡排'
  }
])

app.NoteCreaterView = Backbone.View.extend({
  el: $('#app .note-creator'),
  events: {
    'click .submit': 'createNote'
  },
  initialize: function () {
    this.titleInput = $('.title', this.$el)
    this.valueInput = $('.value', this.$el)
  },
  createNote: function () {
    var title = this.titleInput.val()
    var value = this.valueInput.val()
    if (!title || !value) {
      alert('标题与内容不允许为空！')
      return
    }
    this.reset()
    app.noteList.add({
      title: title,
      value: value
    })
  },
  reset: function () {
    this.titleInput.val('')
    this.valueInput.val('')
    // polifill 在 ie 8 上的bug，需要对相应的 input 元素聚焦再失焦。。。
    this.titleInput.focus()
    this.titleInput.blur()
    this.valueInput.focus()
    this.valueInput.blur()
  }
})

app.NoteListView = Backbone.View.extend({
  el: $('#app .note-list'),
  initialize: function () {
    this.listenTo(app.noteList, 'add', this.addNote)
    this.listenTo(app.todos, 'reset', this.addAll);
    app.noteList.each(this.addNote, this);
  },
  addNote: function (note) {
    var noteCardView = new app.NodeCardView({ model: note})
    this.$el.append(noteCardView.render().el)
  }
})

app.NodeCardView = Backbone.View.extend({
  template: _.template(
    '<div class="col-md-4 note-card">' +
      '<div class="panel panel-default">' +
        '<div class="panel-body">' +
          '<img class="check" src="assets/check-icon.png"/>' +
          '<h4><%= title%></h4>' +
          '<p><%= value%></p>' +
        '</div>' +
      '</div>' +
    '</div>'
  ),
  events: {
    'click .check': 'clear'
  },
  initialize: function () {
    this.listenTo(this.model, 'destroy', this.remove)
  },
  render: function () {
    this.$el.html(this.template(this.model.toJSON()))
    return this
  },
  clear: function () {
    this.model.destroy()
  }
})

new app.NoteCreaterView()
new app.NoteListView()
